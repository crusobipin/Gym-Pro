document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const loginLinks = document.querySelector(".joinus");
  const logoutButton = document.querySelector(".logout");

  if (token) {
    // Hide Login/Register and show Logout
    loginLinks.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    // Show Login/Register and hide Logout
    loginLinks.style.display = "flex";
    logoutButton.style.display = "none";
  }

  // Logout functionality
  logoutButton.querySelector("button").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.href = "index.html"; // Redirect to homepage
  });
});
