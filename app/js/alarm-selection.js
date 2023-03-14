const { ipcRenderer } = require("electron");

ipcRenderer.on("audio-list:get", (e, audioList) => {
  console.log(audioList.join(", "));
});
