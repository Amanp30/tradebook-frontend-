import moment from "moment";
import { format } from "date-fns-tz";

function getDatesForCurrentYear() {
  const year = new Date().getFullYear(); // get the current year
  const startDate = moment(`${year}-01-01`, "YYYY-MM-DD"); // create a moment object for the start date of the year
  const endDate = moment(`${year}-12-31`, "YYYY-MM-DD");

  const dates = []; // create an empty array to store the dates

  // loop through each day between the start and end dates and add them to the array
  while (startDate.isSameOrBefore(endDate)) {
    dates.push(startDate.format("YYYY-MM-DD")); // add the current date to the array
    startDate.add(1, "day"); // move to the next day
  }

  return dates;
}

const formatNumber = (num, fixednumber) => {
  if (num < 0) {
    return "-" + formatNumber(-num, fixednumber);
  } else if (num >= 10000000 * 100 * 100) {
    return (num / (10000000 * 100 * 100))?.toFixed(fixednumber) + " Kharab";
  } else if (num >= 10000000 * 100) {
    return (num / (10000000 * 100))?.toFixed(fixednumber) + " Arab";
  } else if (num >= 10000000) {
    return (num / 10000000)?.toFixed(fixednumber) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000)?.toFixed(fixednumber) + " Lac";
  } else if (num >= 1000) {
    return (num / 1000)?.toFixed(fixednumber) + " K";
  } else {
    return num?.toFixed(fixednumber);
  }
};

function validateSymbol(instrument, setinstrument) {
  var trimmedInstrument = instrument.trim();
  // var withoutSpaces = trimmedInstrument.replace(/\s+/g, "");

  // if (withoutSpaces !== trimmedInstrument) {
  //   setinstrument(withoutSpaces);
  // }

  var hasSpaces = /\s/.test(trimmedInstrument);
  var hasSpecialChars = /[^a-zA-Z0-9]/.test(trimmedInstrument);

  if (hasSpaces) {
    alert("Spaces not allowed in SYMBOL name");
    return true;
  }

  if (hasSpecialChars) {
    alert("Special characters not allowed in SYMBOL name");
    return true;
  }

  return false;
}

function formatWithUtcOffset(date, formatString, utcOffset) {
  return moment(date).utcOffset(utcOffset).format(formatString);
}

function momentcalendar(date) {
  return formatWithUtcOffset(date, "YYYY-MM-DD", "+05:30"); // +"+05:30" minutes for Asia/Kolkata
}

function momentdate(date) {
  return formatWithUtcOffset(date, "D MMM, YY h:mm A", "+05:30"); // +"+05:30" minutes for Asia/Kolkata
}

function momentsmall(date) {
  return formatWithUtcOffset(date, "D MMM - YY", "+05:30"); // +"+05:30" minutes for Asia/Kolkata
}

function onlytime(date) {
  return formatWithUtcOffset(date, "h:mm A", "+05:30"); // +"+05:30" minutes for Asia/Kolkata
}

function getMonthNames(labels) {
  const monthNames = [
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
    "December",
  ];
  const result = [];
  for (let i = 0; i < labels?.length; i++) {
    const monthIndex = labels?.[i] - 1;
    result?.push(monthNames[monthIndex]);
  }
  return result;
}

function getWeekDay(days) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const result = [];
  for (let i = 0; i < days?.length; i++) {
    const dayIndex = days?.[i] - 1;
    result?.push(daysOfWeek[dayIndex]);
  }
  return result;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
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
  "December",
];

const indianStates = [
  "",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function getHourMin(number) {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  const jk = hours ? `${hours} Hour, ${minutes} Min` : `${minutes} Min`;
  return jk;
}

export {
  getDatesForCurrentYear,
  formatNumber,
  validateSymbol,
  momentcalendar,
  momentdate,
  onlytime,
  indianStates,
  momentsmall,
  getMonthNames,
  monthNames,
  daysOfWeek,
  getWeekDay,
  getHourMin,
};
