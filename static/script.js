let warningCount = 0;
const maxWarnings = 5;

function startExam() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }

    document.getElementById("questions-container").style.display = "block";
    document.getElementById("start-button").style.display = "none";
}

function submitAnswer(questionNumber) {
    document.getElementById(`question-${questionNumber}`).style.display = "none";
    if (questionNumber < 5) {
        document.getElementById(`question-${questionNumber + 1}`).style.display = "block";
    } else {
        alert("Bạn đã hoàn thành bài thi!");
    }
}

document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        showWarning("Bạn không được sử dụng DevTool!");
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        warningCount++;
        showWarning("Bạn đã chuyển sang ứng dụng hoặc cửa sổ khác!");
        document.getElementById("warning-count").innerText = warningCount;

        if (warningCount >= maxWarnings) {
            lockExam();
        }
    }
});

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && warningCount < maxWarnings) {
        warningCount++;
        showWarning("Bạn không được thoát chế độ toàn màn hình!");
        document.getElementById("warning-count").innerText = warningCount;

        if (warningCount >= maxWarnings) {
            lockExam();
        }
    }
});

function showWarning(message) {
    const warningContainer = document.getElementById("warning-container");
    const warningMessage = document.getElementById("warning-message");

    warningMessage.textContent = message;
    warningContainer.style.display = "block";

    setTimeout(() => {
        warningContainer.style.display = "none";
    }, 5000); 
}

function lockExam() {
    document.getElementById("questions-container").innerHTML = "<p>Bạn đã vi phạm quá số lần cho phép. Bài thi đã bị khóa.</p>";
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}
