import moment from "moment-timezone";

const Timeout = (route, time) => {
  setTimeout(() => {
    window.location.href = route;
  }, time);
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

function momentdate(date) {
  const timezone = "Asia/Kolkata";

  const formattedDate = moment(date).tz(timezone).format("D MMMM YYYY h:mm A");
  // .format("D MMMM YYYY h:mm A z");

  return formattedDate;
}

function momentsmall(date) {
  const timezone = "Asia/Kolkata";
  const formattedDate = moment(date).tz(timezone).format("D MMM - YY");
  return formattedDate;
}

function onlytime(date) {
  const timezone = "Asia/Kolkata";

  const formattedtime = moment(date).tz(timezone).format("h:mm A");
  // .format("D MMMM YYYY h:mm A z");

  return formattedtime;
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

export {
  Timeout,
  validateSymbol,
  momentdate,
  onlytime,
  indianStates,
  momentsmall,
  getMonthNames,
  monthNames,
  getWeekDay,
};
