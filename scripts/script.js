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


//course array 
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

//array filter
function displayCourses(courses) {
    const courseList = document.getElementById('courseList');
    const totalCreditsElement = document.getElementById('totalCredits');
    courseList.innerHTML = '';

    courses.forEach((course) => {
        const courseItem = document.createElement('div');

        // Verifica se o curso está completo e aplica a classe 'completed' se for verdadeiro
        const courseClass = course.completed ? 'completed' : 'incomplete';
        
        courseItem.innerHTML = `
            <p class="${courseClass}">${course.subject} ${course.number}</p>
        `;
        courseList.appendChild(courseItem);
    });

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.innerHTML = `Total number of credits required: ${totalCredits}`;
}

//show courses
function AllCourses() {
    displayCourses(courses);
}

function CSECourses() {
    const filteredCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(filteredCourses);
}

function WDDCourses() {
    const filteredCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(filteredCourses);
}
