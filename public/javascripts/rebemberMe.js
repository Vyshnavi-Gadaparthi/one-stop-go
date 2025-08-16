document.addEventListener("DOMContentLoaded", function () {
  const accountIdlInput = document.getElementById("accountId");
  const passwordInput = document.getElementById("password");
  const rememberMeCheckbox = document.getElementById("rememberMe");

  // On load, check if credentials are saved
  if (localStorage.getItem("rememberMe") === "true") {
    accountIdlInput.value = localStorage.getItem("email");
    passwordInput.value = localStorage.getItem("password"); // ⚠️ Not safe for real apps
    rememberMeCheckbox.checked = true;
  }

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const accountId = accountIdlInput.value;
    const password = passwordInput.value;

    if (rememberMeCheckbox.checked) {
      // Save to localStorage
      localStorage.setItem("accountId", accountId);
      localStorage.setItem("password", password); // ⚠️ Never store raw password in real apps
      localStorage.setItem("rememberMe", "true");
    } else {
      // Clear stored credentials
      localStorage.removeItem("accountId");
      localStorage.removeItem("password");
      localStorage.setItem("rememberMe", "false");
    }

    // Simulate login
    alert("Login Submitted");
  });
});
