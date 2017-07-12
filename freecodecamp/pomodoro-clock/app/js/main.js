"use strict";

var inputs = document.getElementsByClassName("pomodoro__settings-input"),
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

var timer = null,
    sessionSeconds = "0",
    breakSeconds = "0",
    wasPause = false,
    timerToggle = false,
    sessionsCounter = 0,
    fillPerc = 0;

for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    };
}

function incValue(btn, input) {
    if (btn.value === "+") {
        if (+input.value > 998) return;
        input.value++;
    } else {
        if (+input.value < 2) return;
        input.value--;
    }
    resetTimer();
}

btnReduceBreak.addEventListener("click", function () {
    incValue(this, inputBreakLength);
});
btnIncBreak.addEventListener("click", function () {
    incValue(this, inputBreakLength);
});
btnReduceSession.addEventListener("click", function () {
    incValue(this, inputSessionLength);
});
btnIncSession.addEventListener("click", function () {
    incValue(this, inputSessionLength);
});

inputSessionLength.addEventListener("input", function () {
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
    if (timerToggle) {
        if (!wasPause) {
            sessionSeconds = inputSessionLength.value * 60;
        }
        disabledToggle(true);
        timer = setInterval(function timerFunc() {
            if (sessionSeconds > 0) {
                if (sessionSeconds < 2) {
                    breakSeconds = inputBreakLength.value * 60;
                    fillPerc = 0;
                    nodeTimerFill.style.height = "0%";
                }
                nodeTimerTitle.innerHTML = "Session";
                sessionSeconds--;
                var newSessionTime = sessionSeconds / 60;
                displayTime(newSessionTime);
                fillPerc = 100 - sessionSeconds * 100 / (inputSessionLength.value * 60);
                nodeTimerFill.style.height = fillPerc + "%";
                nodeTimerFill.style.backgroundColor = "#E53935";
                nodeTimerBlock.style.borderColor = "#E53935";
            } else {
                if (breakSeconds < 2) {
                    sessionSeconds = inputSessionLength.value * 60;
                    sessionsCounter++;
                    nodeSessionsCounter.innerHTML = sessionsCounter;
                    fillPerc = 0;
                    nodeTimerFill.style.height = "0%";
                }
                nodeTimerTitle.innerHTML = "Break";
                breakSeconds--;
                var newBreakTime = breakSeconds / 60;
                displayTime(newBreakTime);
                fillPerc = 100 - breakSeconds * 100 / (inputBreakLength.value * 60);
                nodeTimerFill.style.height = fillPerc + "%";
                nodeTimerFill.style.backgroundColor = "#5E35B1";
                nodeTimerBlock.style.borderColor = "#5E35B1";
            }
            return timerFunc;
        }(), 1000);
    } else {
        wasPause = true;
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
    fillPerc = 0;
    nodeTimerFill.style.height = "0%";
    disabledToggle(false);
    clearInterval(timer);
    displayTime(inputSessionLength.value);
}

function disabledToggle(state) {
    for (var _i = 0; _i < inputs.length; _i++) {
        inputs[_i].disabled = state;
    }
    for (var _i2 = 0; _i2 < buttons.length; _i2++) {
        buttons[_i2].disabled = state;
    }
}

function displayTime(overallMinutes) {
    var overallSeconds = overallMinutes * 60;
    var haveHours = overallMinutes - 60 >= 0;
    var hours = Math.floor(overallSeconds / 3600);
    if (hours < 10) hours = "0" + hours;
    var minutes = Math.floor(overallSeconds % 3600 / 60);
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = Math.floor(overallSeconds % 3600 % 60);
    if (seconds < 10) seconds = "0" + seconds;
    if (haveHours) {
        nodeTimerValue.innerHTML = hours + ":" + minutes + ":" + seconds;
    } else {
        nodeTimerValue.innerHTML = minutes + ":" + seconds;
    }
}