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
const addEvent = document.getElementById("buttonAddEvent");
const modalSection = document.getElementById("modal--section");
const modalContent = document.getElementById("modal--content");
const closeModal = document.getElementById("close--modal");

let titleValidate = false;
let initialDateValidate = false;
let endDateValidate = false;
let remindMeValidate = false;

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonth.addEventListener("click", printPrevMonth);
nextMonth.addEventListener("click", printNextMonth);
addEvent.addEventListener("click", showEventModal);

printMonth(monthNumber);

/* Functions to print the months */

function printMonth (month) {
    for(let i = 0; i < startDay(); i++) {
        calendarDates.innerHTML += `<section></section>`;
    }
    for(let i = 1; i <= getTotalMonthDays(month); i++) {
        if((currentDate.getDate() === i) && (currentDate.getMonth() === monthNumber) && (currentDate.getFullYear() === currentYear)) {
            calendarDates.innerHTML += `<section class="calendar--days today--show">${i}<button class="button-day" id="${i}">Add event</button></section>`
        } else {
            calendarDates.innerHTML += `<section class="calendar--days">${i}<button class="button-day" id="${i}">Add event</button></section>`
        }
    }
    buttonsDays = document.querySelectorAll(".button-day");
    buttonsDays.forEach(e => {
        e.addEventListener("click", showEventModal);
    });
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
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    calendarDates.innerHTML = "";
    printMonth(monthNumber);
}

/* Functions to show and hide de modal */

function showEventModal(e) {
    prevMonth.removeEventListener("click", printPrevMonth);
    nextMonth.removeEventListener("click", printNextMonth);
    addEvent.removeEventListener("click", showEventModal);
    buttonsDays.forEach(e => {
        e.removeEventListener("click", showEventModal);
    });
    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <section>
        <h2 class="title--new--event">NEW EVENT</h2>
        <form class="form--add--event">
            <label for="title" class="label--modal">Title:</label>
            <input type="text" id="title" class ="title input--modal" name="title">
            <p class="error-msg error-hiden" id="error-title">Please, write title</p>
            <fieldset class="fieldset--modal">
                <label for="initial--date" class="label--modal">Initial date:</label>
                <input type="datetime-local" id="initial--date" class="initial--date input--modal" name="initial--date">
                <p class="error-msg error-hiden" id="error-initial--date">Please, select date</p>
            </fieldset>
            <fieldset class="fieldset--modal">
                <input type="checkbox" id="check-end-date" class="check-end-date input--modal" name="check-end-date">
                <label for="check-end-date" class="label--modal">End date</label>
            </fieldset>
            <fieldset class="fieldset--modal fieldset--hidden" id="end--date--content">
                <label for="end--date" class="label--modal">End date:</label>
                <input type="datetime-local" id="end--date" class="end--date input--modal" name="end--date">
                <p class="error-msg error-hiden" id="error-end--date">Please, select date</p>
            </fieldset>
            <fieldset class="fieldset--modal">
                <input type="checkbox" id="check-remind-me" class="check-remind-me input--modal" name="check-remind-me">
                <label for="check-remind-me" class="label--modal">Remind me when this event expires</label>
            </fieldset>
            <fieldset class="fieldset--modal fieldset--hidden" id="remind--me--content">
                <label for="time-remind-me" class="label--modal">Before:</label>
                <select name="time-remind-me" id="time-remind-me" class="time-remind-me input--modal">
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60">1 h</option>
                    <option value="default" selected>Select an option</option>
                </select>
                <p class="error-msg error-hiden" id="error-time-remind-me">Please, select an option</p>
            </fieldset>
            <label for="description" class="label--modal">Description:</label>
            <textarea name="description" id="description" maxlength="500"></textarea>
            <fieldset class="fieldset--modal">
                <label for="event--type" class="label--modal">Event type:</label>
                <select name="even--type" id="even--type" class="even--type input--modal">
                    <option value="meeting">Meeting</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                    <option value="leisure">Leisure</option>
                    <option value="other" selected>Other</option>
                </select>
            </fieldset>
            <fieldset class="button--modal">
                <button type="reset" class="button" id="cancel--button--addEvent">Cancel</button>
                <button class="button" id="create--new--event" disabled>Create</button>
            </fieldset>
        </form>
    </section>`;


    newTitle = document.getElementById("title");
    newInitialDate = document.getElementById("initial--date");
    checkEndDate = document.getElementById("check-end-date");
    newEndDate = document.getElementById("end--date");
    checkRemindMe = document.getElementById("check-remind-me");
    newRemindMe = document.getElementById("time-remind-me");
    endDateContent = document.getElementById("end--date--content");
    remindMeContent = document.getElementById("remind--me--content");
    cancelButtonAddEvent = document.getElementById("cancel--button--addEvent");
    createEventButton = document.getElementById("create--new--event");

    if((parseInt(e.target.id)) > 0 && (parseInt(e.target.id)) <= 31) {
        if((parseInt(e.target.id)) < 10 && (monthNumber+1) > 10) {
            newInitialDate.value = `${currentYear}-${monthNumber+1}-0${parseInt(e.target.id)}T00:00`;
        } else if((parseInt(e.target.id)) < 10 && (monthNumber+1) < 10) {
            newInitialDate.value = `${currentYear}-0${monthNumber+1}-0${parseInt(e.target.id)}T00:00`;
        } else if ((parseInt(e.target.id)) > 10 && (monthNumber+1) < 10) {
            newInitialDate.value = `${currentYear}-0${monthNumber+1}-${parseInt(e.target.id)}T00:00`;
        } else if ((parseInt(e.target.id)) > 10 && (monthNumber+1) > 10) {
            newInitialDate.value = `${currentYear}-${monthNumber+1}-${parseInt(e.target.id)}T00:00`;
        }
    }

    modalSection.classList.toggle("hidden");

    closeModal.addEventListener("click", hiddenModal);
    modalSection.addEventListener("click", hiddenModalClickingOut);
    window.addEventListener("keyup", hiddenModalEscape);
    cancelButtonAddEvent.addEventListener("click", hiddenModal);
    checkEndDate.addEventListener("click", showEnDate);
    checkRemindMe.addEventListener("click", showRemindMe);
    createEventButton.addEventListener("click", createNewEvent);

    newTitle.addEventListener("blur", validateTitle);
    newTitle.addEventListener("click", hideError);
    newInitialDate.addEventListener("blur", validateInitalDate);
    newInitialDate.addEventListener("click", hideError);
    newEndDate.addEventListener("blur", validateEndDate);
    newEndDate.addEventListener("click", hideError);
    newRemindMe.addEventListener("blur", validateRemindMe);
    newRemindMe.addEventListener("click", hideError);
}
function hiddenModal() {
    modalSection.classList.toggle("hidden");
    closeModal.removeEventListener("click", hiddenModal);
    modalSection.removeEventListener("click", hiddenModalClickingOut);
    window.removeEventListener("keyup", hiddenModalEscape);
    cancelButtonAddEvent.removeEventListener("click", hiddenModal);
    checkEndDate.removeEventListener("click", showEnDate);
    checkRemindMe.removeEventListener("click", showRemindMe);
    createEventButton.removeEventListener("click", createNewEvent);
    newTitle.removeEventListener("blur", validateTitle);
    newTitle.removeEventListener("click", hideError);
    newInitialDate.removeEventListener("blur", validateInitalDate);
    newInitialDate.removeEventListener("click", hideError);
    newEndDate.removeEventListener("blur", validateEndDate);
    newEndDate.removeEventListener("click", hideError);
    newRemindMe.removeEventListener("blur", validateRemindMe);
    newRemindMe.removeEventListener("click", hideError);
    prevMonth.addEventListener("click", printPrevMonth);
    nextMonth.addEventListener("click", printNextMonth);
    addEvent.addEventListener("click", showEventModal);
    buttonsDays.forEach(e => {
        e.addEventListener("click", showEventModal);
    });
}
function hiddenModalClickingOut(e) {
    if(e.target.id === "modal--section") {
        modalSection.classList.toggle("hidden");
        closeModal.removeEventListener("click", hiddenModal);
        modalSection.removeEventListener("click", hiddenModalClickingOut);
        window.removeEventListener("keyup", hiddenModalEscape);
        cancelButtonAddEvent.removeEventListener("click", hiddenModal);
        checkEndDate.removeEventListener("click", showEnDate);
        checkRemindMe.removeEventListener("click", showRemindMe);
        createEventButton.removeEventListener("click", createNewEvent);
        newTitle.removeEventListener("blur", validateTitle);
        newTitle.removeEventListener("click", hideError);
        newInitialDate.removeEventListener("blur", validateInitalDate);
        newInitialDate.removeEventListener("click", hideError);
        newEndDate.removeEventListener("blur", validateEndDate);
        newEndDate.removeEventListener("click", hideError);
        newRemindMe.removeEventListener("blur", validateRemindMe);
        newRemindMe.removeEventListener("click", hideError);
        prevMonth.addEventListener("click", printPrevMonth);
        nextMonth.addEventListener("click", printNextMonth);
        addEvent.addEventListener("click", showEventModal);
        buttonsDays.forEach(e => {
            e.addEventListener("click", showEventModal);
        });
    }
}
function hiddenModalEscape(e) {
    if(e.keyCode == 27) {
        modalSection.classList.toggle("hidden");
        closeModal.removeEventListener("click", hiddenModal);
        modalSection.removeEventListener("click", hiddenModalClickingOut);
        window.removeEventListener("keyup", hiddenModalEscape);
        cancelButtonAddEvent.removeEventListener("click", hiddenModal);
        checkEndDate.removeEventListener("click", showEnDate);
        checkRemindMe.removeEventListener("click", showRemindMe);
        createEventButton.removeEventListener("click", createNewEvent);
        newTitle.removeEventListener("blur", validateTitle);
        newTitle.removeEventListener("click", hideError);
        newInitialDate.removeEventListener("blur", validateInitalDate);
        newInitialDate.removeEventListener("click", hideError);
        newEndDate.removeEventListener("blur", validateEndDate);
        newEndDate.removeEventListener("click", hideError);
        newRemindMe.removeEventListener("blur", validateRemindMe);
        newRemindMe.removeEventListener("click", hideError);
        prevMonth.addEventListener("click", printPrevMonth);
        nextMonth.addEventListener("click", printNextMonth);
        addEvent.addEventListener("click", showEventModal);
        buttonsDays.forEach(e => {
            e.addEventListener("click", showEventModal);
        });
    }
}
function showEnDate() {
    createEventButton.disabled = true;
    endDateContent.classList.toggle("fieldset--hidden");
}
function showRemindMe() {
    createEventButton.disabled = true;
    remindMeContent.classList.toggle("fieldset--hidden");
}

/* Functions to create new event */

function createNewEvent() {

}

/* Functions to validate new event form */

function validateTitle(e) {
    if(newTitle.value.length > 3 && newTitle.value.length <= 60) {
        titleValidate = true;
        activateCreateButton();
    } else {
        var mensageElement = document.querySelector('[id~=error-'+ e.target.id +']');
        if (mensageElement.classList.contains("error-hiden")) {
            mensageElement.classList.remove("error-hiden");
        } else {
            return
        }
    }
}
function validateInitalDate(e) {
    var dateTime = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/
    if (newInitialDate.value.match(dateTime)) {
        initialDateValidate = true;
        activateCreateButton();
    } else {
        var mensageElement = document.querySelector('[id~=error-'+ e.target.id +']');
        if (mensageElement.classList.contains("error-hiden")) {
            mensageElement.classList.remove("error-hiden");
        } else {
            return
        }
    }
}
function validateEndDate(e) {
    var dateTime = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/
    if (newEndDate.value.match(dateTime)) {
        endDateValidate = true;
        activateCreateButton();
    } else {
        var mensageElement = document.querySelector('[id~=error-'+ e.target.id +']');
        if (mensageElement.classList.contains("error-hiden")) {
            mensageElement.classList.remove("error-hiden");
        } else {
            return
        }
    }
}
function validateRemindMe(e) {
    if(newRemindMe.value !== "default") {
        remindMeValidate = true;
        activateCreateButton();
    } else {
        var mensageElement = document.querySelector('[id~=error-'+ e.target.id +']');
        if (mensageElement.classList.contains("error-hiden")) {
            mensageElement.classList.remove("error-hiden");
        } else {
            return
        }
    }
}

/* Function to hidde error mesages */

function hideError(e) {
    var mensageElement = document.querySelector('[id~=error-'+ e.target.id +']');
    if (mensageElement.classList.contains("error-hiden")) {
        return
    } else {
        mensageElement.classList.add("error-hiden");
    }
}

/* Function to activate submit button in add event */

function activateCreateButton() {
    if(checkRemindMe.checked === true && checkEndDate.checked === true) {
        if (titleValidate === true && initialDateValidate === true && endDateValidate === true && remindMeValidate === true) {
            createEventButton.disabled = false;
        }
    } else if (checkRemindMe.checked === false && checkEndDate.checked === true) {
        if(titleValidate === true && initialDateValidate === true && endDateValidate === true && remindMeValidate === false) {
            createEventButton.disabled = false;
        }
    } else if (checkRemindMe.checked === true && checkEndDate.checked === false) {
        if(titleValidate === true && initialDateValidate === true && endDateValidate === false && remindMeValidate === true) {
            createEventButton.disabled = false;
        }
    } else if (checkRemindMe.checked === false && checkEndDate.checked === false) {
        if(titleValidate === true && initialDateValidate === true && endDateValidate === false && remindMeValidate === false) {
            createEventButton.disabled = false;
        }
    }
}
