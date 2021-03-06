"use strict";

const buttonsBox = document.getElementById("js-buttons-box"),
    entryBox = document.getElementById("js-entry"),
    historyBox = document.getElementById("js-history");

let resultFlag = false;
const operations = {
    "/": "/",
    "*": "*",
    "+": "+",
    "-": "-"
};

buttonsBox.onclick = function(e) {
    let btn = e.target,
        btnVal = btn.value,
        current = entryBox.innerHTML,
        history = historyBox.innerHTML,
        lastInput = historyBox.innerHTML.slice(-1);

    if (btnVal === "ac") {
        entryBox.innerHTML = "0";
        historyBox.innerHTML = "";
        resultFlag = false;
    } else if (btnVal === "ce") {
        historyBox.innerHTML = historyBox.innerHTML.slice(
            0,
            historyBox.innerHTML.length - current.length
        );
        entryBox.innerHTML = "0";
    } else if (btnVal === "=") {
        if (history === "") return;
        resultFlag = true;
        entryBox.innerHTML = +eval(history).toFixed(12);
        historyBox.innerHTML = historyBox.innerHTML + "=" + entryBox.innerHTML; // output
    } else if (btnVal in operations) {
        if (lastInput in operations || history === "") return;
        if (resultFlag) {
            historyBox.innerHTML = history.slice(history.indexOf("=") + 1);
            resultFlag = false;
        }
        entryBox.innerHTML = btnVal;
        historyBox.innerHTML = historyBox.innerHTML + btnVal; // output
    } else {
        if (lastInput in operations) {
            if (btnVal === ".") {
                entryBox.innerHTML = "0" + btnVal;
                historyBox.innerHTML = historyBox.innerHTML + "0" + btnVal; // output
            } else {
                entryBox.innerHTML = btnVal;
                historyBox.innerHTML = historyBox.innerHTML + btnVal; // output
            }
        } else {
            if (current === "0") {
                if (btnVal !== ".") {
                    entryBox.innerHTML = btnVal;
                    historyBox.innerHTML = btnVal; // output
                } else if (btnVal === ".") {
                    entryBox.innerHTML = entryBox.innerHTML + btnVal;
                    historyBox.innerHTML = historyBox.innerHTML + "0" + btnVal; // output
                }
            } else {
                if (btnVal === "." && current.indexOf(".") >= 0) return;
                if (resultFlag) {
                    historyBox.innerHTML = history.slice(history.indexOf("=") + 1);
                    resultFlag = false;
                }
                entryBox.innerHTML = entryBox.innerHTML + btnVal;
                historyBox.innerHTML = historyBox.innerHTML + btnVal; // output
            }
        }
    }
};
