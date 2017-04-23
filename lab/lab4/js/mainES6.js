'use strict';

const filePath = '../xml/bands.xml';
const XHRequest = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
const xhr = new XHRequest();

xhr.open('GET', filePath, true);

xhr.onload = function() {
    const responseDoc = this.responseXML;
    const rootElem = document.getElementById('root');
    const bandArr = responseDoc.getElementsByTagName('band');
    for (let i = 0; i < bandArr.length; i++) {
        const bandContainer = document.createElement('div');
        bandContainer.classList.add('band');

        const bandLogo = document.createElement('img');
        bandLogo.classList.add('band__logo');
        const logo = bandArr[i].getElementsByTagName('logo')[0];
        const logoTitle = logo.getAttribute('title');
        bandLogo.setAttribute('src', logo.innerHTML);
        bandLogo.setAttribute('title', logoTitle);

        const bandName = document.createElement('h3');
        bandName.classList.add('band__header');
        const name = bandArr[i].getAttribute('name');
        const date = bandArr[i].getAttribute('date');
        bandName.innerHTML = `${name}, ${date}`;

        const bandGenre = document.createElement('p');
        bandGenre.classList.add('band__genre');
        const genre = bandArr[i].getElementsByTagName('genre')[0].innerHTML;
        bandGenre.innerHTML = `Жанр: ${genre}`;

        const bandCountry = document.createElement('p');
        bandCountry.classList.add('band__country');
        const country = bandArr[i].getElementsByTagName('country')[0].innerHTML;
        bandCountry.innerHTML = `Страна: ${country}`;

        const bandLang = document.createElement('p');
        bandLang.classList.add('band__lang');
        const lang = bandArr[i].getElementsByTagName('lang')[0].innerHTML;
        bandLang.innerHTML = `Язык: ${lang}`;

        const bandSite = document.createElement('a');
        bandSite.classList.add('band__site');
        const link = bandArr[i].getElementsByTagName('site')[0].innerHTML;
        bandSite.setAttribute('href', link);
        bandSite.setAttribute('target', '_blank');
        bandSite.innerHTML = 'Официальный сайт';

        const membersArr = bandArr[i].getElementsByTagName('member');

        const bandMembersListHeader = document.createElement('h5');
        bandMembersListHeader.classList.add('band__list-header');
        bandMembersListHeader.innerHTML = 'Состав';

        const bandMembersList = document.createElement('ul');
        bandMembersList.classList.add('band__members-list');

        for (let k = 0; k < membersArr.length; k++) {
            const bandMember = document.createElement('li');
            bandMember.classList.add('band__member');
            const memberRole = membersArr[k].getAttribute('role');
            const member = membersArr[k].innerHTML;
            bandMember.innerHTML = `${memberRole}: ${member}`;
            bandMembersList.appendChild(bandMember);
        }

        const bandInfo = document.createElement('p');
        bandInfo.classList.add('band__info');
        const info = bandArr[i].getElementsByTagName('shortinfo')[0].innerHTML;
        bandInfo.innerHTML = info;

        const bandAlbumsListHeader = document.createElement('h5');
        bandAlbumsListHeader.classList.add('band__list-header');
        bandAlbumsListHeader.innerHTML = 'Альбомы';

        const bandAlbumsList = document.createElement('ul');
        bandAlbumsList.classList.add('band__albums-list');

        const albumsArr = bandArr[i].getElementsByTagName('album');

        for (let j = 0; j < albumsArr.length; j++) {
            const bandAlbum = document.createElement('li');
            bandAlbum.classList.add('band__album');
            const albumYear = albumsArr[j].getAttribute('year');
            const album = albumsArr[j].innerHTML;
            bandAlbum.innerHTML = `${albumYear} — ${album}`;
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

xhr.onerror = function() {
    console.log('Error! ' + this.status + ':' + this.statusText);
};

xhr.send();
