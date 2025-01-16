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