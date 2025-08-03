let newWindow = null;
let refreshInterval = null;
let isRunning = false;

function openOrReopen(url) {
    // If tab is closed → open again
    if (!newWindow || newWindow.closed) {
        newWindow = window.open(url, "_blank");
    }
}

function startAutoRefresh() {
    if (isRunning) return;
    const url = "https://github.com/raushankumar620";
    
    openOrReopen(url);

    refreshInterval = setInterval(() => {
        try {
            // If tab is open → refresh it
            if (newWindow && !newWindow.closed) {
                newWindow.location.href = url;
            } else {
                // Tab closed → reopen it
                openOrReopen(url);
            }
        } catch (e) {
            // Cross-origin issue → just reopen the tab
            openOrReopen(url);
        }
    }, 1000); // refresh every 1 second

    isRunning = true;
    updateStatus();
}

function stopAutoRefresh() {
    clearInterval(refreshInterval);
    refreshInterval = null;
    if (newWindow && !newWindow.closed) {
        newWindow.close();
    }
    newWindow = null;
    isRunning = false;
    updateStatus();
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');

    if (isRunning) {
        statusElement.textContent = "✅ Auto refresh is running - will never stop";
        statusElement.style.color = "green";
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } else {
        statusElement.textContent = "❌ Auto refresh is stopped";
        statusElement.style.color = "red";
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

window.onload = updateStatus;
