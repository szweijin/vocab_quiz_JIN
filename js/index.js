document.addEventListener("DOMContentLoaded", async function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("請先登入");
        window.location.href = "index.html";
        return;
    } 

    const container = document.getElementById("topics");

    try {
        // 從 GitHub Pages 上的 Vocab_quiz_JIN/data/topics.json 讀取主題
        const response = await fetch("./data/topics.json");
        if (!response.ok) {
            throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
        }
        const topics = await response.json();

        // 生成按鈕來選擇主題
        topics.forEach((topic) => {
            const btn = document.createElement("button");
            btn.innerText = topic;
            btn.onclick = () => (window.location.href = `quiz.html?topic=${topic}`);
            container.appendChild(btn);
        });

    } catch (error) {
        console.error("載入主題失敗:", error);
        container.innerHTML = "<p>無法載入主題，請確認檔案是否正確。</p>";
    }
});