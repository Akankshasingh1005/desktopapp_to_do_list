const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
    resizable: false,
  });

  win.removeMenu();
  win.loadFile("index.html");

  ipcMain.on("load-page", (event, page) => {
    win.loadFile(page);
  });
}

app.whenReady().then(() => {
  createWindow();
});
