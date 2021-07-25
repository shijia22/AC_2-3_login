# Login page

這是 AC 2-3 學期 A10 用 Node.js、Express、MongoDB 所建置的登入網站

## Features

- 使用者可以在表單裡輸入帳密：email & password
- 發送表單，把帳密傳送給伺服器
- 伺服器拿到資料，開始比對內建的使用者名單
- 如果找不到 username，或是 password 錯誤，就彈回登入頁並且在介面上顯示「Username 或Password 錯誤」
- 如果 username + password 組合正確，使用者就進入自己的 welcome page，在此頁面上會顯示登入使用者的 firstName


## 環境建置與需求 (prerequisites)

- Visual Studio Code - 開發環境
- express - 4.17.1
- express - handlebars 5.3.2
- npm - a JavaScript package manager
- nodemon - 可讓網頁即時呈現套件
- nvm version 0.38.0
- body-parser 1.19.0
- mongoose 5.13.3
- express-session v1.17.2
- cookie-parser v1.4.5

## 安裝與執行步驟

1. 打開終端機，clone 此專案至本機電腦
   `https://github.com/shijia22/AC_2-3_login.git`
2. 開啟終端機，進入存放此專案資料夾
   `cd AC_2-3_login`
3. 安裝 npm 套件
   `npm install`
4. 新增種子資料
   `npm run seed`
5. 啟動專案
   `npm run dev`
6. 啟動 nodemon
   `nodemon app.js`
7. 出現以下訊息後，即可在 http://localhost:3000 開始使用
   `Express is listening on localhost:3000`