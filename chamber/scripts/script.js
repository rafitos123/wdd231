
//display array members
const linksURL = "https://rafitos123.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector('#directory');


async function getMembers() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.table(data.companies);

    //select 3 ramdon companies
    const randomCompanies = getRandomCompanies(data.companies, 3);
    displayLinks(randomCompanies);
}

// get 3 random companies function
function getRandomCompanies(companies, count) {
    const CompanyRandom = companies.sort(() => 0.5 - Math.random()); 
    return CompanyRandom.slice(0, count);
}

//show companies
const displayLinks = (companies) => {
    companies.forEach(company => {
        const card = document.createElement("div");
        card.classList.add("card");

        const container = document.createElement("div");
        container.classList.add("container");

        const image = document.createElement('img');
        const name = document.createElement("h2");
        const Url = document.createElement("p");
        const Phone = document.createElement("p");
        const Adress = document.createElement("p");
        const Membership = document.createElement("p");
        const email = document.createElement("p");

        image.setAttribute('src', company.image);
        image.setAttribute('alt', `The ${company.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '100');
        image.setAttribute('height', '100');

        name.textContent = company.name;
        Url.textContent = `Website: ${company.Url}`;
        Adress.textContent = `Address: ${company.Adress}`;
        Phone.textContent = `Phone: ${company.Phone}`;
        Membership.textContent = `Membership: ${company.Membership}`;
        email.textContent = `Email: ${company.email}`;

        container.appendChild(image);
        container.appendChild(name);
        container.appendChild(Url);
        container.appendChild(Adress);
        container.appendChild(Phone);
        container.appendChild(Membership);
        container.appendChild(email);

        card.appendChild(container);
        cards.appendChild(card);
    });
}

getMembers();




//current year
const today = new Date();

const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();

//last modification
const oLastModif = new Date(document.lastModified);
const last = document.querySelector("#lastModified");

const lastDate = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
last.innerHTML = `Last Modification: <span>${oLastModif.toLocaleString('en-US', lastDate)}</span>`;


//Menu hamburguer
const mainnav = document.querySelector('.navigation'); 
const hambutton = document.querySelector('#menu'); 


hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show'); 
    hambutton.classList.toggle('active'); 
});



//weather
const apiKey = "29dbdb5b52394d31fb0823709d986fb3"; 
const city = "Mogi Mirim"; 
const units = "metric";

// URLs APIs
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

// Search API data
async function fetchWeatherData() {
  try {
    //current weather
    const currentWeatherResponse = await fetch(currentWeatherURL);
    const currentWeatherData = await currentWeatherResponse.json();
    displayCurrentWeather(currentWeatherData);

    //forecast
    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

//current weather
function displayCurrentWeather(data) {
  const { main, weather, name } = data;
  const weatherHTML = `
   <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    <p><span>${name}</span></p>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
   
  `;
  document.getElementById("current-weather").innerHTML = weatherHTML;
}

//forecast
function displayForecast(data) {
    const forecastHTML = data.list
      .slice(0, 3) //three days forecast
      .map((forecast) => {
        const date = new Date(forecast.dt * 1000); 
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" }); 
        return `
          <p>${dayName}: <span>${forecast.main.temp}°C</span> </p>
        `;
      })
      .join("");
      document.getElementById("weather-forecast").innerHTML = `${forecastHTML}`;
  }

fetchWeatherData();

//MODALS
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

document.querySelectorAll('.open-button').forEach(button => {
  button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.showModal();
  });
});

document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', () => {
      const modal = button.closest('dialog');
      modal.close();
  });
});

//timestamp
// Preencher o campo de timestamp
document.addEventListener("DOMContentLoaded", function() {
  var timestampField = document.getElementById("timestamp");
  if (timestampField) {
    var currentTimestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
    timestampField.value = currentTimestamp;
  } else {
    console.error("Element with ID 'timestamp' not found.");
  }
});

// Exibir os dados na página de agradecimento
const currentUrl = window.location.href;
const everything = currentUrl.split('?');

let formData = everything[1].split('&');

function show(cup) {
  let result = "";
  formData.forEach((element) => {
      if (element.startsWith(cup)) {
          result = decodeURIComponent(element.split('=')[1].replace(/\+/g, ' '));
      } 
  });
  return(result);
}

const showInfo = document.querySelector("#form-data");
if (showInfo) {
  showInfo.innerHTML = `
  <h2>Your Data</h2><br>
  <p><span>First Name:</span> ${show("First")}</p>
  <p><span>Last Name:</span> ${show("Last")}</p>
  <p><span>Organizational Title:</span> ${show("OTitle")}</p>
  <p><span>Mobile Phone:</span> ${show("phone")}</p>
  <p><span>E-mail:</span> ${show("E-mail")}</p>
  <p><span>Business/organization's Name:</span> ${show("business")}</p>
  <p><span>You joined at:</span> ${show("timestamp")}</p>
  `;
} else {
  console.error("Element with ID 'form-data' not found.");
}

