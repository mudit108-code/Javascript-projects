const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false;
const ringtone = new Audio('./Files/ringtone.mp3');


function generateOptions(start, end, step, selector) {
    for (let i = start; i >= end; i -= step) {
        const value = i < 10 ? "0" + i : i;
        const option = `<option value="${value}">${value}</option>`;
        selector.firstElementChild.insertAdjacentHTML("afterend", option);
    }
}

// Generate options for hours, minutes, and AM/PM
generateOptions(12, 1, 1, selectMenu[0]);
generateOptions(59, 0, 1, selectMenu[1]);
generateOptions(1, 0, 1, selectMenu[2]);


setInterval(() => {
    const date = new Date();
    let h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = 'AM';

    if (h >= 12) {
        h -= 12;
        ampm = "PM";
    }

    h = (h === 0) ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);


function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set alarm";
        isAlarmSet = false;
    } else {
        const time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")) {
            return alert("Please select a valid time to set the alarm!");
        }
        alarmTime = time;
        isAlarmSet = true;
        content.classList.add("disable");
        setAlarmBtn.innerText = "Clear alarm";
    }
}

setAlarmBtn.addEventListener("click", setAlarm);
