/**
 * Constants
 */
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_SELECTED_TEXT = "";
const DAY_TIME = 86400000;

/**
 * Variables
 */
var currentMonth = new Date().getMonth() -1;
var currentMonth2 = new Date().getMonth();
var currentYear = new Date().getFullYear();
var currentYear2 = new Date().getFullYear();
var currentIndicator = null;
var currentIndicator2 = null;
var selectedInitialDate = null;
var selectedEndDate = null;
var firstCalendar = false;

/**
 * Component Elements
 */
var datepickerBody = document.getElementById("datepicker-body");
var datepickerBody2 = document.getElementById("datepicker-body2");
var datepickerButton = document.getElementById("datepicker-button");
var datepickerClearButton = document.getElementById("datepicker-clear-button");
var datepickerContainer = document.getElementById("datepicker-container");

var datepickerNextButton = document.getElementById("datepicker-next-button");
var datepickerPreviousButton = document.getElementById(
  "datepicker-previous-button"
);
var datepickerIndicator = document.getElementById("datepicker-indicator");
var datepickerWeekTitle = document.getElementById("datepicker-week-title");
var datepickerNextButton2 = document.getElementById("datepicker-next-button2");
var datepickerPreviousButton2 = document.getElementById(
  "datepicker-previous-button2"
);
var datepickerIndicator2 = document.getElementById("datepicker-indicator2");
var datepickerWeekTitle2 = document.getElementById("datepicker-week-title2");

var tab1 = document.getElementById("tab1-tab");
var tab2 = document.getElementById("tab2-tab");
var tab3 = document.getElementById("tab3-tab");
var tab4 = document.getElementById("tab4-tab");

/**
 * Event Listeners
 */
datepickerButton.addEventListener("click", evt => toggleDatepicker());
datepickerNextButton.addEventListener("click", evt => changeIndicator(1));
datepickerNextButton2.addEventListener("click", evt => changeIndicator2(1));

datepickerPreviousButton.addEventListener("click", evt => changeIndicator(-1));
datepickerPreviousButton2.addEventListener("click", evt => changeIndicator2(-1));

datepickerIndicator.addEventListener("click", evt => fillBody());
datepickerIndicator2.addEventListener("click", evt => fillBody2());

datepickerClearButton.addEventListener("click", evt => clearSelection());

tab1.addEventListener("click", evt => tabClick1(tab1));
tab2.addEventListener("click", evt => tabClick2(tab2));
tab3.addEventListener("click", evt => tabClick3(tab3));
tab4.addEventListener("click", evt => tabClick4(tab4));

/**
 * Initial Conditions
 */
WEEKDAY_NAMES.forEach(day => {
  const dayTitle = document.createElement("li");
  const dayTitle2 = document.createElement("li");
  dayTitle.innerText = day;
  dayTitle2.innerText = day;
  datepickerWeekTitle.appendChild(dayTitle);
  datepickerWeekTitle2.appendChild(dayTitle2);
});


function tabClick1(value) {
  datepickerButton.innerHTML = `${moment().subtract(6, 'days').format("DD/MM/YYYY")} to ${moment().format("DD/MM/YYYY")} <img class="down-arrow" src="/images/down-arrow.svg" />`;
  toggleDatepicker();
    value.classList.add("active")
    tab2.classList.remove("active")
    tab3.classList.remove("active")
    tab4.classList.remove("active")
}

function tabClick2(value) {
  datepickerButton.innerHTML = `${moment().subtract(29, 'days').format("DD/MM/YYYY")} to ${moment().format("DD/MM/YYYY")} <img class="down-arrow" src="/images/down-arrow.svg" />`;
  toggleDatepicker();
  value.classList.add("active")
    tab1.classList.remove("active")
    tab3.classList.remove("active")
    tab4.classList.remove("active")
}

function tabClick3(value) {
  datepickerButton.innerHTML = `${moment().startOf('month').format("DD/MM/YYYY")} to ${moment().format("DD/MM/YYYY")} <img class="down-arrow" src="/images/down-arrow.svg" />`;
  toggleDatepicker();
  value.classList.add("active")
  tab2.classList.remove("active")
  tab1.classList.remove("active")
  tab4.classList.remove("active")
}

function tabClick4(value) {
  datepickerButton.innerHTML = `${moment().startOf('year').format("DD/MM/YYYY")} to ${moment().format("DD/MM/YYYY")} <img class="down-arrow" src="/images/down-arrow.svg" />`;
  toggleDatepicker();
  value.classList.add("active")
  tab2.classList.remove("active")
  tab3.classList.remove("active")
  tab1.classList.remove("active")
}

/**
 * Enable/disable the datepicker
 */
function toggleDatepicker() {
  if (datepickerContainer.style.display === "flex") {
    datepickerContainer.style.display = "none";
  } else {
    fillMonth();
    fillMonth2();
    datepickerContainer.style.display = "flex";
  }
}

/**
 * Changes the current indicator (month, year or decade).
 */
function changeIndicator(d) {
  switch (currentIndicator) {
    case "year":
      currentYear += d;
      fillYear();
      break;
    case "month":
      currentMonth += d;
      fillMonth();
      break;
    case "decade":
      currentYear += d * 10;
      fillDecade();
  }
}

function changeIndicator2(d) {
  switch (currentIndicator2) {
    case "year":
      currentYear2 += d;
      fillYear2();
      break;
    case "month":
      currentMonth2 += d;
      fillMonth2();
      break;
    case "decade":
      currentYear2 += d * 10;
      fillDecade2();
  }
}

/**
 * Calls the function to fill the datepicker body depending on indicator.
 */

function fillBody(indicator = currentIndicator) {
  currentIndicator = indicator;
  switch (indicator) {
    case "month":
      fillYear();
      break;
    case "year":
      fillDecade();
      break;
    case "decade":
      fillYear(new Date().getFullYear());
      break;
    default:
      fillMonth(new Date());
  }
}

function fillBody2(indicator = currentIndicator2) {
  currentIndicator2 = indicator;
  switch (indicator) {
    case "month":
      fillYear2();
      break;
    case "year":
      fillDecade2();
      break;
    case "decade":
      fillYear2(new Date().getFullYear());
      break;
    default:
      fillMonth2(new Date());
  }
}

/**
 * Select a day, it can be inital or ender.
 */
function selectDay(day) {
  if (!selectedInitialDate && !selectedEndDate) {
    selectedInitialDate = day;
    selectedEndDate = day;
    datepickerClearButton.style.display = "block";
  } else if (
    day.getTime() === selectedInitialDate.getTime() &&
    day.getTime() === selectedEndDate.getTime()
  ) {
    return clearSelection(true);
  } else if (day.getTime() === selectedInitialDate.getTime()) {
    selectedInitialDate = selectedEndDate;
  } else if (day.getTime() === selectedEndDate.getTime()) {
    selectedEndDate = selectedInitialDate;
  } else if (day > selectedInitialDate && day < selectedEndDate) {
    if (
      Math.abs(day - selectedInitialDate) >= Math.abs(day - selectedEndDate)
    ) {
      selectedEndDate = day;
    } else {
      selectedInitialDate = day;
    }
  } else if (day > selectedEndDate) {
    selectedEndDate = day;
  } else if (day < selectedInitialDate) {
    selectedInitialDate = day;
  }

  if (day.getMonth() !== currentMonth && !firstCalendar) {
    currentMonth2 = day.getMonth();
    currentYear2 = day.getFullYear();
    firstCalendar = true;
  } else  {
    currentMonth = day.getMonth();
    currentYear = day.getFullYear();
    firstCalendar = false
  }

  datepickerButton.innerHTML = `${selectedInitialDate.toLocaleDateString(
    "pt-BR"
  )} to ${selectedEndDate.toLocaleDateString(
    "pt-BR"
  )} <img class="down-arrow" src="/images/down-arrow.svg" /> `;
  fillMonth();
  fillMonth2();

  if (selectedInitialDate !== selectedEndDate) {
    toggleDatepicker();
  }
}

function clearSelection() {
  datepickerClearButton.style.display = "none";
  selectedInitialDate = null;
  selectedEndDate = null;
  fillMonth();
  fillMonth2();
}

/**
 * Fills the datepicker body with the weeks of a given day.
 */

function fillMonth(date = new Date(currentYear, currentMonth)) {
  currentYear = date.getFullYear();
  currentMonth = date.getMonth();
  currentIndicator = "month";

  datepickerBody.innerHTML = "";
  const monthDays = generateMonthDays(date);
  monthDays.forEach(week =>
    datepickerBody.appendChild(generateWeekElement(week))
  );

  datepickerIndicator.innerText =
    MONTH_NAMES[date.getMonth()] + " " + date.getFullYear();
  datepickerWeekTitle.style.display = "flex";
}

function fillMonth2(date = new Date(currentYear2, currentMonth2)) {
  currentYear2 = date.getFullYear();
  currentMonth2 = date.getMonth();
  currentIndicator2 = "month";

  datepickerBody2.innerHTML = "";
  const monthDays = generateMonthDays(date);
  monthDays.forEach(week =>
    datepickerBody2.appendChild(generateWeekElement(week))
  );

  datepickerIndicator2.innerText =
    MONTH_NAMES[date.getMonth()] + " " + date.getFullYear();
  datepickerWeekTitle2.style.display = "flex";
}

/**
 * Fills the datepicker body with the months of given year.
 */

function fillYear(fullYear = currentYear) {
  currentYear = fullYear;
  currentIndicator = "year";

  datepickerBody.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const element = document.createElement("ul");
    element.className = "datepicker-week-container";
    for (let j = 0; j < 3; j++) {
      element.appendChild(generateMonthElement(new Date(fullYear, i * 3 + j)));
    }
    datepickerBody.appendChild(element);
  }

  datepickerIndicator.innerText = fullYear;
  datepickerWeekTitle.style.display = "none";
}

function fillYear2(fullYear = currentYear2) {
  currentYear2 = fullYear;
  currentIndicator2 = "year";

  datepickerBody2.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const element = document.createElement("ul");
    element.className = "datepicker-week-container";
    for (let j = 0; j < 3; j++) {
      element.appendChild(generateMonthElement2(new Date(fullYear, i * 3 + j)));
    }
    datepickerBody2.appendChild(element);
  }

  datepickerIndicator2.innerText = fullYear;
  datepickerWeekTitle2.style.display = "none";
}

/**
 * Fills the datepicker body with the decade of a given year.
 */

function fillDecade(from = currentYear) {
  currentIndicator = "decade";

  from = Math.floor(from / 10) * 10;

  datepickerBody.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const element = document.createElement("ul");
    element.className = "datepicker-week-container";
    for (let j = 0; j < 2; j++) {
      element.appendChild(generateYearElement(from + i * 2 + j));
    }
    datepickerBody.appendChild(element);
  }

  datepickerIndicator.innerText = `${from} - ${from + 9}`;
  datepickerWeekTitle.style.display = "none";
}

function fillDecade2(from = currentYear2) {
  currentIndicator2 = "decade";

  from = Math.floor(from / 10) * 10;

  datepickerBody2.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const element = document.createElement("ul");
    element.className = "datepicker-week-container";
    for (let j = 0; j < 2; j++) {
      element.appendChild(generateYearElement2(from + i * 2 + j));
    }
    datepickerBody2.appendChild(element);
  }

  datepickerIndicator2.innerText = `${from} - ${from + 9}`;
  datepickerWeekTitle2.style.display = "none";
}

/**
 * Returns a matrix with all dates of the month of given date.
 * It completes a matrix of 6 weeks with adjacent months days.
 */

function generateMonthDays(date = new Date()) {
  let monthDays = [];
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let day = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    1 - firstDay.getDay()
  );
  for (let weekcount = 0; weekcount < 6; weekcount++) {
    monthDays[weekcount] = [];
    for (let weekday = 0; weekday < 7; weekday++) {
      monthDays[weekcount][weekday] = new Date(day);
      day = new Date(day.setDate(day.getDate() + 1));
    }
    weekday = 0;
  }
  return monthDays;
}

/**
 * Returns a list item element to represent a day.
 */

function generateDayElement(day) {
  let element = document.createElement("li");
  element.innerText = day.getDate();
  element.className = "datepicker-list-item-container"; // Base day element class
  if (Date.now() - day >= 0 && Date.now() - day <= DAY_TIME) {
    element.className += " datepicker-list-item-today"; // Today class
  }
  if (day.getMonth() !== currentMonth && day.getMonth() !== currentMonth2) {
    element.className += " datepicker-list-item-outday"; // Out month days class
  }
  if (Date.now() - DAY_TIME - day < 0) {
    element.className += " datepicker-list-item-unavaliable"; // Unavaliable or past days class
  } else {
    element.addEventListener("mousedown", evt => selectDay(day));
    if (selectedInitialDate && selectedEndDate) {
      if (
        day.getTime() === selectedInitialDate.getTime() ||
        day.getTime() === selectedEndDate.getTime()
      ) {
        element.className += " datepicker-list-item-selected"; // Selected days class
      } else if (day > selectedInitialDate && day < selectedEndDate) {
        element.className += " datepicker-list-item-between"; // Between selected days class
      }
    }
  }
  return element;
}

/**
 * Returns a list element to represent a week of a given array of days.
 */

function generateWeekElement(week) {
  let element = document.createElement("ul");
  element.className = "datepicker-week-container";
  week.forEach(day => element.appendChild(generateDayElement(day)));
  return element;
}

/**
 * Returns a list item element to represent a month.
 */

function generateMonthElement(date = new Date(currentYear)) {
  const element = document.createElement("li");
  element.innerText = MONTH_NAMES[date.getMonth()];
  element.className = "datepicker-list-item-container";
  if (
    new Date().getMonth() === date.getMonth() &&
    new Date().getFullYear() === date.getFullYear()
  ) {
    element.className += " datepicker-list-item-today";
  }
  if (
    new Date().getFullYear() < date.getFullYear() ||
    (new Date().getMonth() < date.getMonth() &&
      new Date().getFullYear() === date.getFullYear())
  ) {
    element.className += " datepicker-list-item-unavaliable";
  } else {
    element.addEventListener("click", evt =>
      fillMonth(new Date(currentYear, date.getMonth()))
    );
    if (selectedInitialDate && selectedEndDate) {
      if (
        (date.getFullYear() === selectedInitialDate.getFullYear() &&
          date.getMonth() === selectedInitialDate.getMonth()) ||
        (date.getFullYear() === selectedEndDate.getFullYear() &&
          date.getMonth() === selectedEndDate.getMonth())
      ) {
        element.className += " datepicker-list-item-selected";
      } else if (
        date.getFullYear() === selectedInitialDate.getFullYear() ||
        date.getFullYear() === selectedEndDate.getFullYear()
      ) {
        if (
          selectedInitialDate.getFullYear() === selectedEndDate.getFullYear()
        ) {
          if (
            date.getMonth() > selectedInitialDate.getMonth() &&
            date.getMonth() < selectedEndDate.getMonth()
          ) {
            element.className += " datepicker-list-item-between";
          }
        } else {
          if (
            (date.getFullYear() === selectedInitialDate.getFullYear() &&
              date.getMonth() > selectedInitialDate.getMonth()) ||
            (date.getFullYear() === selectedEndDate.getFullYear() &&
              date.getMonth() < selectedEndDate.getMonth())
          ) {
            element.className += " datepicker-list-item-between";
          }
        }
      } else if (
        date.getFullYear() > selectedInitialDate.getFullYear() &&
        date.getFullYear() < selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-between";
      }
    }
  }
  return element;
}

function generateMonthElement2(date = new Date(currentYear)) {
  const element = document.createElement("li");
  element.innerText = MONTH_NAMES[date.getMonth()];
  element.className = "datepicker-list-item-container";
  if (
    new Date().getMonth() === date.getMonth() &&
    new Date().getFullYear() === date.getFullYear()
  ) {
    element.className += " datepicker-list-item-today";
  }
  if (
    new Date().getFullYear() < date.getFullYear() ||
    (new Date().getMonth() < date.getMonth() &&
      new Date().getFullYear() === date.getFullYear())
  ) {
    element.className += " datepicker-list-item-unavaliable";
  } else {
    element.addEventListener("click", evt =>
      fillMonth2(new Date(currentYear, date.getMonth()))
    );
    if (selectedInitialDate && selectedEndDate) {
      if (
        (date.getFullYear() === selectedInitialDate.getFullYear() &&
          date.getMonth() === selectedInitialDate.getMonth()) ||
        (date.getFullYear() === selectedEndDate.getFullYear() &&
          date.getMonth() === selectedEndDate.getMonth())
      ) {
        element.className += " datepicker-list-item-selected";
      } else if (
        date.getFullYear() === selectedInitialDate.getFullYear() ||
        date.getFullYear() === selectedEndDate.getFullYear()
      ) {
        if (
          selectedInitialDate.getFullYear() === selectedEndDate.getFullYear()
        ) {
          if (
            date.getMonth() > selectedInitialDate.getMonth() &&
            date.getMonth() < selectedEndDate.getMonth()
          ) {
            element.className += " datepicker-list-item-between";
          }
        } else {
          if (
            (date.getFullYear() === selectedInitialDate.getFullYear() &&
              date.getMonth() > selectedInitialDate.getMonth()) ||
            (date.getFullYear() === selectedEndDate.getFullYear() &&
              date.getMonth() < selectedEndDate.getMonth())
          ) {
            element.className += " datepicker-list-item-between";
          }
        }
      } else if (
        date.getFullYear() > selectedInitialDate.getFullYear() &&
        date.getFullYear() < selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-between";
      }
    }
  }
  return element;
}

/**
 * Returns a list item element to represent a month.
 */

function generateYearElement(fullYear) {
  const element = document.createElement("li");
  element.innerText = fullYear;
  element.className = "datepicker-list-item-container";
  if (new Date().getFullYear() === fullYear) {
    element.className += " datepicker-list-item-today";
  }
  if (new Date().getFullYear() < fullYear) {
    element.className += " datepicker-list-item-unavaliable";
  } else {
    element.addEventListener("click", evt => fillYear(fullYear));
    if (selectedInitialDate && selectedEndDate) {
      if (
        fullYear === selectedInitialDate.getFullYear() ||
        fullYear === selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-selected"; // Selected days class
      } else if (
        fullYear > selectedInitialDate.getFullYear() &&
        fullYear < selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-between"; // Between selected days class
      }
    }
  }
  return element;
}

function generateYearElement2(fullYear) {
  const element = document.createElement("li");
  element.innerText = fullYear;
  element.className = "datepicker-list-item-container";
  if (new Date().getFullYear() === fullYear) {
    element.className += " datepicker-list-item-today";
  }
  if (new Date().getFullYear() < fullYear) {
    element.className += " datepicker-list-item-unavaliable";
  } else {
    element.addEventListener("click", evt => fillYear2(fullYear));
    if (selectedInitialDate && selectedEndDate) {
      if (
        fullYear === selectedInitialDate.getFullYear() ||
        fullYear === selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-selected"; // Selected days class
      } else if (
        fullYear > selectedInitialDate.getFullYear() &&
        fullYear < selectedEndDate.getFullYear()
      ) {
        element.className += " datepicker-list-item-between"; // Between selected days class
      }
    }
  }
  return element;
}