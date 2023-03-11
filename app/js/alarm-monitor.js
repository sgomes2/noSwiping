// Creating battery status enum for simplicity
const BatteryStatus = {
  CHARGING: "charging",
  NOT_CHARGING: "not_charging",
};

// Setting default audio track
var audio = new Audio(`${__dirname}/../assets/audio/screaming.mp3`);
audio.loop = true;

// Keep track of battery charging status
let batteryIsCharging;
//  Keep track of alarm activation status
let activated = false;

console.log(__dirname);
document.getElementById("activate-button").addEventListener("click", () => {
  activated = true;
});

navigator.getBattery().then((battery) => {
  console.log("Battery Charging: " + batteryIsCharging);
  batteryIsCharging = battery.charging;
  setActivateInfo();
  setChargingInfo();

  battery.addEventListener("chargingchange", () => {
    batteryIsCharging = battery.charging;
    console.log("Battery Charging: " + batteryIsCharging);
    setActivateInfo();
    setChargingInfo();

    if (activated && !batteryIsCharging) {
      audio.play();
    } else if (activated && batteryIsCharging) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
});

const setChargingInfo = () => {
  const infoText = document.getElementById("charging-info");

  if (!batteryIsCharging) {
    const infoTextStr = activated
      ? "RETURN THE COMPUTER TO IT ORIGINAL CHARGING POSITION!!"
      : "Battery Must be Charging to Activate! Plug Device to Power!";

    infoText.innerHTML = `<h2>${infoTextStr}</h2>`;
  } else {
    const info = activated
      ? `
    <h2>Before You Leave the Device Unattended<h2>
    <ul>
    <li>Set volume to MAX</li>
    <li>Set speaker as output device</li>
    </ul>`
      : "";
    infoText.innerHTML = info;
  }
};

const setActivateInfo = () => {
  const activateButton = document.getElementById("activate-button");
  const alarmstatus = document.getElementById("alarm-status");
  activateButton.disabled = !batteryIsCharging;

  if (activated) {
    activateButton.innerText = "Deactivate Alarm";
    alarmstatus.innerText = "Activated";
    activateButton.onclick = () => {
      activated = false;
      setActivateInfo();
      setChargingInfo();
    };
  } else {
    activateButton.innerText = "Activate Alarm";
    alarmstatus.innerText = "Deactivated";
    activateButton.onclick = () => {
      activated = true;
      setActivateInfo();
      setChargingInfo();
    };
  }
};

setActivateInfo(BatteryStatus.NOT_CHARGING);
