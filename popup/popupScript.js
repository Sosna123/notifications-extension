const btn = document.querySelector("#btn");
const timeLeftDiv = document.querySelector("#time");
const notificationHideDiv = document.querySelector("#notificationHide");
notificationHideDiv.style.display = "none";
const notificationText = document.querySelector("#notificationText");
notificationText.innerText = "notification!!!!!";
reminderTextInput = document.querySelector("input#reminderText");
let reminderText = "notification!!!";

const notificationSound = new Audio("./notification.wav");

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

    waitTime = Math.trunc(Math.random() * 5000);
    displayWaitTime = waitTime;

    reminder = setTimeout(() => {
        console.log("???");
        endReminder();
    }, waitTime);
}

// triggered when time is up
function endReminder() {
    console.log("??????");
    waitTime = 0;
    displayWaitTime = 0;
    notificationHideDiv.style.display = "block";

    let intervalCount = 0;
    reminder = setInterval(() => {
        if (intervalCount >= 5) {
            clearInterval(reminder);
            return;
        }

        notificationSound.play();
        intervalCount++;
    }, 600);
}

// update time
setInterval(() => {
    if (displayWaitTime <= 0) {
        timeLeftDiv.innerText = `time left: 0.0 seconds`;
        return;
    }

    timeLeftDiv.innerText = `time left: ${(displayWaitTime / 1000).toFixed(
        1
    )} seconds`;
    displayWaitTime -= 100;
}, 100);

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
