# Ray 的個人履歷

這是一個靜態的個人履歷網頁專案，採用簡約平扁設計，並支援響應式網頁設計 (RWD)。

## 技術棧 (Tech Stack)

*   **HTML5**: 語意化標籤建構頁面結構。
*   **CSS3**: 
    *   CSS Grid & Flexbox 用於排版配置 (桌機兩欄 / 手機單欄)。
    *   CSS Variables (自訂屬性) 統一色票與字級系統。
*   **無需任何 JavaScript 框架**，純靜態頁面，確保載入速度與相容性。

## 檔案結構

```text
resume-project/
├── index.html       # 履歷主要 HTML 頁面
├── styles.css       # 樣式設定
├── assets/          
│   ├── images/      # 存放圖片資源 (如個人照)
│   └── scripts/     # 存放腳本 (如有需要擴充)
└── README.md        # 專案說明文件
```

## 頁面區塊

1.  **自我介紹 (About)**: 簡介與照片。
2.  **專業技能 (Skills)**: 依系統管理、資訊安全、開發與自動化分類。
3.  **作品集 (Portfolio)**: 包含 GAS 專案與企業架構建置。
4.  **經歷 (Experience)**: 過去工作經驗的時間軸。
5.  **聯絡方式 (Contact)**: Email、LinkedIn、GitHub 連結。

## 截圖 (Screenshots)

*(請將部署後的網頁截圖放置於 `assets/images/`，並在此插入截圖的 Markdown 語法，例如 `![Desktop View](assets/images/screenshot-desktop.png)`)*

## 啟動與部署方式

### 本機檢視
1. 複製此專案到您的本機。
2. 透過瀏覽器直接開啟 `index.html`，或是使用 VS Code 的 Live Server 套件啟動本地伺服器檢視。

### 部署至 GitHub Pages
1. 在 GitHub 建立一個新的 repository (例如: `ray-resume`)。
2. 將專案推送到該 repository：
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Resume project"
   git branch -M main
   git remote add origin https://github.com/yourusername/ray-resume.git
   git push -u origin main
   ```
3. 在 GitHub repository 的 **Settings** > **Pages** 設定中，將 Source 設為 `Deploy from a branch`，選擇 `main` 分支並點擊 Save。
4. 等待 GitHub Actions 執行完畢，即可在提供的網址上看到您的履歷頁面。