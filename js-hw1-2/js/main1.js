function degree() {
    var result = 1,
        x = 0,
        n = 0,
        xTrimmed = 0,
        nTrimmed = 0;
    x = prompt('Введите нужное число');
    xTrimmed = x.trim();
    n = prompt('Введите степень числа');
    nTrimmed = n.trim();
    if (xTrimmed.replace(/\d/g, '').length > 0 || nTrimmed.replace(/\d/g, '').length > 0) {
        alert('Пожалуйста, обновите страницу и введите только цифры')
        throw new Error("Недопустимое значение");
    } else if (x == 0) {
        result = 0;
    } else {
        for (i = 1; i <= n; i++) {
            result *= x;
        }
    }
    return result;
}

console.log(degree());
