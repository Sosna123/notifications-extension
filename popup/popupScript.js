const btn = document.querySelector("#btn");
const timeLeftDiv = document.querySelector("#time");
const notificationHideDiv = document.querySelector("#notificationHide");
notificationHideDiv.style.display = "none";
const notificationText = document.querySelector("#notificationText");
notificationText.innerText = "notification!!!!!";
reminderTextInput = document.querySelector("input#reminderText");
let reminderText = "notification!!!";

const hoursWaitTimeInput = document.querySelector("#hoursWaitTime");
const minutesWaitTimeInput = document.querySelector("#minutesWaitTime");
const secondsWaitTimeInput = document.querySelector("#secondsWaitTime");

let showReminderText = localStorage.getItem("showReminderText");

let reminder = null;
let waitTime = 0;
let displayWaitTime = 0;

// set reminder
function setReminder() {
    if (waitTime != 0) {
        return;
    }

    notificationHideDiv.style.display = "none";
    notificationText.innerText =
        reminderText.length > 0 ? reminderText : "notification!!!";

    waitTime =
        (hoursWaitTimeInput.value * 36000 +
            minutesWaitTimeInput.value * 60 +
            secondsWaitTimeInput.value * 1) *
        1000;
    displayWaitTime = waitTime;

    localStorage.setItem("showReminderText", 0);
    localStorage.setItem("reminderActive", 1);
    localStorage.setItem("reminderTime", waitTime);
    localStorage.setItem("reminderTimeLeft", waitTime);
}

// event listeners for functions
btn.addEventListener("click", () => {
    setReminder();
});

reminderTextInput.addEventListener("change", (e) => {
    reminderText = e.target.value;
    localStorage.setItem("reminderText", reminderText);
});

// reminder loading from localStorage
if (localStorage.getItem("reminderText").length > 0) {
    reminderText = localStorage.getItem("reminderText");
    reminderTextInput.value = reminderText;
}

// check all localstorage stuff
setInterval(() => {
    showReminderText = !!Number(localStorage.getItem("showReminderText"));

    notificationText.innerText =
        reminderText.length > 0 ? reminderText : "notification!!!";

    if (showReminderText) {
        notificationHideDiv.style.display = "block";
    } else {
        notificationHideDiv.style.display = "none";
    }
}, 10);

// update display time
setInterval(() => {
    displayWaitTime = localStorage.getItem("reminderTimeLeft");

    if (displayWaitTime <= 0) {
        timeLeftDiv.innerText = `time left: 0.0 seconds`;
        return;
    }

    console.log("displayWaitTime", displayWaitTime);
    timeLeftDiv.innerText = `time left: ${(displayWaitTime / 1000).toFixed(
        1
    )} seconds`;
}, 100);
