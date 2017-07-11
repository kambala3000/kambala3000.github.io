"use strict";

const inputs = document.getElementsByClassName("pomodoro__settings-input"),
    buttons = document.getElementsByClassName("pomodoro__settings-btn"),
    btnReduceBreak = document.getElementById("break-reduce"),
    btnIncBreak = document.getElementById("break-inc"),
    inputBreakLength = document.getElementById("break-length"),
    btnReduceSession = document.getElementById("session-reduce"),
    btnIncSession = document.getElementById("session-inc"),
    inputSessionLength = document.getElementById("session-length"),
    nodeTimerBlock = document.getElementById("timer-block"),
    nodeTimerTitle = document.getElementById("timer-title"),
    nodeSessionsCounter = document.getElementById("timer-sessions-counter"),
    nodeTimerValue = document.getElementById("timer-value"),
    nodeTimerFill = document.getElementById("timer-fill"),
    btnStartTimer = document.getElementById("start-timer"),
    btnResetTimer = document.getElementById("reset-timer");

let timer = null,
    sessionSeconds = "0",
    breakSeconds = "0",
    wasPause = false,
    timerToggle = false,
    sessionsCounter = 0;

for (let i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function() {
        this.value = this.value.replace(/[^0-9]/g, "");
    };
}

function incValue(btn, input) {
    if (btn.value === "+") {
        if (+input.value > 998) return;
        input.value++;
        if (!wasPause && btn === btnIncSession) {
            displayTime(input.value);
        }
    } else {
        if (+input.value < 2) return;
        input.value--;
        if (!wasPause && btn === btnReduceSession) {
            displayTime(input.value);
        }
    }
}

btnReduceBreak.addEventListener("click", function() {
    incValue(this, inputBreakLength);
});
btnIncBreak.addEventListener("click", function() {
    incValue(this, inputBreakLength);
});
btnReduceSession.addEventListener("click", function() {
    incValue(this, inputSessionLength);
});
btnIncSession.addEventListener("click", function() {
    incValue(this, inputSessionLength);
});

inputSessionLength.addEventListener("input", function() {
    if (!wasPause) {
        displayTime(this.value);
    }
});

btnStartTimer.addEventListener("click", startTimer);
btnResetTimer.addEventListener("click", resetTimer);

function startTimer() {
    timerToggle = this.value === "start" ? true : false;
    if (timerToggle) {
        this.value = "pause";
        this.innerHTML = "Pause";
    } else {
        this.value = "start";
        this.innerHTML = "Start";
    }
    timerCountDown();
}

function timerCountDown() {
    console.log(`timerToggle: ${timerToggle}`);
    if (timerToggle) {
        console.log(`wasPause: ${wasPause}`);
        if (!wasPause) {
            sessionSeconds = inputSessionLength.value * 60;
        }
        disabledToggle(true);
        timer = setInterval(
            (function timerFunc() {
                if (sessionSeconds > 0) {
                    if (sessionSeconds < 2) breakSeconds = inputBreakLength.value * 60;
                    nodeTimerTitle.innerHTML = "Session";
                    sessionSeconds--;
                    const newSessionTime = sessionSeconds / 60;
                    displayTime(newSessionTime);

                    console.log(sessionSeconds);
                } else {
                    if (breakSeconds < 2) {
                        sessionSeconds = inputSessionLength.value * 60;
                        sessionsCounter++;
                        nodeSessionsCounter.innerHTML = sessionsCounter;
                    }
                    nodeTimerTitle.innerHTML = "Break";
                    breakSeconds--;
                    const newBreakTime = breakSeconds / 60;
                    displayTime(newBreakTime);

                    console.log(breakSeconds);
                }
                return timerFunc;
            })(),
            1000
        );
    } else {
        wasPause = true;
        console.log(`wasPause: ${wasPause}`);
        disabledToggle(false);
        clearTimeout(timer);
    }
}

function resetTimer() {
    timerToggle = false;
    wasPause = false;
    sessionsCounter = 0;
    nodeSessionsCounter.innerHTML = "0";
    btnStartTimer.value = "start";
    btnStartTimer.innerHTML = "Start";
    nodeTimerTitle.innerHTML = "Session";
    disabledToggle(false);
    clearInterval(timer);
    displayTime(inputSessionLength.value);
    console.log(`timerToggle: ${timerToggle}`);
    console.log(`wasPause: ${wasPause}`);
    console.log("reseted");
}

function disabledToggle(state) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = state;
    }
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = state;
    }
    console.log(`state: ${state}`);
}

function displayTime(overallMinutes) {
    const overallSeconds = overallMinutes * 60;
    const haveHours = overallMinutes - 60 >= 0;
    let hours = Math.floor(overallSeconds / 3600);
    if (hours < 10) hours = "0" + hours;
    let minutes = Math.floor(overallSeconds % 3600 / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = Math.floor(overallSeconds % 3600 % 60);
    if (seconds < 10) seconds = "0" + seconds;
    if (haveHours) {
        nodeTimerValue.innerHTML = `${hours}:${minutes}:${seconds}`;
    } else {
        nodeTimerValue.innerHTML = `${minutes}:${seconds}`;
    }
}
