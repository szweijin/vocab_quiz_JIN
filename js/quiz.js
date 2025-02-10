let words = [];
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", async function () {
    checkLoginStatus();
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get("topic");

    if (!topic) {
        alert("未選擇主題！");
        window.location.href = "index.html";
        return;
    }

    const response = await fetch(`data/${topic}.json`);
    words = await response.json();

    const storedData = JSON.parse(localStorage.getItem("quizData")) || {};
    words.forEach((word) => {
        if (storedData[word.word]) {
            word.errorCount = storedData[word.word].errorCount;
        }
    });

    showQuestion();
});

function showQuestion() {
    if (currentWordIndex >= words.length) {
        endQuiz();
        return;
    }

    const wordObj = words[currentWordIndex];
    const shuffledOptions = [...wordObj.options].sort(() => Math.random() - 0.5);

    document.getElementById("word").innerText = `單字: ${wordObj.word}`;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    shuffledOptions.forEach((option) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.setAttribute("data-option", option); // 添加 data-option 屬性
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const wordObj = words[currentWordIndex];

    if (selected === wordObj.correctTranslation) {
        currentWordIndex++; // 答對才進入下一題
        showQuestion();
    } else {
        alert(`❌ 錯誤！`);

        wordObj.errorCount++;
        updateLocalStorage(wordObj);

        // 找到對應的按鈕並禁用
        const buttons = document.querySelectorAll("#options button");
        buttons.forEach((btn) => {
            if (btn.innerText === selected) {
                btn.disabled = true;
                btn.style.backgroundColor = "#f44336"; // 標示錯誤答案
            }
        });
    }
}

function updateLocalStorage(wordObj) {
    let storedData = JSON.parse(localStorage.getItem("quizData")) || {};
    storedData[wordObj.word] = { errorCount: wordObj.errorCount };
    localStorage.setItem("quizData", JSON.stringify(storedData));
}

function endQuiz() {
    window.location.href = "result.html";
}