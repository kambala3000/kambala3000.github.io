"use strict";

const inputs = document.getElementsByClassName("pomodoro__settings-input"),
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

for (let i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function() {
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

btnStartTimer.addEventListener("click", startTimer);

function startTimer() {
    timerCountDown(inputSessionLength.value, inputBreakLength.value);
}

function timerCountDown(sessionTime, breakTime) {
    let sessionSeconds = sessionTime * 60;
    let breakSeconds = breakTime * 60;
    const timer = setInterval(function() {
        if (sessionSeconds < 2) clearInterval(timer);
        sessionSeconds--;
        console.log(sessionSeconds);
    }, 100); // 1000
}
