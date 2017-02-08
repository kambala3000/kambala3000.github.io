"use strict";

var buttonsBox = document.getElementById('js-buttons-box'),
    entryBox = document.getElementById('js-entry'),
    historyBox = document.getElementById('js-history');

var status = '',
    resultFlag = 0;

buttonsBox.onclick = function (e) {
    var btn = e.target,
        valBtn = btn.value,
        current = entryBox.innerHTML,
        lastOperation = historyBox.innerHTML.slice(-1);


    if (valBtn === 'ce' || valBtn === 'ac') {
        if (valBtn === 'ce') {
            var cutLength = current.length;
            historyBox.innerHTML = historyBox.innerHTML.slice(0, historyBox.innerHTML.length - cutLength);
            entryBox.innerHTML = '0';
        } else {
            entryBox.innerHTML = '0';
            historyBox.innerHTML = '';
        }
    } else {
        if (valBtn === '/' || valBtn === '*' || valBtn === '-' || valBtn === '+') {  
            if (current === '/' || current === '*' || current === '-' || current === '+') return;
            if (lastOperation === '/' || lastOperation === '*' || lastOperation === '-' || lastOperation === '+') return;
            entryBox.innerHTML = eval(historyBox.innerHTML);
            resultFlag = 1;
            //   entryBox.innerHTML = '0';
        } else {
            if (lastOperation === '/' || lastOperation === '*' || lastOperation === '-' || lastOperation === '+') {
                entryBox.innerHTML = '0';
            }
            if (entryBox.innerHTML === '0' && valBtn !== '.') {
                entryBox.innerHTML = entryBox.innerHTML.slice(1);
            }
            entryBox.innerHTML = entryBox.innerHTML + valBtn;
        }
        if (current === '/' || current === '*' || current === '-' || current === '+') {
            entryBox.innerHTML = '0';
        }
        historyBox.innerHTML = historyBox.innerHTML + valBtn;
    }
    // console.log('kk2');
};