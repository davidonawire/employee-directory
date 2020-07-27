/********
 * Employee Directory - A Demonstration of APIs and Async JS
 * 
 */

const requestURL = 'https://randomuser.me/api/';
const employeeCount = 12;
let employees = [];


async function getEmployees(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

getEmployees(requestURL + `?results=${employeeCount}`)
    .then(response => employees = response.results)
    .catch(e => console.error('Error in fetch:', e));