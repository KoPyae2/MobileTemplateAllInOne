export function email(email) {
  return /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/gi.test(email);
}
