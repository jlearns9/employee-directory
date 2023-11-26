import { employees } from './employees.js';

// DOM Elements
const employeesEl = document.querySelector('.employees');
const searchMenuEl = document.querySelector('.search__menu');
const searchInputEl = document.querySelector('.search__input');

// Variables
const uniqueTeams = [...new Set(employees.map(employee => employee.team))];
let filteredEmployees = employees

// Event Listeners
document.addEventListener('DOMContentLoaded', initializePage);
searchMenuEl.addEventListener('change', filterBySelect)
searchInputEl.addEventListener('input', filterByInput)

// Functions
function initializePage() {
    selectMenuSetup();
    displayFilteredEmployees();
}

function selectMenuSetup() {
    uniqueTeams.forEach(team => {
        const capitalizedTeam = team.charAt(0).toUpperCase() + team.slice(1)
        searchMenuEl.appendChild(new Option(capitalizedTeam, team));
    });
}

function filterBySelect() {
    filteredEmployees = employees.filter(employee => 
        searchMenuEl.value === 'Everyone' || employee.team === searchMenuEl.value
    );
    searchInputEl.value = ''
    displayFilteredEmployees()
}

function filterByInput() {
    filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchInputEl.value)
    );
    displayFilteredEmployees()
}

function generateSocialLinks(employee) {
    let socialLinksHtml = '';

    const generateLink = (url, icon, altText) => `
        <a href='${url}' target='_blank'>
            <img src='../images/elements/${icon}' alt='${altText}' class='social-icon'>
        </a>`;

    if (employee.social.twitter) {
        socialLinksHtml += generateLink(employee.social.twitter, 'social-twitter.png', 'Twitter-icon');
    }

    if (employee.social.linkedin) {
        socialLinksHtml += generateLink(employee.social.linkedin, 'social-linkedin.png', 'LinkedIn-icon');
    }

    return socialLinksHtml;
}

function displayFilteredEmployees() {
    const html = filteredEmployees.map(employee => `
        <div class='employee__card flex'>
            <img class='employee__card-img' src='../images/photos/${employee.image}' alt='profile-picture'>
            <h2 class='employee__card-name'>${employee.name}</h2>
            <h3 class='employee__card-title'>${employee.title}</h3>
            <p class='employee__card-bio'>${employee.bio}</p>
            <div class='employee__card-socials flex'>${generateSocialLinks(employee)}</div>
        </div>
    `).join('');
    employeesEl.innerHTML = html;
}
