const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const errorMessage1 = document.querySelector("#error-message-1");
const errorMessage2 = document.querySelector("#error-message-2");
const errorMessage3 = document.querySelector("#error-message-3");

const yearsDisplay = document.querySelector("#years-display");
const monthsDisplay = document.querySelector("#months-display");
const daysDisplay = document.querySelector("#days-display");

const submitButton = document.querySelector("#submit-button");

const dayInMonths = [
  {
    month: "January",
    days: 31,
  },
  {
    month: "February",
    days: 28,
  },
  {
    month: "March",
    days: 31,
  },
  {
    month: "April",
    days: 30,
  },
  {
    month: "May",
    days: 31,
  },
  {
    month: "June",
    days: 30,
  },
  {
    month: "July",
    days: 31,
  },
  {
    month: "August",
    days: 31,
  },
  {
    month: "September",
    days: 30,
  },
  {
    month: "October",
    days: 31,
  },
  {
    month: "November",
    days: 30,
  },
  {
    month: "December",
    days: 31,
  },
];

// Check if year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const validateDate = (day, month, year) => {
  if (!day || !month || !year) return false;

  const monthIndex = month - 1;
  if (monthIndex < 0 || monthIndex > 11) return false;

  let maxDays = dayInMonths[monthIndex].days;
  if (monthIndex === 1 && isLeapYear(year)) maxDays = 29; // Adjust for leap years

  return day > 0 && day <= maxDays;
};

submitButton.addEventListener("click", () => {
  if (dayInput.value === "") {
    dayInput.classList.add("border-light-red");
    errorMessage1.classList.remove("hidden");
    errorMessage1.innerHTML = 'This is<br class="xl:hidden" /> required.';
  } else {
    dayInput.classList.remove("border-light-red");
    errorMessage1.classList.add("hidden");
    errorMessage1.innerHTML = "";
  }

  if (monthInput.value === "") {
    monthInput.classList.add("border-light-red");
    errorMessage2.classList.remove("hidden");
    errorMessage2.innerHTML = 'This is<br class="xl:hidden" /> required.';
  } else {
    monthInput.classList.remove("border-light-red");
    errorMessage2.classList.add("hidden");
    errorMessage2.innerHTML = "";
  }

  if (yearInput.value === "") {
    yearInput.classList.add("border-light-red");
    errorMessage3.classList.remove("hidden");
    errorMessage3.innerHTML = 'This is<br class="xl:hidden" /> required.';
  } else {
    yearInput.classList.remove("border-light-red");
    errorMessage3.classList.add("hidden");
    errorMessage3.innerHTML = "";
  }

  if (
    dayInput.value !== "" &&
    monthInput.value !== "" &&
    yearInput.value !== ""
  ) {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (!validateDate(day, month, year) || birthDate > today) {
      errorMessage1.classList.remove("hidden");

      console.log(year > today.getFullYear());
      errorMessage1.innerHTML =
        year > today.getFullYear()
          ? 'Must be in<br class="xl:hidden" /> the past.'
          : 'Must be a<br class="xl:hidden" /> valid date.';

      dayInput.classList.add("border-light-red");
      monthInput.classList.add("border-light-red");
      yearInput.classList.add("border-light-red");
      return;
    }

    errorMessage1.classList.add("hidden");
    dayInput.classList.remove("border-light-red");
    monthInput.classList.remove("border-light-red");
    yearInput.classList.remove("border-light-red");

    let ageYears =
      year > today.getFullYear()
        ? 0
        : today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    yearsDisplay.textContent = ageYears;
    monthsDisplay.textContent = ageMonths;
    daysDisplay.textContent = ageDays;
  }
});
