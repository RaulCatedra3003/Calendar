let events = [];
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
const calendarInfo = document.querySelector(".calendar--info");
const warning = document.getElementById("warning");
const warningHidden = document.getElementById("warning--hidden");

let titleValidate = false;
let initialDateValidate = false;
let endDateValidate = false;
let remindMeValidate = false;
let haschange = false;

let contador = -1;
let position = 0;

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonth.addEventListener("click", printPrevMonth);
nextMonth.addEventListener("click", printNextMonth);
addEvent.addEventListener("click", showEventModal);

refreshEventWithLocalStorage();
printMonth(monthNumber);
setInterval(remindEvent, 10000);

/* Functions to print the months */

function printMonth (month) {
    calendarDates.innerHTML = "";
    checkPastEvent();
    for(let i = 0; i < startDay(); i++) {
        calendarDates.innerHTML += `<section></section>`;
    }
    for(let i = 1; i <= getTotalMonthDays(month); i++) {
        if((currentDate.getDate() === i) && (currentDate.getMonth() === monthNumber) && (currentDate.getFullYear() === currentYear)) {
            if (i < 10) {
                calendarDates.innerHTML += `<section class="calendar--days today--show" id="0${i}">${i}<button class="button-day" id="${i}">Add event</button></section>`
            } else {
                calendarDates.innerHTML += `<section class="calendar--days today--show" id="${i}">${i}<button class="button-day" id="${i}">Add event</button></section>`
            }
        } else {
            if (i < 10) {
                calendarDates.innerHTML += `<section class="calendar--days" id="0${i}">${i}<button class="button-day" id="${i}">Add event</button></section>`
            } else {
                calendarDates.innerHTML += `<section class="calendar--days" id="${i}">${i}<button class="button-day" id="${i}">Add event</button></section>`
            }
        }
    }

    let days = document.querySelectorAll('.calendar--days');
    days.forEach(e => {
        let dayId = e.id;
        events.forEach(j => {
            if(j.initialDay == dayId && j.initialMonth == (monthNumber+1) && j.initialYear == currentYear) {
                if(j.eventType == "meeting") {
                    if(j.past === true) {
                        e.innerHTML += `<section class="event meeting past" id="${j.title}">${j.title}</section>`;
                    } else {
                        e.innerHTML += `<section class="event meeting" id="${j.title}">${j.title}</section>`
                    }
                } else if (j.eventType == "study") {
                    if(j.past === true) {
                        e.innerHTML += `<section class="event study past" id="${j.title}">${j.title}</section>`;
                    } else {
                        e.innerHTML += `<section class="event study" id="${j.title}">${j.title}</section>`
                    }
                } else if (j.eventType == "personal") {
                    if(j.past === true) {
                        e.innerHTML += `<section class="event personal past" id="${j.title}">${j.title}</section>`;
                    } else {
                        e.innerHTML += `<section class="event personal" id="${j.title}">${j.title}</section>`
                    }
                } else if(j.eventType == "other") {
                    if(j.past === true) {
                        e.innerHTML += `<section class="event other past" id="${j.title}">${j.title}</section>`;
                    } else {
                        e.innerHTML += `<section class="event other" id="${j.title}">${j.title}</section>`
                    }
                }
            }
        })
    })

    DOMevents = document.querySelectorAll('.event');
    DOMevents.forEach(e => {
        e.addEventListener('click', showEventInfo);
    })

    buttonsDays = document.querySelectorAll(".button-day");
    buttonsDays.forEach(e => {
        e.addEventListener("click", showEventModal);
    });
    calendarDays = document.querySelectorAll(".calendar--days");
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
    if(haschange === false) {
        month.style.animation = "prevMonth .8s linear";
        calendarDays.forEach(e => {
            e.style.animation = "prevMonthDates .8s linear";
        });
        haschange = true;
    } else {
        month.style.animation = "nextMonth .8s linear";
        calendarDays.forEach(e => {
            e.style.animation = "nextMonthDates .8s linear";
        });
        haschange = false;
    }
}
function printNextMonth() {
    if(monthNumber !== 11) {
        monthNumber++;
    } else {
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
    if(haschange === false) {
        month.style.animation = "prevMonth .8s linear";
        calendarDays.forEach(e => {
            e.style.animation = "prevMonthDates .8s linear";
        });
        haschange = true;
    } else {
        month.style.animation = "nextMonth .8s linear";
        calendarDays.forEach(e => {
            e.style.animation = "nextMonthDates .8s linear";
        });
        haschange = false;
    }
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
                <input type="checkbox" id="check-end-date" class="check-end-date input--modal--checkbox" name="check-end-date">
                <label for="check-end-date" class="label--modal">End date</label>
            </fieldset>
            <fieldset class="fieldset--modal fieldset--hidden" id="end--date--content">
                <label for="end--date" class="label--modal">End date:</label>
                <input type="datetime-local" id="end--date" class="end--date input--modal" name="end--date">
                <p class="error-msg error-hiden" id="error-end--date">Please, select date</p>
            </fieldset>
            <fieldset class="fieldset--modal">
                <input type="checkbox" id="check-remind-me" class="check-remind-me input--modal--checkbox" name="check-remind-me">
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
    newDescription = document.getElementById("description");
    newEventType = document.getElementById("even--type");

    if((parseInt(e.target.id)) > 0 && (parseInt(e.target.id)) <= 31) {
        if((parseInt(e.target.id)) < 10 && (monthNumber+1) >= 10) {
            newInitialDate.value = `${currentYear}-${monthNumber+1}-0${parseInt(e.target.id)}T00:00`;
            initialDateValidate = true;
        } else if((parseInt(e.target.id)) < 10 && (monthNumber+1) < 10) {
            newInitialDate.value = `${currentYear}-0${monthNumber+1}-0${parseInt(e.target.id)}T00:00`;
            initialDateValidate = true;
        } else if ((parseInt(e.target.id)) >= 10 && (monthNumber+1) < 10) {
            newInitialDate.value = `${currentYear}-0${monthNumber+1}-${parseInt(e.target.id)}T00:00`;
            initialDateValidate = true;
        } else if ((parseInt(e.target.id)) >= 10 && (monthNumber+1) >= 10) {
            newInitialDate.value = `${currentYear}-${monthNumber+1}-${parseInt(e.target.id)}T00:00`;
            initialDateValidate = true;
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
function showEnDate(e) {
    createEventButton.disabled = true;
    endDateContent.classList.toggle("fieldset--hidden");
    console.log(e);
}
function showRemindMe() {
    createEventButton.disabled = true;
    remindMeContent.classList.toggle("fieldset--hidden");
}

/* Functions to create new event */

function createNewEvent(e) {
    e.preventDefault();
    let event = {
        title: '',
        initialYear: '',
        initialMonth: '',
        initialDay: '',
        initialHour: '',
        initialMinute: '',
        finishYear: '',
        finishMonth: '',
        finishDay: '',
        finishHour: '',
        finishMinute: '',
        remind: false,
        remindBefore: '',
        description: '',
        eventType: '',
        duration: '',
        past: false
    }

    let eInitialDateAndTime = newInitialDate.value.split("T");
    let eInitialDate = eInitialDateAndTime[0].split("-");
    let eInitialTime = eInitialDateAndTime[1].split(":");

    event.title = newTitle.value;
    event.initialYear = eInitialDate[0];
    event.initialMonth = eInitialDate[1];
    event.initialDay = eInitialDate[2];
    event.initialHour = eInitialTime[0];
    event.initialMinute = eInitialTime[1];
    event.description = newDescription.value;
    event.eventType = newEventType.value;

    if(checkEndDate.checked === true && checkRemindMe.checked === true) {
        let eFinishDateAndTime = newEndDate.value.split("T");
        let eFinishDate = eFinishDateAndTime[0].split("-");
        let eFinishTime = eFinishDateAndTime[1].split(":");

        event.finishYear = eFinishDate[0];
        event.finishMonth = eFinishDate[1];
        event.finishDay = eFinishDate[2];
        event.finishHour = eFinishTime[0];
        event.finishMinute = eFinishTime[1];
        event.remind = true;
        event.remindBefore = newRemindMe.value;
    } else if (checkEndDate.checked === false && checkRemindMe.checked === true){
        event.finishYear = eInitialDate[0];
        event.finishMonth = eInitialDate[1];
        event.finishDay = eInitialDate[2];
        event.finishHour = '23';
        event.finishMinute = '59';
        event.remind = true;
        event.remindBefore = newRemindMe.value;
    } else if (checkEndDate.checked === true && checkRemindMe.checked === false) {
        let eFinishDateAndTime = newEndDate.value.split("T");
        let eFinishDate = eFinishDateAndTime[0].split("-");
        let eFinishTime = eFinishDateAndTime[1].split(":");

        event.finishYear = eFinishDate[0];
        event.finishMonth = eFinishDate[1];
        event.finishDay = eFinishDate[2];
        event.finishHour = eFinishTime[0];
        event.finishMinute = eFinishTime[1];
        event.remind = false;
        event.remindBefore = '0';
    } else if(checkEndDate.checked === false && checkRemindMe.checked === false) {
        event.finishYear = eInitialDate[0];
        event.finishMonth = eInitialDate[1];
        event.finishDay = eInitialDate[2];
        event.finishHour = '23';
        event.finishMinute = '59';
        event.remind = false;
        event.remindBefore = '0';
    }

    let date1 = `${event.initialYear}-${event.initialMonth}-${event.initialDay}T${event.initialHour}:${event.initialMinute}`;
    let date2 = `${event.finishYear}-${event.finishMonth}-${event.finishDay}T${event.finishHour}:${event.finishMinute}`;
    let date3 = new Date(date1).getTime();
    let date4 = new Date(date2).getTime();
    let diff = date4 - date3;
    let days = (diff/(1000*60*60*24)).toFixed(0);
    let hours = ((diff%(1000*60*60*24))/(1000*60*60)).toFixed(0);
    let minutes = (((diff%(1000*60*60*24))%(1000*60*60))/(1000*60)).toFixed(0);
    event.duration = `${days} days, ${hours} hours and ${minutes} minutes.`;

    events.push(event);
    let eventsString = JSON.stringify(events);
    localStorage.setItem('events', eventsString);
    refreshEventWithLocalStorage();
    hiddenModal();
    printMonth(monthNumber);
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
    var dateTime = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
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
    let initialDate = new Date(newInitialDate.value).getTime();
    let endDate = new Date(newEndDate.value).getTime();
    var dateTime = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if (newEndDate.value.match(dateTime) && (endDate - initialDate)> 0) {
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

/* Function to take events from localStorage */

function refreshEventWithLocalStorage() {
    if(localStorage.getItem('events') === null) {
        let eventsString = JSON.stringify(events);
        localStorage.setItem('events', eventsString);
    } else {
        events = JSON.parse(localStorage.getItem("events"));
    }
}

/* Function to show the modal with the event info */

function showEventInfo(e) {
    prevMonth.removeEventListener("click", printPrevMonth);
    nextMonth.removeEventListener("click", printNextMonth);
    addEvent.removeEventListener("click", showEventModal);
    buttonsDays.forEach(e => {
        e.removeEventListener("click", showEventModal);
    });

    position = 0;
    contador = -1;
    events.forEach(j => {
        contador++
        if(j.title === e.target.id){
            position = contador;
        }
    })

    let fullInitialDate = `${events[position].initialYear}/${events[position].initialMonth}/${events[position].initialDay}`;
    let fullEndDate = `${events[position].finishYear}/${events[position].finishMonth}/${events[position].finishDay}`;
    let initialDate = new Date(fullInitialDate);
    let initialDateInFormat = new Intl.DateTimeFormat().format(initialDate);
    let endDate = new Date(fullEndDate);
    let endDateInFormat = new Intl.DateTimeFormat().format(endDate);
    let remind = "";

    if(events[position].remind === true){
        remind = "YES";
    } else {
        remind = "NO";
    }

    modalContent.innerHTML = "";
    modalContent.innerHTML = `
    <section>
        <h2 class="info--title">${events[position].title}</h2>
        <p class="info--labels">Initial date:</p>
        <p class="info--info">${initialDateInFormat}</p>
        <p class="info--labels">Initial time:</p>
        <p class="info--info">${events[position].initialHour}:${events[position].initialMinute}</p>
        <p class="info--labels">End date:</p>
        <p class="info--info">${endDateInFormat}</p>
        <p class="info--labels">End time:</p>
        <p class="info--info">${events[position].finishHour}:${events[position].finishMinute}</p>
        <p class="info--labels">Remind?:</p>
        <p class="info--info">${remind}</p>
        <p class="info--labels">Remind me before:</p>
        <p class="info--info">${events[position].remindBefore}</p>
        <p class="info--labels">Description:</p>
        <p class="info--info">${events[position].description}</p>
        <p class="info--labels">Event type:</p>
        <p class="info--info">${events[position].eventType}</p>
        <p class="info--labels">Duration:</p>
        <p class="info--info">${events[position].duration}</p>
        <button class="button button--delete" id="delete--event">Delete</button>
    </section>`;

    modalSection.classList.toggle("hidden");

    deleteModal = document.getElementById("delete--event");

    deleteModal.addEventListener("click", deleteEvent);
    closeModal.addEventListener("click", hiddenModalInfo);
    modalSection.addEventListener("click", hiddenModalInfoClickingOut);
    window.addEventListener("keyup", hiddenModalInfoEscape);
}

function hiddenModalInfo() {
    modalSection.classList.toggle("hidden");
    closeModal.removeEventListener("click", hiddenModal);
    modalSection.removeEventListener("click", hiddenModalClickingOut);
    window.removeEventListener("keyup", hiddenModalEscape);
    deleteModal.removeEventListener("click", deleteEvent);
    prevMonth.addEventListener("click", printPrevMonth);
    nextMonth.addEventListener("click", printNextMonth);
    addEvent.addEventListener("click", showEventModal);
    buttonsDays.forEach(e => {
        e.addEventListener("click", showEventModal);
    });
}
function hiddenModalInfoClickingOut(e) {
    if(e.target.id === "modal--section") {
        modalSection.classList.toggle("hidden");
        closeModal.removeEventListener("click", hiddenModal);
        modalSection.removeEventListener("click", hiddenModalClickingOut);
        window.removeEventListener("keyup", hiddenModalEscape);
        deleteModal.removeEventListener("click", deleteEvent);
        prevMonth.addEventListener("click", printPrevMonth);
        nextMonth.addEventListener("click", printNextMonth);
        addEvent.addEventListener("click", showEventModal);
        buttonsDays.forEach(e => {
            e.addEventListener("click", showEventModal);
        });
    }
}
function hiddenModalInfoEscape(e) {
    if(e.keyCode == 27) {
        modalSection.classList.toggle("hidden");
        closeModal.removeEventListener("click", hiddenModal);
        modalSection.removeEventListener("click", hiddenModalClickingOut);
        window.removeEventListener("keyup", hiddenModalEscape);
        deleteModal.removeEventListener("click", deleteEvent);
        prevMonth.addEventListener("click", printPrevMonth);
        nextMonth.addEventListener("click", printNextMonth);
        addEvent.addEventListener("click", showEventModal);
        buttonsDays.forEach(e => {
            e.addEventListener("click", showEventModal);
        });
    }
}

/* Function to delete events */

function deleteEvent() {
    events.splice(position, 1);
    let eventsString = JSON.stringify(events);
    localStorage.setItem("events", eventsString);
    refreshEventWithLocalStorage();
    hiddenModalInfo();
    printMonth(monthNumber);
}

/* Function to check past event */

function checkPastEvent() {
    warning.innerHTML = "";
    events.forEach(e => {
        let finishDateFormat = `${e.finishYear}-${e.finishMonth}-${e.finishDay}T${e.finishHour}:${e.finishMinute}`
        let finishDate = new Date(finishDateFormat).getTime();
        let actualTime = new Date().getTime();
        if(actualTime > finishDate) {
            e.past = true;
            let eventsString = JSON.stringify(events);
            localStorage.setItem('events', eventsString);
        } else {
            e.past = false;
            let eventsString = JSON.stringify(events);
            localStorage.setItem('events', eventsString);
        }
        if(e.past === true) {
            warning.innerHTML += `<section class="event--past" id="${e.title}">${e.title}</section>`;
            warningHidden.classList.remove("hidden");
        }
    })
}

/* Function to remind an event */

function remindEvent() {
    events.forEach(e => {
        if(e.remind === true) {
            let initialDateFormat = `${e.initialYear}-${e.initialMonth}-${e.initialDay}T${e.initialHour}:${e.initialMinute}`;
            let initialDate = new Date(initialDateFormat).getTime();
            let remindTime = (parseInt(e.remindBefore, 10))*60*1000;
            let actualTime = new Date().getTime();
            if(actualTime >= (initialDate - remindTime) && actualTime <= initialDate){
                alert(`You have ${e.remindBefore} minutes before ${e.title} start!`);
                e.remind = false;
                let eventsString = JSON.stringify(events);
                localStorage.setItem('events', eventsString);
            }
        }
    })
}
