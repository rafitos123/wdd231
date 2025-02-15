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

        const button = document.createElement("input");

        const image = document.createElement('img');
        const name = document.createElement("h3");
        const price = document.createElement("span");

        //smartphone image
        image.setAttribute('src', smartphone.image);
        image.setAttribute('alt', smartphone.name);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '300');

        //button
        button.setAttribute("type", "submit");
        button.setAttribute("value", "Features");

        //smartphone name and price
        name.textContent = smartphone.name;
        price.textContent = `${smartphone.price}`;


        //modal
        const modal = document.createElement("dialog");
        modal.classList.add("modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = smartphone.name;

        const modalText = document.createElement("p");
        modalText.textContent = `Features: ${smartphone.features}`;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("close-btn");

        //close modal
        closeButton.addEventListener("click", () => {
            modal.close();
        });

        //append information to modal
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalText);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        //open modal
        button.addEventListener("click", () => {
            modal.showModal();
        });

        //append information to card
        container.appendChild(image);
        container.appendChild(name);
        container.appendChild(price);
        container.appendChild(button);
        card.appendChild(container);
        card.appendChild(modal); 
        cards.appendChild(card);
    });
}

getSmartphones();


//directory 2 home page
const cards2 = document.querySelector('#directory2');

async function getRandom() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        console.table(data.smartphones);

        // Select 4 random smartphones
        const randomSmartphones = getRandomSmartphones(data.smartphones, 4);
        displaySmartphones(randomSmartphones);
    } catch (error) {
        console.error("Erro ao carregar os smartphones:", error);
    }
}

// Function to select 4 random smartphones
function getRandomSmartphones(smartphones, count) {
    return [...smartphones] 
        .sort(() => 0.5 - Math.random()) 
        .slice(0, count);
}


const displaySmartphones = (smartphones) => {
    cards2.innerHTML = ''; 

    smartphones.forEach(smartphone2 => {
        const card = document.createElement("div");
        card.classList.add("card");

        const container = document.createElement("div");
        container.classList.add("container");

        const image = document.createElement('img');
        const name = document.createElement("h3");
        const price = document.createElement("span");

        image.setAttribute('src', smartphone2.image);
        image.setAttribute('alt', `The ${smartphone2.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '300');

        name.textContent = smartphone2.name;
        price.textContent = `${smartphone2.price}`;

        container.appendChild(image);
        container.appendChild(name);
        container.appendChild(price);

        card.appendChild(container);
        cards2.appendChild(card);
    });
}

getRandom();

//form select
document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("smartphone");

    fetch(linksURL)
        .then(response => response.json())
        .then(data => {
            select.innerHTML = ""; 
            
            data.smartphones.forEach(smartphone => {
                let option = document.createElement("option");
                option.value = smartphone.name;
                option.textContent = smartphone.name;
                select.appendChild(option);
            });
        }).catch(error => {
            console.error("Error to load smartphones:", error);
            select.innerHTML = "<option value=''>Error to load smartphones</option>";
        });

       
    })
    
      

//chatbot API
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



const apiKey = "AIzaSyAfGN9EJih0sdHUMg-4_HOOGvRR4VMg3u8"; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatbox = document.getElementById("chatbox");


    let userMessage = userInput.value;
    if (!userMessage) return;

    // Exibir a mensagem do usuário
    chatbox.innerHTML += `<div><span>You:</span> ${userMessage}</div><br>`;
    userInput.value = "";

    // Configuração da requisição
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userMessage }] }]
        })
    });

    const data = await response.json();
    const botMessage = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error getting response.";

    // Exibir a resposta do bot
    chatbox.innerHTML += `<div><span>Everest Bot:</span> ${botMessage}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight; 
}


//local Storage 
function displayVisitMessage() {
    const visitElement = document.getElementById("visits");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentTime = new Date().getTime();

    if (!visitElement) {
        console.error("Elemento #visits não encontrado no HTML!");
        return;
    }

    if (!lastVisit) {
        // Primeira visita
        visitElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const timeDiff = currentTime - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            visitElement.textContent = "Back so soon!";
        } else {
            visitElement.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago.`;
        }
    }

    // Atualiza o timestamp da última visita no localStorage
    localStorage.setItem("lastVisit", currentTime);
}

// Garante que o script seja executado após o DOM estar totalmente carregado
document.addEventListener("DOMContentLoaded", displayVisitMessage);