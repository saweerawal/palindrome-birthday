var bdayInput = document.querySelector('#bday-input');
var showBtn = document.querySelector('#show-btn');
var resultDiv = document.querySelector('#result');

function reverseString(string) {
  var reversedString = string.split('').reverse().join('');
  return reversedString;
}

function isStringPalindrome(string) {
  var reversedString = reverseString(string);
  if(string === reversedString){
    return true;
  }
  return false;
}

function getDateAsString(date) {
  var dateStr = {
    day: '',
    month: '',
    year: ''
  };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getDateInAllFormats(date) {

  var ddmmyyyy = date.day + date.month + date.year;         
  var mmddyyyy = date.month + date.day + date.year;          
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    if(result){
      return true;
    }

  }
  return false;
}

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNextPalindromeDate(date) {

  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(nextDate);
    var result = checkPalindromeForAllDateFormats(dateStr);

      if (result) {
        return [ctr, nextDate];
      }
    
    nextDate = getNextDate(nextDate);
  }
}

function clickHandler(e) {
  var bdayString = bdayInput.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    var dateStr = getDateAsString(date);
    var result = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

      if (result) {
        isPalindrome = true;
      }
  
    if (!isPalindrome) {
      const [ctr, nextDate] = getNextPalindromeDate(date);
      
      resultDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr} days.`;

    } else {
      resultDiv.innerText = 'Yay, Your birthday is palindrome!';
    }
  }
}

showBtn.addEventListener('click', clickHandler);