/********
 * Employee Directory - A Demonstration of APIs and Async JS
 * 
 */

const requestURL = 'https://randomuser.me/api/';
const employeeCount = 12;
let employees = [];
const gallery = document.getElementById('gallery');


async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

getJSON(requestURL + `?nat=US&results=${employeeCount}`)
    .then(response => employees = response.results)
    .catch(e => console.error('Error in fetch:', e));

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

    return card;
}

const createDiv = function(className) {
    const div = document.createElement('div');
    div.classList.add(className);

    return div;
}

function createGallery() {
    employees.forEach(employee => {
        gallery.appendChild( createEmployeeCard(employee) );
    });
}

function createModal() {
    const container = createDiv('modal-container');
    const modal = createDiv('modal');
    const modalInfo = createDiv('modal-info-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'modal-close-btn';
    button.classList.add('modal-close-btn');
    button.innerHTML = '<strong>X</strong>';

    document.querySelector('body').appendChild(container);
    container.appendChild(modal);
    modal.appendChild(button);
    modal.appendChild(modalInfo);
}

const showEmployeeDetail = function (employee) {
    const modalInfo = document.querySelector('.modal-info-container');
    const birthdayDate = new Date(employee.dob.date);
    const birthday = `${birthdayDate.getMonth()}/${birthdayDate.getDate()}/${birthdayDate.getFullYear()}`;

    const detailHTML = `<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.phone}</p>
    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${birthday}</p>`;

    modalInfo.innerHTML = detailHTML;
}

function show(element) {
    element.style.display = 'inherit';
}

function hide(element) {
    element.style.display = 'none';
}