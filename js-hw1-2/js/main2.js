var namesAr = [];
for (i = 0; i < 5; i++) {
    var nameStr = prompt('Введите имя ' + (i + 1)),
        nameTrimmed = nameStr.trim();
    if (nameTrimmed == '') {
        alert('Поле "Имя" не может быть пустым')
        throw new Error("Недопустимое имя");
    }
    namesAr[i] = nameTrimmed;
}
var loginStr = prompt('Введите имя пользователя'),
    loginTrimmed = loginStr.trim(),
    flag = 0;
for (i = 0; i < 5; i++) {
    if (namesAr[i] == loginTrimmed) {
        flag = 1;
    }
}
if (flag == 1) {
    alert(loginTrimmed + ', Вы успешно вошли');
} else {
    alert('Имя пользователя неверно');
}
