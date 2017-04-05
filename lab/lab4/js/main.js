'use strict';

function ratesRequest(apiAdress, tableId) {
    var XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHRequest();

    xhr.open('GET', apiAdress, true);

    xhr.onload = function () {
        var XMLText = this.responseXML;
        var rootTable = document.getElementById(tableId).tBodies[0];
        var ratesArr = XMLText.getElementsByTagName('exchangerate');
        for (var i = 0; i < rootTable.rows.length; i++) {
            var tableRow = rootTable.rows[i];
            tableRow.cells[0].innerHTML = ratesArr[i].getAttribute('ccy');
            tableRow.cells[1].innerHTML = ratesArr[i].getAttribute('buy');
            tableRow.cells[2].innerHTML = ratesArr[i].getAttribute('sale');
        }
    };

    xhr.onerror = function () {
        console.log('Error! ' + this.status + ':' + this.statusText);
    };

    xhr.send();
}

var privatRatesAPI = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';
var privatRatesTable = 'privatTable';
ratesRequest(privatRatesAPI, privatRatesTable);

var NBURatesAPI = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=3';
var NBURatesTable = 'NBUTable';
ratesRequest(NBURatesAPI, NBURatesTable);