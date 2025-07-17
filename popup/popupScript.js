const btn = document.getElementById("btn");
const timeLeftDiv = document.getElementById("time");
const notificationDiv = document.getElementById("notification");
notificationDiv.style.display = "none";

const notificationSound = new Audio("./notification.wav");

let reminder = null;
let waitTime = 0;
let displayWaitTime = 0;

// set reminder
function setReminder() {
    if (waitTime != 0) {
        return;
    }

    notificationDiv.style.display = "none";

    waitTime = Math.trunc(Math.random() * 5000);
    displayWaitTime = waitTime;

    reminder = setTimeout(() => {
        console.log("???");
        endReminder();
    }, waitTime);
}

function endReminder() {
    console.log("??????");
    waitTime = 0;
    displayWaitTime = 0;
    notificationDiv.style.display = "block";

    let intervalCount = 0;
    reminder = setInterval(() => {
        console.log("interval", intervalCount);

        if (intervalCount >= 5) {
            clearInterval(interval);
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

btn.addEventListener("click", () => {
    setReminder();
});
