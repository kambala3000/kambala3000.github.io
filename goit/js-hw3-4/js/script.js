var wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

var form = document.createElement('form');
form.classList.add('main-form');
form.setAttribute('action', 'index.html');
form.setAttribute('method', 'post');

var head = document.createElement('h5');
head.classList.add('head');
head.innerHTML = 'Тест по программированию';

document.body.appendChild(wrapper);
wrapper.appendChild(head);
wrapper.appendChild(form);

var answersBox = document.createElement('div');
answersBox.classList.add('answers-box');

var question = document.createElement('p');
question.classList.add('answers-box__question');

var checkbox = document.createElement('input');
checkbox.classList.add('answers__checkbox');
checkbox.setAttribute('type', 'checkbox');

var label = document.createElement('label');
label.classList.add('answers__label');

var answers = document.createElement('p');
answers.classList.add('answers-box__answers');


var divsAr = [],
    questionsAr = [],
    checkboxesAr = [],
    answersAr = [],
    lablesAr = [];
for (var i = 1; i < 4; i++) {
    divsAr[i] = answersBox.cloneNode(true);
    form.appendChild(divsAr[i]);

    questionsAr[i] = question.cloneNode(true);
    questionsAr[i].innerHTML = i + '. Вопрос №' + i;
    divsAr[i].appendChild(questionsAr[i]);

    for (var j = 1; j < 4; j++) {
        answersAr[j] = answers.cloneNode(true);
        divsAr[i].appendChild(answersAr[j]);

        checkboxesAr[j] = checkbox.cloneNode(true);
        answersAr[j].appendChild(checkboxesAr[j]);

        lablesAr[j] = label.cloneNode(true);
        answersAr[j].appendChild(lablesAr[j]);
        lablesAr[j].innerHTML = ('Вариант ответа №' + j);
    }
}

var checkboxId = document.getElementsByClassName("answers__checkbox"),
    lableFor = document.getElementsByClassName("answers__label");
for (var i = 0; i < checkboxId.length; i++) {
    checkboxId[i].setAttribute('id', 'che' + i);
    lableFor[i].setAttribute('for', 'che' + i);
}


var button = document.createElement('button');
button.classList.add('main-form__button');
button.setAttribute('type', 'submit');
button.innerHTML = 'Проверить мои результаты';
form.appendChild(button);
