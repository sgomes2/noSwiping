const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const log = require("electron-log");
const fs = require("fs");

// Set env
const isDev = process.env.NODE_ENV === "development" ? true : false;
const isMac = process.platform === "darwin" ? true : false;
const audioDir = `${__dirname}/assets/audio/`;

let mainWindow;
let audioSelectionWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "No Swiping",
    width: isDev ? 1000 : 300,
    height: isDev ? 800 : 350,
    icon: "./assets/icons/icon_1024x1024.png",
    resizable: isDev ? true : false,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    console.log("enabling dev Tools");
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile("./app/index.html");
}

function createAudioSelectionWindow() {
  audioSelectionWindow = new BrowserWindow({
    title: "No Swiping",
    width: isDev ? 1000 : 300,
    height: isDev ? 800 : 350,
    icon: "./assets/icons/icon_1024x1024.png",
    resizable: isDev ? true : false,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    console.log("enabling dev Tools");
    audioSelectionWindow.webContents.openDevTools();
  }

  fs.readdir(audioDir, (err, audioFiles) => {
    if (err) {
      console.log(err);
    } else {
      audioSelectionWindow.webContents.send("audio-list:get", audioFiles);
    }
  });

  audioSelectionWindow.loadFile("./app/audio-selection.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("ready", () => (mainWindow = null));
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    role: "fileMenu",
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
  {
    label: "Options",
    submenu: [
      {
        label: "Select Alarm Audio",
        click: createAudioSelectionWindow,
      },
    ],
  },
];

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
