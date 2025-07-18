let running = localStorage.getItem("reminderActive");
let time = localStorage.getItem("reminderTime");
let timeout = null;
let intervalTimeLeft = null;
let reminder = null;

// check all localstorage stuff
setInterval(() => {
    running = !!Number(localStorage.getItem("reminderActive"));
    time = Number(localStorage.getItem("reminderTime"));

    if (running && time > 0 && timeout === null) {
        localStorage.setItem("showReminderText", 0);
        localStorage.setItem("reminderActive", 1);

        console.log("bg set reminder");
        timeout = setTimeout(() => {
            endReminder();
        }, time);

        intervalTimeLeft = setInterval(() => {
            let timeLeft = localStorage.getItem("reminderTimeLeft");
            localStorage.setItem("reminderTimeLeft", timeLeft - 10);
            if (timeLeft <= 0) {
                clearInterval(intervalTimeLeft);
                localStorage.setItem("reminderTimeLeft", 0);
            }
        }, 10);
    }
}, 10);

function endReminder() {
    timeout = null;
    clearInterval(intervalTimeLeft);

    localStorage.setItem("reminderActive", 0);
    localStorage.setItem("reminderTime", 0);
    localStorage.setItem("reminderTimeLeft", 0);
    localStorage.setItem("showReminderText", 1);

    let intervalCount = 0;
    reminder = setInterval(() => {
        if (intervalCount >= 5) {
            clearInterval(reminder);
            return;
        }

        new Audio("./notification.wav").play();
        intervalCount++;
    }, 500);
}
