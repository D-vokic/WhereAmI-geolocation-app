'use strict';

/** @type {HTMLElement} Container where country information will be rendered */
const countriesContainer = document.querySelector('.countries');

/** @type {HTMLSelectElement} Dropdown for selecting a country */
const countrySelect = document.getElementById('country-select');

/**
 * Fetches and loads the list of countries into the dropdown selector.
 *
 * Uses REST Countries API v3.1 to retrieve essential country details,
 * sorts countries alphabetically, and enables the select input.
 *
 * @async
 * @returns {Promise<void>}
 */
async function loadCountries() {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies'
    );
    console.log('Response status:', response.status);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const countries = await response.json();
    console.log('Countries received:', countries);

    // Sort countries alphabetically by common name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Populate select options
    countrySelect.innerHTML =
      '<option value="">-- Select a country --</option>';
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });

    countrySelect.disabled = false;
  } catch (err) {
    console.error('Failed to load country list:', err);
    countrySelect.innerHTML =
      '<option value="">-- Failed to load countries --</option>';
  }
}

/**
 * Event listener for dropdown selection.
 * When a country is selected, fetches its details and renders them.
 */
countrySelect.addEventListener('change', async function () {
  const selectedCountry = this.value;
  if (!selectedCountry) return;

  countriesContainer.innerHTML = ''; // Clear previous country

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        selectedCountry
      )}?fullText=true`
    );
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();

    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError('Failed to load selected country data.');
  }
});

/**
 * Renders country data in the DOM.
 *
 * @param {Object} data - Country object returned from REST Countries API.
 * @param {string} [className=''] - Optional additional CSS class for styling.
 */
const renderCountry = function (data, className = '') {
  const languages = data.languages
    ? Object.values(data.languages).join(', ')
    : 'Unknown';

  let currencies = 'Unknown';
  if (data.currencies) {
    currencies = Object.values(data.currencies)
      .map(currency => currency.name)
      .join(', ');
  }

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" alt="Flag of ${
    data.name.common
  }" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1_000_000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${languages}</p>
        <p class="country__row"><span>💰</span>${currencies}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/**
 * Displays an error message in the UI.
 *
 * @param {string} msg - Error message to be displayed.
 */
const renderError = function (msg) {
  countriesContainer.innerHTML = `<p class="error">${msg}</p>`;
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

      return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message} 💥`);
      renderError(`Error: ${err.message}`);
    });
};

// Initial load
loadCountries();

// Example geolocation lookups
whereAmI(44.7866, 20.4489); // Belgrade
whereAmI(47.4979, 19.0402); // Budapest
whereAmI(55.7558, 37.6173); // Moscow
