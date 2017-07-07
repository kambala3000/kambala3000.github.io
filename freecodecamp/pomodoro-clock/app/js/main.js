"use strict";

var inputs = document.getElementsByClassName("pomodoro__settings-input"),
    btnReduceBreak = document.getElementById("break-reduce"),
    btnIncBreak = document.getElementById("break-inc"),
    inputBreakLength = document.getElementById("break-length"),
    btnReduceSession = document.getElementById("session-reduce"),
    btnIncSession = document.getElementById("session-inc"),
    inputSessionLength = document.getElementById("session-length"),
    nodeTimerBlock = document.getElementById("timer-block"),
    nodeTimerValue = document.getElementById("timer-value"),
    nodeTimerFill = document.getElementById("timer-fill"),
    btnStartTimer = document.getElementById("start-timer"),
    btnResetTimer = document.getElementById("reset-timer");

for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        resetTimer();
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

btnStartTimer.addEventListener("click", startTimer);
btnResetTimer.addEventListener("click", resetTimer);

var timer = null;
var sessionSeconds = "0";
var breakSeconds = "0";

function startTimer() {
    var timerToggle = this.value === "start" ? true : false;
    if (timerToggle) {
        this.value = "pause";
        this.innerHTML = "Pause";
    } else {
        this.value = "start";
        this.innerHTML = "Start";
    }
    timerCountDown(timerToggle);
}

function timerCountDown(isBegin) {
    sessionSeconds = inputSessionLength.value * 60;
    breakSeconds = inputBreakLength.value * 60;
    console.log(isBegin);
    if (isBegin) {
        timer = setInterval(function timerFunc() {
            if (sessionSeconds < 2) clearInterval(timer);
            sessionSeconds--;
            var newSessionTime = sessionSeconds / 60;
            displayTime(newSessionTime);

            console.log(sessionSeconds);
            return timerFunc;
        }(), 1000);
    } else {
        console.log(timer); // rework
        clearTimeout(timer);
    }
}

function resetTimer() {
    clearInterval(timer);
    displayTime(inputSessionLength.value);
    console.log("reseted");
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