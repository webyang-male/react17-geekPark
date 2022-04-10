//封装存取token
const key = "pc-key";

const getToken = () => {
  return window.localStorage.getItem(key);
};

const setToken = (token) => {
  return window.localStorage.setItem(key, token);
};

const removeToken = () => {
  return window.localStorage.removeItem(key);
};

export { getToken, setToken, removeToken };