let beers = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);

  const dropdown = document.querySelector('#beers-dropdown');
  dropdown.addEventListener('change', getBeerInfo);
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
  populateDropdown();
}

const populateDropdown = function () {
  const dropdown = document.querySelector('#beers-dropdown');
  for(let i = 0; i < beers.length; i++) {
    let option;
    option = document.createElement('option');
    option.text = beers[i].name;
    option.value = i;
    dropdown.add(option);
  }
}

const getBeerInfo = function (event) {
  const div = document.querySelector('#beer-info');
  div.innerHTML = '';
  displayBeer(beers[this.value], div);
}

const displayBeer = function(beer, div) {
  const ul = document.createElement('ul');
  const beerName = document.createElement('li');
  const beerTagLine = document.createElement('li');
  const beerImage = document.createElement('li');
  const img = document.createElement('img');
  const malts = document.createElement('li');
  const hops = document.createElement('li');
  const yeast = document.createElement('li');

  beerName.textContent = beer.name;
  beerTagLine.textContent = `"${beer.tagline}"`;
  img.src = beer.image_url;

  const maltNames = [];
  beer.ingredients.malt.forEach(malt => maltNames.push(malt.name));
  malts.textContent = `Malts: ${maltNames.join(", ")}`;

  const hopNames = [];
  beer.ingredients.hops.forEach(hop => hopNames.push(hop.name));
  hops.textContent = `Hops: ${hopNames.join(", ")}`;

  yeast.textContent = `Yeast: ${beer.ingredients.yeast}`;

  div.appendChild(ul);
  ul.appendChild(beerName);
  ul.appendChild(beerTagLine);
  ul.appendChild(beerImage);
  beerImage.appendChild(img);
  ul.appendChild(malts);
  ul.appendChild(hops);
  ul.appendChild(yeast);
}
