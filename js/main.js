const calendarWrapper = document.querySelector('.calendar');
const date = new Date();
let month = new Date().getMonth();
let year = date.getFullYear();
const currantDay = date.toDateString();
let previousMonth = new Date(year, month, 0);
let lastDayOfMonth = new Date(year, month+1, 0);
const titleMonth = document.querySelector('.month');
const changeMonthBlock = document.querySelector('.change-day');
const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function createDay (day, modificator = 'active') {
    const newDay = document.createElement('div');
    newDay.classList.add('calendar__item');
    newDay.dataset.day = date.toDateString();
    if (modificator === 'passive') {
        newDay.classList.add('calendar__item_passive');
    }
    newDay.innerHTML = day.getDate();
    return newDay;
}
function renderCalendar () {
    date.setDate(1);
    if(date.getDay() > 0) {
        for(let i = 0; i < date.getDay(); i++) {
            const newDay = createDay(previousMonth, 'passive');
            calendarWrapper.prepend(newDay);
            previousMonth.setDate(previousMonth.getDate() -1);
        }
    }
    while (date.getMonth() == month) {
        const newDay = createDay(date);
        if (newDay.dataset.day === currantDay) {
            newDay.classList.add('currant');
        }
        calendarWrapper.append(newDay);
        date.setDate(date.getDate() + 1);
     }
     if(lastDayOfMonth.getDay() < 6) {
        for(let i = lastDayOfMonth.getDay() + 1; i <= 6; i++) {
            lastDayOfMonth.setDate(lastDayOfMonth.getDate() +1);
            const newDay = createDay(lastDayOfMonth, 'passive');
            calendarWrapper.append(newDay);
        }
    }
    console.log(date);
    date.setDate(new Date().getDate())
}
window.onload = function () { 
    titleMonth.innerHTML = monthsArr[month];
    renderCalendar();
}
changeMonthBlock.addEventListener('click', (e) => {
    if(e.target.closest('.icon-chevron-left7')) {
        calendarWrapper.innerHTML = '';
        if ( month !== 0) {
            month -= 1;
        } else {
            month = 11;
            year -= 1;
        }
        date.setMonth(month);
        date.setFullYear(year);
        previousMonth = new Date(year, month, 0);
        lastDayOfMonth = new Date(year, month+1, 0);
        titleMonth.innerHTML = monthsArr[month];
        //console.log(year);
        renderCalendar();
    }
    if(e.target.closest('.icon-chevron-right')) {
        calendarWrapper.innerHTML = '';
        if ( month !== 11) {
            month += 1;
        } else {
            month = 0;
            year += 1;
        }
        date.setMonth(month);
        date.setFullYear(year);
        previousMonth = new Date(year, month, 0);
        lastDayOfMonth = new Date(year, month+1, 0);
        titleMonth.innerHTML = monthsArr[month];
        //console.log(year);
        renderCalendar();
    }
});
