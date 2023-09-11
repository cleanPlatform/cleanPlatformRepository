const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    selectedDate;

// storing full name of all months in array
const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const renderCalendar = async () => {
    let today = new Date();
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(), // getting last day of month
        lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    let availableDays;
    // const temp = axios.get(`/api/reservations?offerId=${document.getElementById("offer-id").value}&year=${currYear}&month=${currMonth + 1}`)
    //     .then((response) => {
    //         availableDays = response.data;
    //         console.log(availableDays);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // 아래 데이터는 서버에서 헤더에 담아주는 것이 좋을까?
    availableDays = await axios.get(`/api/reservations?offerId=${document.getElementById("offer-id").value}&year=${currYear}&month=${currMonth + 1}`);
    availableDays = availableDays.data.data;

    for (let i = firstDayOfMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive prev-month">${lastDateOfPrevMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let day;
        if ((i < date.getDate() && currMonth === today.getMonth() && currYear === today.getFullYear())
            || (currMonth < today.getMonth() && currYear <= today.getFullYear())
            || currYear < today.getFullYear()
            || availableDays[i - 1] === false) {
            day = "inactive";
        }
        else if (i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
            day = "active";
        }
        // let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        //     && currYear === new Date().getFullYear() ? "active" : "";
        if (availableDays[i - 1] === false) {
            liTag += `<li class="inactive">${i}</li>`;
        }
        else {
            liTag += `<li class="${day}">${i}</li>`;
        }

    }

    for (let i = lastDayOfMonth; i < 13; i++) { // creating li of next month first days
        liTag += `<li class="inactive next-month">${i - lastDayOfMonth + 1}</li>`
    }
    currentDate.innerText = `${currYear}년 ${months[currMonth]}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev-month-btn" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
console.log(prevNextIcon);

// 달력에서 날짜를 선택했을 때 이벤트를 발생
const dates = document.getElementById("days");
dates.addEventListener("click", (event) => {
    if (event.target.tagName === 'UL') {
        return;
    }

    // if (event.target.className === "inactive") {
    if (event.target.className.match("inactive")) {
        alert("현재 검은색으로 표시된 날만 선택 가능합니다.");
        return;
    }

    if (event.target.tagName === 'LI') {
        const selected = document.getElementById("selected");

        if (selected) {
            selected.removeAttribute("id");
        }

        event.target.setAttribute("id", "selected");
        selectedDate = `${currYear}-${currMonth + 1}-${event.target.innerText}`;
        console.log(selectedDate);
        // console.log(event.target.innerText);
    }
});
