/**
 * 🛡️ 履歷聯絡表單：Google Apps Script (GAS) 後端防護代碼
 * 
 * 【使用與部署指南 SOP】
 * 1. 打開您的 Google 聯絡表單試算表 (Google Sheet)。
 * 2. 點選頂部選單的 「擴充功能」 (Extensions) ➡️ 「Apps Script」。
 * 3. 清空 Apps Script 編輯器內的所有預設代碼。
 * 4. 複製並貼上本檔案內的所有程式碼。
 * 5. 按下 Ctrl+S (Mac 使用 Cmd+S) 進行存檔。
 * 6. 點選右上角 「部署」 ➡️ 「新增部署」。
 * 7. 點選齒輪選取 「Web 應用程式」。
 *    - 說明：resume_form_api
 *    - 執行身份：我 (您的 Google 帳號)
 *    - 誰可以存取：任何人 (Anyone) <--- 這一步極度關鍵！
 * 8. 點選部署 ➡️ 授予存取權 ➡️ 選擇您的帳號 ➡️ 點進階 ➡️ 前往專案(不安全) ➡️ 點允許。
 * 9. 複製生成的「網頁應用程式 URL」網址。
 * 10. 打開 index.html，在第 264 行左右，將您的網址貼入 GAS_WEB_APP_URL 變數中並存檔！
 */

// 🛡️ 資安強化版 GAS 接收表單進入點
function doPost(e) {
  // 1. 啟用 CORS 安全表頭，允許前端 GitHub Pages 的 JavaScript 進行跨來源連線
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  try {
    // 2. 解析前端傳來的 POST 參數
    var params = e.parameter;
    
    // 3. 🛡️ 【蜜罐防範 (Honeypot)】
    // 如果隱藏的蜜罐欄位 (honeypot) 有值，代表是機器人填寫的，立刻無聲阻斷，避免垃圾信件灌爆試算表
    if (params.honeypot && params.honeypot.trim() !== "") {
      return ContentService.createTextOutput(JSON.stringify({
        "status": "success", 
        "message": "Filtered by antispam honeypot."
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }
    
    var name = params.name || "未提供";
    var email = params.email || "未提供";
    var message = params.message || "未提供";
    
    // 4. 🛡️ 【防範試算表公式注入攻擊 (Formula Injection)】
    // 過濾留言內容是否以 = + - @ 等符號開頭，避免黑客注入惡意試算表公式執行，強制在開頭加上 "'" 轉義為純文字
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);
    
    // 5. 將資料寫入該試算表的最後一行 (Row)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    sheet.appendRow([timestamp, name, email, message]);
    
    // 6. 回傳成功的 JSON 數據給網頁前端
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Message saved successfully."
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    // 異常錯誤處理
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// 🛡️ 輔助防禦函式：公式注入過濾器 (Formula Injection Sanitizer)
function sanitizeInput(text) {
  if (!text) return text;
  var str = text.toString().trim();
  // 如果開頭是 = + - @ 或 tab / carriage return，前面自動加上單引號 "'" 讓 Google Sheets 強制將其視為純文字
  if (/^[=\+\-\@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}
