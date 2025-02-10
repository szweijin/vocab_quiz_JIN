const PASSWORD = "900914szwei";

function checkPassword() {
    const input = document.getElementById("password").value;
    if (input === PASSWORD) {
        const now = new Date().getTime();
        const expireTime = now + 60 * 60 * 1000; // 1 小時後過期

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("expireTime", expireTime);

        window.location.href = "main.html"; // 直接跳轉到主頁
    } else {
        document.getElementById("error-msg").innerText = "密碼錯誤！";
    }
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const expireTime = localStorage.getItem("expireTime");
    const now = new Date().getTime();

    if (isLoggedIn !== "true" || !expireTime || now > expireTime) {
        logout();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus(); // 確保登入狀態
});

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expireTime");
    window.location.href = "index.html"; // 直接回到登入頁
}