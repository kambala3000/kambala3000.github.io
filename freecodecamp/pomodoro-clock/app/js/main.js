"use strict";

var inputs = document.getElementsByClassName("pomodoro__settings-input");

for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    };
}