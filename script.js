"use strict";

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function convertDateToStr(date) {
  const dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  const dateStr = convertDateToStr(date);

  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  const listOfPalindromes = getAllDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function moveToNextMonth() {
    day = 1;
    month++;
  }

  if (isLeapYear(year) && month === 2 && day > 29) {
    moveToNextMonth();
  } else if (day > daysInMonth[month - 1]) {
    moveToNextMonth();
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function moveToPreviousMonth() {
    if (month === 1) {
      day = daysInMonth[11];
      month = 12;
      year--;
    } else {
      day = daysInMonth[month - 2];
      month--;
    }
  }

  if (isLeapYear(year) && month === 3 && day === 0) {
    day = 29;
    month--;
  } else if (day === 0) {
    moveToPreviousMonth();
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctr++;
    const isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPreviousPalindromeDate(date) {
  let ctr = 0;
  let previousDate = getPreviousDate(date);

  while (1) {
    ctr++;
    const isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}

const date = {
  day: 1,
  month: 12,
  year: 2020,
};

const dateOfBirth = document.querySelector(".date-of-birth");
const btnCheck = document.querySelector(".btn-check");
const outputMessage = document.querySelector(".message-to-user");

function clickHandler() {
  const bdayStr = dateOfBirth.value;

  if (bdayStr !== "") {
    const listOfDate = bdayStr.split("-");
    const date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    const isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      artificialDelay();
      setTimeout(function () {
        outputMessage.innerText = "";
        outputMessage.innerText =
          "Wow! Awesome. Your birthday is a palindrome!!🥳";
      }, 4500);
    } else {
      const [ctrNextDate, nextDate] = getNextPalindromeDate(date);
      const [ctrPreviousDate, previousDate] = getPreviousPalindromeDate(date);
      const nearestPalindromeDate =
        ctrNextDate < ctrPreviousDate ? nextDate : previousDate;
      const ctr = ctrNextDate < ctrPreviousDate ? ctrNextDate : ctrPreviousDate;
      artificialDelay();
      setTimeout(function () {
        outputMessage.innerText = "";
        outputMessage.innerText = `The nearest palindrome date is ${
          nearestPalindromeDate.day
        }-${nearestPalindromeDate.month}-${
          nearestPalindromeDate.year
        }. You missed it by ${ctr} ${ctr === 1 ? "day" : "days"}! 🙁 `;
      }, 4500);
    }
  }
}

btnCheck.addEventListener("click", clickHandler);

function artificialDelay() {
  const loading = "Loading.....".split("");
  outputMessage.innerText = "";
  for (let i = 0; i < loading.length; i++) {
    setTimeout(function () {
      outputMessage.innerText += loading[i];
    }, i * 300);
  }
}
