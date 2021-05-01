export function getLoginToken() {
  let token = localStorage.getItem("token");
  return token;
}
