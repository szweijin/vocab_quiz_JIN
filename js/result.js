document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus(); // 確保已登入

    const resultsContainer = document.getElementById("results");
    const storedData = JSON.parse(localStorage.getItem("quizData")) || {};

    if (Object.keys(storedData).length === 0) {
        resultsContainer.innerHTML = "<p>目前沒有測驗紀錄。</p>";
        return;
    }

    // 創建表格
    const table = document.createElement("table");
    table.border = "1"; // 添加邊框
    table.style.borderCollapse = "collapse"; // 讓邊框合併

    // 表頭
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>單字</th><th>錯誤次數</th>";
    table.appendChild(headerRow);

    // 生成表格內容
    Object.keys(storedData).forEach((word) => {
        const row = document.createElement("tr");

        const wordCell = document.createElement("td");
        wordCell.innerText = word;

        const errorCell = document.createElement("td");
        errorCell.innerText = storedData[word].errorCount;

        row.appendChild(wordCell);
        row.appendChild(errorCell);
        table.appendChild(row);
    });

    resultsContainer.appendChild(table);
});

// **清除錯誤記錄**
function resetData() {
    localStorage.removeItem("quizData");
    alert("錯誤記錄已清除！");
    window.location.reload();
}