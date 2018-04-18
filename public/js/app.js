let beers = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);

  const dropdown = document.querySelector('#beers-dropdown');
  dropdown.addEventListener('change', displayBeer);
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
  const unsortedBeers = JSON.parse(jsonString);
  beers = unsortedBeers.sort((a, b) => a.name < b.name ? -1 : 1);
  populateDropdown(beers);
}

const populateDropdown = function (beers) {
  const dropdown = document.querySelector('#beers-dropdown');
  for(let i = 0; i < beers.length; i++) {
    let option;
    option = document.createElement('option');
    option.text = beers[i].name;
    option.value = i;
    dropdown.add(option);
  }
}

const displayBeer = function() {
  const div = document.querySelector('#beer-info');
  div.innerHTML = '';
  const beerName = document.createElement('h2');
  const beerTagLine = document.createElement('h3');
  const beerImage = document.createElement('div');
  const beerDescription = document.createElement('div');
  const img = document.createElement('img');
  const ingredients = document.createElement('h3');
  const malts = document.createElement('div');
  const hops = document.createElement('div');
  const yeast = document.createElement('div');

  const beer = beers[this.value];
  beerName.textContent = beer.name;
  beerTagLine.textContent = `"${beer.tagline}"`;
  img.src = beer.image_url;
  img.id = "beer";
  beerDescription.textContent = beer.description;
  ingredients.textContent = 'Ingredients:'

  const maltNames = [];
  beer.ingredients.malt.forEach(malt => maltNames.push(malt.name));
  malts.textContent = `Malt: ${maltNames.join(", ")}`;

  const hopNames = [];
  beer.ingredients.hops.forEach(hop => hopNames.push(hop.name));
  hops.textContent = `Hops: ${hopNames.join(", ")}`;

  yeast.textContent = `Yeast: ${beer.ingredients.yeast}`;

  div.appendChild(beerName);
  div.appendChild(beerTagLine);
  div.appendChild(beerImage);
  beerImage.appendChild(img);
  div.appendChild(beerDescription);
  div.appendChild(ingredients);
  div.appendChild(malts);
  div.appendChild(hops);
  div.appendChild(yeast);
}
