document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("role", data.user.role);

      // Redirect to profile page
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
});
