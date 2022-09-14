import Cookies from "js-cookie";

const TokenKey = "nToken";

export function getToken() {
  return Cookies.get(TokenKey) || "";
}

export function setToken(token) {
  Cookies.set(TokenKey, token);
}
export function removeToken() {
  Cookies.remove(TokenKey);
}
export function getLang() {
  return Cookies.get("lang") || "";
}

export function setLang(lang) {
  Cookies.set("lang", lang);
}
export function getCode() {
  return Cookies.get("inviteCode") || "";
}

export function setCode(lang) {
  Cookies.set("inviteCode", lang);
}
