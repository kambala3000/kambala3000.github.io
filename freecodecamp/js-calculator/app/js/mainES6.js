"use strict";

const buttonsBox = document.getElementById("js-buttons-box"),
    entryBox = document.getElementById("js-entry"),
    historyBox = document.getElementById("js-history");

let status = "",
    resultFlag = false,
    operations = ["/", "*", "+", "-"];

buttonsBox.onclick = function(e) {
    let btn = e.target,
        btnVal = btn.value,
        current = entryBox.innerHTML,
        history = historyBox.innerHTML,
        lastOperation = historyBox.innerHTML.slice(-1);

    if (btnVal === "ac") {
        entryBox.innerHTML = "0";
        historyBox.innerHTML = "";
        status = "";
        resultFlag = false;
    } else if (btnVal === "ce") {
        historyBox.innerHTML = historyBox.innerHTML.slice(
            0,
            historyBox.innerHTML.length - current.length
        );
        entryBox.innerHTML = "0";
    } else if (btnVal === "=") {
        entryBox.innerHTML = eval(history);
        historyBox.innerHTML = historyBox.innerHTML + "=" + entryBox.innerHTML; // output
    } else if (operations.indexOf(btnVal) !== -1) {
        if (operations.indexOf(lastOperation) !== -1 || history === "") return;
        entryBox.innerHTML = btnVal;
        historyBox.innerHTML = historyBox.innerHTML + btnVal; // output
    } else {
        if (operations.indexOf(lastOperation) !== -1) {
            entryBox.innerHTML = "";
        }
        if (current === "0" && btnVal !== ".") {
            entryBox.innerHTML = entryBox.innerHTML.slice(1);
        }
        entryBox.innerHTML = entryBox.innerHTML + btnVal;
        historyBox.innerHTML = historyBox.innerHTML + btnVal; // output
    }
};
