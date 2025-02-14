//navbar scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

//Menu hamburguer
const mainnav = document.querySelector('.navigation'); 
const hambutton = document.querySelector('#menu'); 


hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show'); 
    hambutton.classList.toggle('active'); 
});


//content scroll animation
document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector(".content");

    function handleScroll() {
        const contentPosition = content.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (contentPosition < screenHeight * 0.75) {
            content.classList.add("show");
            window.removeEventListener("scroll", handleScroll); // Remove o evento após a animação
        }
    }

    window.addEventListener("scroll", handleScroll);
});

//current year
const today = new Date();

const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();



const linksURL = "https://rafitos123.github.io/wdd231/project/data/smartphones.json";
const cards = document.querySelector('#directory');

//show smartphones in card
async function getSmartphones() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        console.table(data.smartphones);
        displayLinks(data.smartphones); 
    } catch (error) {
        console.error("Erro ao buscar os smartphones:", error);
    }
}


    const displayLinks = (smartphones) => {
    cards.innerHTML = ""; 

    smartphones.forEach(smartphone => {
        const card = document.createElement("div");
        card.classList.add("card");

        const container = document.createElement("div");
        container.classList.add("container");

        const image = document.createElement('img');
        const name = document.createElement("h2");
        const price = document.createElement("p");

        image.setAttribute('src', smartphone.image);
        image.setAttribute('alt', smartphone.name);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '100');
        image.setAttribute('height', '100');

        name.textContent = smartphone.name;
        price.textContent = `Price: ${smartphone.price}`;

        container.appendChild(image);
        container.appendChild(name);
        container.appendChild(price);

        card.appendChild(container);
        cards.appendChild(card);
    });
}

getSmartphones();

//show smartphones features