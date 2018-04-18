let beers = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
});

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('load', callback);
}

const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  beers = JSON.parse(jsonString);
  loopThroughBeers();
}

const loopThroughBeers = function () {
  beers.forEach(beer => displayBeer(beer));
}

const displayBeer = function(beer) {
  const div = document.querySelector('#beer-list')
  const ul = document.createElement('ul');
  const beerName = document.createElement('li');
  const beerTagLine = document.createElement('li');
  const beerImage = document.createElement('li');
  const img = document.createElement('img');

  beerName.textContent = beer.name;
  beerTagLine.textContent = `"${beer.tagline}"`;
  img.src = beer.image_url;

  div.appendChild(ul);
  ul.appendChild(beerName);
  ul.appendChild(beerTagLine);
  ul.appendChild(beerImage);
  beerImage.appendChild(img);

}
