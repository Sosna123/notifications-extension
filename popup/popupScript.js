const btn = document.querySelector("#btn");
const timeLeftDiv = document.querySelector("#time");
const hoursWaitTimeInput = document.querySelector("#hoursWaitTime");
const minutesWaitTimeInput = document.querySelector("#minutesWaitTime");
const secondsWaitTimeInput = document.querySelector("#secondsWaitTime");

const notificationHideDiv = document.querySelector("#notificationHide");
notificationHideDiv.style.display = "none";
const notificationText = document.querySelector("#notificationText");
notificationText.innerText = "notification!!!!!";
reminderTextInput = document.querySelector("input#reminderText");
let reminderText = "notification!!!";

let showReminderText = localStorage.getItem("showReminderText");

let reminder = null;
let waitTime = 0;
let displayWaitTime = 0;

// set reminder
function setReminder() {
    if (Number(localStorage.getItem("reminderActive"))) {
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
if (
    localStorage.getItem("reminderText") != null &&
    localStorage.getItem("reminderText").length > 0
) {
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
        timeLeftDiv.innerText = `Time left: 0.0s`;
        return;
    }

    timeLeftDiv.innerText = `Time left: ${(displayWaitTime / 1000).toFixed(
        1
    )}s`;
}, 100);

// create localstorage data if it doesn't exist
if (localStorage.getItem("reminderActive") === null) {
    localStorage.setItem("reminderActive", 0);
}
if (localStorage.getItem("reminderText") === null) {
    localStorage.setItem("reminderText", "notification!!!");
}
if (localStorage.getItem("reminderTime") === null) {
    localStorage.setItem("reminderTime", 0);
}
if (localStorage.getItem("reminderTimeLeft") === null) {
    localStorage.setItem("reminderTimeLeft", 0);
}
if (localStorage.getItem("showReminderText") === null) {
    localStorage.setItem("showReminderText", 0);
}
