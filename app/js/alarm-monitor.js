// Creating battery status enum for simplicity
const BatteryStatus = {
  CHARGING: "charging",
  NOT_CHARGING: "not_charging",
};

// Setting default audio track
var audio = new Audio(`${__dirname}/../assets/audio/screaming.mp3`);
audio.loop = true;

// Keep track of battery charging status
let batteryIsCharging = true;
//  Keep track of alarm activation status
let activated = true;

var audio = new Audio(`${__dirname}/../assets/audio/screaming.mp3`);

console.log(__dirname);
document.getElementById("activate-button").addEventListener("click", () => {
  activated = true;
});

// navigator.getBattery().then((battery) => {
//   console.log("Battery Charging: " + batteryIsCharging);
//   batteryIsCharging = battery.charging;

//   battery.addEventListener("chargingchange", () => {
//     batteryIsCharging = battery.charging;
//     console.log("Battery Charging: " + batteryIsCharging);
//   });
// });

const setActivateInfo = () => {
  const activateButton = document.getElementById("activate-button");
  activateButton.disabled = !batteryIsCharging;

  if (activated) {
    activateButton.innerText = "Deactivate Alarm";
    activateButton.onclick = () => {
      activated = false;
      setActivateInfo();
    };
  } else {
    activateButton.innerText = "Activate Alarm";
    activateButton.onclick = () => {
      activated = true;
      setActivateInfo();
    };
  }
};

setActivateInfo(BatteryStatus.NOT_CHARGING);
