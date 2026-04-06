// 🔐 Fake Login
const DEFAULT_USER = "admin";
const DEFAULT_PASS = "1234";

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === DEFAULT_USER && pass === DEFAULT_PASS) {
    localStorage.setItem("loggedIn", "true");
    showApp();
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

function showApp() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

// Auto login
window.onload = function () {
  if (localStorage.getItem("loggedIn") === "true") {
    showApp();
  }
};

// 🎨 QR Code
let qr;

function generateQR() {
  let data = document.getElementById("qrText").value;
  let color = document.getElementById("qrColor").value;
  let logoFile = document.getElementById("logoInput").files[0];

  if (!data) {
    alert("Enter text or URL");
    return;
  }

  // Clear previous QR
  document.getElementById("qrBox").innerHTML = "";

  qr = new QRCodeStyling({
    width: 220,
    height: 220,
    data: data,
    dotsOptions: {
      color: color,
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    image: logoFile ? URL.createObjectURL(logoFile) : "",
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5
    }
  });

  qr.append(document.getElementById("qrBox"));
}

// 📥 Download
function downloadQR() {
  if (!qr) {
    alert("Generate QR first!");
    return;
  }

  qr.download({
    name: "qr-code",
    extension: "png"
  });
}