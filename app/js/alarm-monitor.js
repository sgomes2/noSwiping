let batteryIsCharging = false;
let activated = false;

var audio = new Audio(`${__dirname}/../assets/audio/screaming.mp3`);

console.log(__dirname);
document.getElementById("activate-button").addEventListener("click", () => {
  activated = true;
});

document.getElementById("stop-button").addEventListener("click", () => {
  activated = false;
});

let batteryPromise = navigator.getBattery();
batteryPromise.then(setBatteryListener);

function batteryCallback(batteryObject) {
  printBatteryStatus(batteryObject);
}
function setBatteryListener(batteryObject) {
  batteryObject.addEventListener("chargingchange", function (ev) {
    console.log(batteryObject.charging);
    if (activated && !batteryObject.charging) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}
