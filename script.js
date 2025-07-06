'use strict';

/** @type {HTMLElement} Container where country information will be rendered */
const countriesContainer = document.querySelector('.countries');

/**
 * Renders country data into the DOM.
 *
 * @param {Object} data - Country data object from REST Countries API.
 * @param {string} [className=''] - Optional additional class name for styling.
 */
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/**
 * Displays an error message in the UI.
 *
 * @param {string} msg - The error message to be displayed.
 */
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/**
 * Fetches and displays country information based on geographic coordinates.
 *
 * Uses reverse geocoding to determine the country from latitude and longitude,
 * then fetches country details from the REST Countries API.
 *
 * @param {number} lat - Latitude.
 * @param {number} lng - Longitude.
 */
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryCode}`);

      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data))
    .catch(err => console.error(`${err.message} 💥`));
};

// Example calls with coordinates
whereAmI(44.7866, 20.4489);
whereAmI(47.4979, 19.0402);
whereAmI(55.7558, 37.6173);
