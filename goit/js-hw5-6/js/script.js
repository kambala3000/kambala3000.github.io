var display = document.getElementById("display"),
    startButton = document.getElementById("start-stop_button"),
    splitButton = document.getElementById("split_button"),
    resetButton = document.getElementById("reset_button");

startButton.addEventListener("click", startTimer);
splitButton.addEventListener("click", splitTimer);
resetButton.addEventListener("click", resetTimer);

var go = false,
    counter = 0,
    splitsCountAr = [0],
    stopsCountAr = [0],
    splitsBlock = document.getElementById("splits"),
    timerId, msec, sec, min, hour;


var splitInfo = document.createElement("p");
splitInfo.classList.add("splits__split");

function startTimer() {
    if (go == false) {
        timerId = setInterval(function() {
            counter++;
            msec = counter % 100;
            msec < 10 ? msec = "0" + msec : false;
            sec = Math.floor(counter / 100) % 60;
            sec < 10 ? sec = "0" + sec : false;
            min = Math.floor(counter / 6000) % 60;
            min < 10 ? min = "0" + min : false;
            hour = Math.floor(counter / 360000) % 24;
            hour < 10 ? hour = "0" + hour : false;
            display.value = hour + ":" + min + ":" + sec + "." + msec;
        }, 10);
        go = true;
        startButton.value = "Stop";
    } else {
        clearInterval(timerId);
        go = false;
        startButton.value = "Start";
        var stopsMas = splitInfo.cloneNode(true);
        splitsCountAr[0]++;
        stopsMas.innerHTML = splitsCountAr[0] + " Stop " + hour + ":" + min + ":" + sec + "." + msec;
        splitsBlock.appendChild(stopsMas);
    }
}

function splitTimer() {
    if (go == true) {
        splitsCountAr[0]++;
        var splitsMas = splitInfo.cloneNode(true);
        splitsMas.innerHTML = splitsCountAr[0] + " Split " + hour + ":" + min + ":" + sec + "." + msec;
        splitsBlock.appendChild(splitsMas);
    }
}

function resetTimer() {
    clearInterval(timerId);
    go = false;
    counter = 0;
    splitsCountAr[0] = 0;
    startButton.value = "Start";
    display.value = "00:00:00.00";
    var splitsElemAr = document.getElementsByClassName("splits__split");
    for (var i = (splitsElemAr.length - 1); i >= 0; i--) {
        splitsBlock.removeChild(splitsElemAr[i]);
    }
}
