'use strict';

var filePath = '../xml/bands.xml';
var XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
var xhr = new XHRequest();

xhr.open('GET', filePath, true);

xhr.onload = function () {
        var responseDoc = this.responseXML;
        var rootElem = document.getElementById('root');
        var bandArr = responseDoc.getElementsByTagName('band');
        for (var i = 0; i < bandArr.length; i++) {
                var bandContainer = document.createElement('div');
                bandContainer.classList.add('band');

                var bandLogo = document.createElement('img');
                bandLogo.classList.add('band__logo');
                var logo = bandArr[i].getElementsByTagName('logo')[0];
                var logoTitle = logo.getAttribute('title');
                bandLogo.setAttribute('src', logo.innerHTML);
                bandLogo.setAttribute('title', logoTitle);

                var bandName = document.createElement('h3');
                bandName.classList.add('band__header');
                var name = bandArr[i].getAttribute('name');
                var date = bandArr[i].getAttribute('date');
                bandName.innerHTML = name + ', ' + date;

                var bandGenre = document.createElement('p');
                bandGenre.classList.add('band__genre');
                var genre = bandArr[i].getElementsByTagName('genre')[0].innerHTML;
                bandGenre.innerHTML = '\u0416\u0430\u043D\u0440: ' + genre;

                var bandCountry = document.createElement('p');
                bandCountry.classList.add('band__country');
                var country = bandArr[i].getElementsByTagName('country')[0].innerHTML;
                bandCountry.innerHTML = '\u0421\u0442\u0440\u0430\u043D\u0430: ' + country;

                var bandLang = document.createElement('p');
                bandLang.classList.add('band__lang');
                var lang = bandArr[i].getElementsByTagName('lang')[0].innerHTML;
                bandLang.innerHTML = '\u042F\u0437\u044B\u043A: ' + lang;

                var bandSite = document.createElement('a');
                bandSite.classList.add('band__site');
                var link = bandArr[i].getElementsByTagName('site')[0].innerHTML;
                bandSite.setAttribute('href', link);
                bandSite.setAttribute('target', '_blank');
                bandSite.innerHTML = 'Официальный сайт';

                var membersArr = bandArr[i].getElementsByTagName('member');

                var bandMembersListHeader = document.createElement('h5');
                bandMembersListHeader.classList.add('band__list-header');
                bandMembersListHeader.innerHTML = 'Состав';

                var bandMembersList = document.createElement('ul');
                bandMembersList.classList.add('band__members-list');

                for (var k = 0; k < membersArr.length; k++) {
                        var bandMember = document.createElement('li');
                        bandMember.classList.add('band__member');
                        var memberRole = membersArr[k].getAttribute('role');
                        var member = membersArr[k].innerHTML;
                        bandMember.innerHTML = memberRole + ': ' + member;
                        bandMembersList.appendChild(bandMember);
                }

                var bandInfo = document.createElement('p');
                bandInfo.classList.add('band__info');
                var info = bandArr[i].getElementsByTagName('shortinfo')[0].innerHTML;
                bandInfo.innerHTML = info;

                var bandAlbumsListHeader = document.createElement('h5');
                bandAlbumsListHeader.classList.add('band__list-header');
                bandAlbumsListHeader.innerHTML = 'Альбомы';

                var bandAlbumsList = document.createElement('ul');
                bandAlbumsList.classList.add('band__albums-list');

                var albumsArr = bandArr[i].getElementsByTagName('album');

                for (var j = 0; j < albumsArr.length; j++) {
                        var bandAlbum = document.createElement('li');
                        bandAlbum.classList.add('band__album');
                        var albumYear = albumsArr[j].getAttribute('year');
                        var album = albumsArr[j].innerHTML;
                        bandAlbum.innerHTML = albumYear + ' \u2014 ' + album;
                        bandAlbumsList.appendChild(bandAlbum);
                }

                bandContainer.appendChild(bandLogo);
                bandContainer.appendChild(bandName);
                bandContainer.appendChild(bandGenre);
                bandContainer.appendChild(bandCountry);
                bandContainer.appendChild(bandLang);
                bandContainer.appendChild(bandSite);
                bandContainer.appendChild(bandMembersListHeader);
                bandContainer.appendChild(bandMembersList);
                bandContainer.appendChild(bandInfo);
                bandContainer.appendChild(bandAlbumsListHeader);
                bandContainer.appendChild(bandAlbumsList);
                rootElem.appendChild(bandContainer);
        }
};

xhr.onerror = function () {
        console.log('Error! ' + this.status + ':' + this.statusText);
};

xhr.send();