/********
 * Employee Directory - A Demonstration of APIs and Async JS
 * 
 */

const requestURL = 'https://randomuser.me/api/';
const employeeCount = 12;
let fetchedEmployees = [];
let displayedEmployees = [];
let currentEmployeeIndex = 0;
const gallery = document.getElementById('gallery');


async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Fetch our set of employees, display the initial gallery, and build our details modal
function init() {
    getJSON(requestURL + `?nat=US&results=${employeeCount}`)
    .then(response => fetchedEmployees = response.results)
    .then(() => showGallery(fetchedEmployees))
    .catch(e => console.error('Error in fetch:', e));

    createModal();
    createSearch();

    const prevButton = document.getElementById('modal-prev');
    const nextButton = document.getElementById('modal-next');
    prevButton.addEventListener('click', showPrevEmployee);
    nextButton.addEventListener('click', showNextEmployee);
}


function showGallery(employees) {
    gallery.innerHTML = ''; // Clear previous results, if any

    employees.forEach(employee => {
        gallery.appendChild( createEmployeeCard(employee) );
    });

    displayedEmployees = employees;
}


const createEmployeeCard = function (employee) {
    const card = createDiv('card');
    const cardImg = createDiv('card-img-container');
    const cardInfo = createDiv('card-info-container');

    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    cardImg.innerHTML = `<img class="card-img" src="${employee.picture.large}" alt="profile picture">`;
    cardInfo.innerHTML = `<h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>`

    card.addEventListener('click', () => {
        showEmployeeDetail(employee);
        show( document.querySelector('.modal-container') );
    });

    return card;
}


function createSearch() {
    const search = document.createElement('form');
    search.action = '#';
    search.method = 'get';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'search-input';
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search...'

    const searchButton = document.createElement('input');
    searchButton.type = 'submit';
    searchButton.value = String.fromCodePoint('0x1F50D');
    searchButton.id = 'search-submit';
    searchButton.classList.add('search-submit');

    search.appendChild(searchInput);
    search.appendChild(searchButton);

    document.querySelector('.search-container').appendChild(search);

    search.addEventListener('submit', (event) => {
        event.preventDefault();
        doSearch(searchInput.value);
    });

    searchInput.addEventListener('input', (event) => {
        event.preventDefault();
        doSearch(searchInput.value);
    });
}


function createModal() {
    const container = createDiv('modal-container');
    hide(container);
    
    const modal = createDiv('modal');
    const modalInfo = createDiv('modal-info-container');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.id = 'modal-close-btn';
    closeButton.classList.add('modal-close-btn');
    closeButton.innerHTML = '<strong>X</strong>';

    const modalNav = createDiv('modal-btn-container');
    modalNav.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>`;

    document.querySelector('body').appendChild(container);
    container.appendChild(modal);
    modal.appendChild(closeButton);
    modal.appendChild(modalInfo);
    modal.appendChild(modalNav);

    closeButton.addEventListener('click', () => {
        hide(container);
    });
}


const showEmployeeDetail = function (employee) {
    currentEmployeeIndex = displayedEmployees.indexOf(employee);
    const modalInfo = document.querySelector('.modal-info-container');
    const birthdayDate = new Date(employee.dob.date);
    const birthday = `${birthdayDate.getMonth()}/${birthdayDate.getDate()}/${birthdayDate.getFullYear()}`;
    const address = `${employee.location.street.number} ${employee.location.street.name},
                     ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;

    const detailHTML = `<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.cell}</p>
    <p class="modal-text">${address}</p>
    <p class="modal-text">Birthday: ${birthday}</p>`;

    modalInfo.innerHTML = detailHTML;
    updateNavButtons();
}


function showPrevEmployee() {
    showEmployeeDetail(displayedEmployees[currentEmployeeIndex - 1]);
}


function showNextEmployee() {
    showEmployeeDetail(displayedEmployees[currentEmployeeIndex + 1]);
}


function updateNavButtons() {
    const prevButton = document.getElementById('modal-prev');
    const nextButton = document.getElementById('modal-next');

    if (currentEmployeeIndex === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentEmployeeIndex === displayedEmployees.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}


function doSearch(searchString) {
    if (searchString === '') {
        showGallery(fetchedEmployees);
        return;
    }

    const results = fetchedEmployees.filter(employee => {
        const fullName = `${employee.name.first} ${employee.name.last}`;
        if ( fullName.toLowerCase().includes( searchString.toLowerCase() ) ) {
            return true;
        } else {
            return false;
        }
    });

    showGallery(results);
}

// HELPER FUNCTIONS

const createDiv = function(className) {
    const div = document.createElement('div');
    div.classList.add(className);

    return div;
}

function show(element) {
    element.style.display = 'block';
}

function hide(element) {
    element.style.display = 'none';
}

// Finally, start everything off
init();