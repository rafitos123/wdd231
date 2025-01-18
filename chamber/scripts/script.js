const linksURL = "https://rafitos123.github.io/wdd231/chamber/data/members.json";
const cards = document.querySelector('#directory');
//get results
async function getMembers() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.table(data.companies);
    displayLinks(data.companies);

}

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

getMembers()

//current year
const today = new Date();

const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();

//last modification
const oLastModif = new Date(document.lastModified);
const last = document.querySelector("#lastModified");

const lastDate = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
last.innerHTML = `Last Modification: <span>${oLastModif.toLocaleString('en-US', lastDate)}</span>`;


// Seleciona os elementos necessários
const mainnav = document.querySelector('.navigation'); // Menu de navegação
const hambutton = document.querySelector('#menu'); // Botão do menu (hambúrguer)

// Adiciona o evento de clique ao botão do menu
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show'); // Alterna a classe .show no menu
    hambutton.classList.toggle('active'); // Alterna a aparência do botão
});



//Temperature and WindChill
let temperature = 20;
let windSpeed = 17;


const calculateWindchill = (temperature, windSpeed) => { return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);};
let windchill;


if (temperature > 10) {
    windchill = "N/A";
} else {
    windchill = calculateWindchill(temperature, windSpeed).toFixed(2);
}


document.getElementById("windchill").innerText = windchill + "°C";
document.getElementById("temperature").innerText = temperature + "°C";
document.getElementById("wind").innerText = windSpeed + " km/h";