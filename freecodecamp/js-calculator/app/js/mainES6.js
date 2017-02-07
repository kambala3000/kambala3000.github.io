"use strict";

var buttonsBox = document.getElementById('js-buttons-box'),
    entryBox = document.getElementById('js-entry'),
    historyBox = document.getElementById('js-history');

var status = '';

buttonsBox.onclick = function (e) {
    var btn = e.target,
        valBtn = btn.value;

    if (valBtn == '/' || valBtn == '*' || valBtn == '-' || valBtn == '+') {
        historyBox.innerHTML = entryBox.innerHTML;
        entryBox.innerHTML = '0';
    }

    if (entryBox.innerHTML === '0' && valBtn != '.') {
        entryBox.innerHTML = entryBox.innerHTML.slice(1);
    }

    console.log('kk2');
    entryBox.innerHTML = entryBox.innerHTML + valBtn;
};