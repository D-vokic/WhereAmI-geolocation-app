# 🌍 Where Am I – Mini Geolocation App

This is a simple JavaScript web application that shows the **country details** based on **geographic coordinates** (latitude and longitude). It demonstrates how to work with asynchronous JavaScript, REST APIs, and dynamic DOM manipulation using only **Vanilla JavaScript**.

---

## ✨ Demo

You can view a live demo of this project [here](https://d-vokic.github.io/).

Call the `whereAmI(lat, lng)` function from the browser console with desired coordinates, and the app will:

- Log the city and country in the console
- Dynamically display a country card with details like the flag, name, population, language, and currency

---

## Table of Contents

- [Where Am I](#where-am-i)

  - [Demo](#demo)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [How It Works](#how-it-works)
  - [Features](#features)
  - [Usage Example](#usage-example)
  - [Project Structure](#project-structure)
  - [What You Will Learn](#what-you-will-learn)
  - [Notes](#notes)
  - [Author](#author)
  - [License](#license)

  - [Prerequisites](#prerequisites)
  - [How to Run](#how-to-run)
  - [Usage](#usage)
  - [Built with](#built-with)
  - [Contributing / Support](#contributing--support)
  - [Author](#author)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## 🧰 Technologies Used

- **HTML** & **CSS** – Page structure and styling
- **Vanilla JavaScript (ES6+)** – Core logic and DOM manipulation
- **Fetch API & Promises** – To handle asynchronous operations
- **REST API Integration**:
  - [BigDataCloud Reverse Geocoding API](https://www.bigdatacloud.com/)
  - [REST Countries API](https://restcountries.com/)

---

## 🌐 How It Works

1. You pass latitude and longitude to the `whereAmI()` function.
2. It fetches the location details (country code and city) from BigDataCloud.
3. Using the country code, it fetches full country info from REST Countries API.
4. The country data is then rendered in a styled card on the web page.

---

## 📦 Features

- Display country name, flag, region
- Population (in millions)
- Official language and currency
- Logs your location (city, country) to the console
- Handles API errors gracefully
- Supports multiple `whereAmI()` calls in a row

---

## 🚀 Usage Example

```js
// Germany (Berlin)
whereAmI(52.508, 13.381);

// India (Mumbai)
whereAmI(19.037, 72.873);

// South Africa (Cape Town)
whereAmI(-33.933, 18.474);

// Serbia (Belgrade)
whereAmI(44.7866, 20.4489);

// Hungary (Budapest)
whereAmI(47.4979, 19.0402);

// Russia (Moscow)
whereAmI(55.7558, 37.6173);
```

## 📁 Project Structure

```
where-am-i/
├── index.html # HTML skeleton
├── style.css # Basic styling for the app
├── script.js # Main JavaScript logic (with fetch and DOM rendering)
└── README.md # Project documentation
```

## 🧠 What You Will Learn

- How to use the Fetch API and handle asynchronous workflows with Promises

- How to integrate multiple APIs to build a single feature

- Difference between /name/ and /alpha/ endpoints in REST Countries API

- Rendering dynamic HTML content using template literals and the DOM API

- Handling API errors and network issues

## 📝 Notes

- restcountries.com provides both /name/{country} and /alpha/{code} endpoints — this app uses /alpha/ for accuracy.

- bigdatacloud.net does not require an API key for basic geolocation, making it ideal for learning projects.

- This project is suitable for extending with additional features (e.g. map integration, weather data, bordering countries, etc.).

## 👨‍💻 Author

Duško Vokić
Test technician & front-end developer
Passionate about learning and improving skills in JavaScript and web development.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
