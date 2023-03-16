export const authService = {
  logout,
  isAuthenticated,
  setAccessToken,
  setUserDetails,
};

function isAuthenticated() {
  return localStorage.getItem("accesstoken");
}
function setUserDetails(details) {
  localStorage.setItem("userdata", details);
}
function setAccessToken(token) {
  localStorage.setItem("accesstoken", token);
}

function logout() {
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("userdata");
}
