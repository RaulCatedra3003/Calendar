let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const calendarDates = document.getElementById("calendar--dates");
const prevMonth = document.getElementById("prev--month");
const nextMonth = document.getElementById("next--month");
const month = document.getElementById("calendar--month");
const year = document.getElementById("calendar--year");

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonth.addEventListener("click", printPrevMonth);
nextMonth.addEventListener("click", printNextMonth);

printMonth(monthNumber);

function printMonth (month) {
    switch (startDay()) {
        case 0:
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`;
            }
            break;
        case 1:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
        case 2:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
        case 3:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
        case 4:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
        case 5:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
        case 6:
            for(let i = 0; i < startDay(); i++) {
                calendarDates.innerHTML += `<section></section>`;
            }
            for(let i = 1; i <= getTotalMonthDays(month); i++) {
                calendarDates.innerHTML += `<section class="calendar--days">${i}</section>`
            }
            break;
    }
}

function getTotalMonthDays (month) {
    if(month === -1) {
        month = 11;
    }
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    } else if(month === 3 || month === 5 || month === 8 || month == 10) {
        return 30;
    } else {
        return isLeap() ? 29:28;
    }
}

function isLeap() {
    return ((currentYear % 100 !== 0 && currentYear % 4 === 0) || (currentYear % 400 === 0));
}

function startDay() {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

function printPrevMonth() {
    if(monthNumber !== 0) {
        monthNumber--;
    } else {
        monthNumber = 11;
        currentYear--;
    }
    setNewDate();
}

function printNextMonth() {
    if(monthNumber !== 11) {
        monthNumber++;
    } else {
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
}

function setNewDate() {
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    calendarDates.innerHTML = "";
    printMonth(monthNumber);
}