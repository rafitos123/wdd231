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
            const list = document.createElement("ul");
            const name = document.createElement("li");
            const Url = document.createElement("p");
            const Phone = document.createElement("p");
            const Adress = document.createElement("p");
            const Membership = document.createElement("p");
            const rate = document.createElement("p");
            const image = document.createElement('img');

            image.setAttribute('src', company.image);
            image.setAttribute('alt', `The ${company.name}`); 
            image.setAttribute('loading', 'lazy');
            image.setAttribute('width', '100');
            image.setAttribute('height', '100');

            name.textContent = company.name;
            Url.textContent = company.Url;
            Adress.textContent = company.Adress;
            Phone.textContent = company.Phone;
            Membership.textContent = company.Membership;
            rate.textContent = company.rate;
            

            list.appendChild(image);
            list.appendChild(name);
            list.appendChild(Url);
            list.appendChild(Adress);
            list.appendChild(Phone);
            list.appendChild(Membership);
            list.appendChild(rate);
            cards.appendChild(list);
        });



    }


getMembers()