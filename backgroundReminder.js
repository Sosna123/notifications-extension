let running = localStorage.getItem("reminderActive");
let time = localStorage.getItem("reminderTime");
let timeout = null;
let intervalTimeLeft = null;
let reminder = null;

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "setReminder") {
        running = !!Number(localStorage.getItem("reminderActive"));
        time = Number(localStorage.getItem("reminderTime"));

        if (running && time > 0 && timeout === null) {
            localStorage.setItem("showReminderText", 0);
            localStorage.setItem("reminderActive", 1);

            console.log("bg set reminder");
            console.log(time);
            timeout = setTimeout(() => {
                endReminder();
                clearInterval(intervalTimeLeft);
                localStorage.setItem("reminderTimeLeft", 0);
            }, time);

            intervalTimeLeft = setInterval(() => {
                localStorage.setItem(
                    "reminderTimeLeft",
                    localStorage.getItem("reminderTimeLeft") - 1000
                );

                // only here to make the browser keep background script alive
                browser.runtime.sendMessage({ type: "updateTimeLeft" });
            }, 1000);
        }
    }
});

function endReminder() {
    timeout = null;
    clearInterval(intervalTimeLeft);

    localStorage.setItem("reminderActive", 0);
    localStorage.setItem("reminderTime", 0);
    localStorage.setItem("reminderTimeLeft", 0);
    localStorage.setItem("showReminderText", 1);

    browser.runtime.sendMessage({
        type: "endReminder",
    });

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
