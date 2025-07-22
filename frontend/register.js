document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value || "user";
  const phone = document.getElementById("number").value;
  const address = document.getElementById("address").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, role, phone, address }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registration successful! You can now login.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong during registration.");
  }
});
