export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const setCookie = (name, value, expirationDays) => {
  let date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const doLogout = (e) => {
  deleteCookie("token");
  deleteLocalStorage("broker");
  deleteLocalStorage("user");
  window.location.href = "/account/login";
};

export const isAuth = () => {
  const token = getCookie("token");
  const userCookie = getLocalStorage("user");

  if (!userCookie || !token) {
    return false;
  }

  return true;
};

const userid = () => {
  const user = getLocalStorage("user");
  return user ? user.toString() : null;
};
const broker = () => {
  const broker = getLocalStorage("broker");
  return broker ? broker.toString() : "Upstox";
};

const thetoken = () => {
  const token = getCookie("token");
  if (!token) {
    return false;
  }
  return token;
};

export const getBroker = () => broker();
export const getUserId = () => userid();
export const getToken = () => thetoken();
