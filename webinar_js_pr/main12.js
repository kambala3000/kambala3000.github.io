var line = document.createElement('p');
line.classList.add('line');

var checkbox = document.createElement('input');
checkbox.classList.add('checkbox');
checkbox.setAttribute('type', 'checkbox');
var doc = document.body;

var checkboxes_ar = [],
    lines_ar = [];
for (var i = 0; i < 10; i++) {
    lines_ar[i] = line.cloneNode(true);
    doc.appendChild(lines_ar[i]);

    checkboxes_ar[i] = checkbox.cloneNode(true);
    checkbox.setAttribute('name', 'che' + i);
    lines_ar[i].appendChild(checkboxes_ar[i]);
}
