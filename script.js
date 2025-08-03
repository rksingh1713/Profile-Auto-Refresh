let newWindow = null;
let refreshInterval = null;
let isRunning = false;
let selectedUrl = "https://github.com/raushankumar620"; // Default URL

function updateSelectedUrl() {
    const urlSelect = document.getElementById('urlSelect');
    selectedUrl = urlSelect.value;
    
    // If auto refresh is running, stop it and restart with new URL
    if (isRunning) {
        stopAutoRefresh();
        setTimeout(() => {
            startAutoRefresh();
        }, 500);
    }
}

function addNewUrl() {
    const newUrlInput = document.getElementById('newUrlInput');
    const newUrlName = document.getElementById('newUrlName');
    const urlSelect = document.getElementById('urlSelect');
    
    const url = newUrlInput.value.trim();
    const name = newUrlName.value.trim();
    
    if (url === '' || name === '') {
        alert('Please enter both URL and display name');
        return;
    }
    
    // Basic URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('URL must start with http:// or https://');
        return;
    }
    
    // Check if URL already exists
    for (let i = 0; i < urlSelect.options.length; i++) {
        if (urlSelect.options[i].value === url) {
            alert('This URL already exists in the list!');
            return;
        }
    }
    
    // Add new option to dropdown
    const option = document.createElement('option');
    option.value = url;
    option.textContent = name;
    urlSelect.appendChild(option);
    
    // Select the newly added option
    urlSelect.value = url;
    selectedUrl = url;
    
    // Clear input fields
    newUrlInput.value = '';
    newUrlName.value = '';
    
    alert('URL added successfully!');
}

function deleteSelectedUrl() {
    const urlSelect = document.getElementById('urlSelect');
    const selectedIndex = urlSelect.selectedIndex;
    
    // Check if there are enough options to delete
    if (urlSelect.options.length <= 1) {
        alert('Cannot delete! At least one URL must remain in the list.');
        return;
    }
    
    // Get the name of the URL being deleted for confirmation
    const selectedOptionText = urlSelect.options[selectedIndex].text;
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete "${selectedOptionText}"?`)) {
        return;
    }
    
    // If auto refresh is running for this URL, stop it
    if (isRunning && selectedUrl === urlSelect.value) {
        stopAutoRefresh();
    }
    
    // Remove the selected option
    urlSelect.remove(selectedIndex);
    
    // Select the first available option
    if (urlSelect.options.length > 0) {
        urlSelect.selectedIndex = 0;
        updateSelectedUrl();
    }
    
    alert(`"${selectedOptionText}" has been deleted successfully!`);
}

function openOrReopen(url) {
    // If tab is closed → open again
    if (!newWindow || newWindow.closed) {
        newWindow = window.open(url, "_blank");
    }
}

function startAutoRefresh() {
    if (isRunning) return;
    
    openOrReopen(selectedUrl);

    refreshInterval = setInterval(() => {
        try {
            // If tab is open → refresh it
            if (newWindow && !newWindow.closed) {
                newWindow.location.href = selectedUrl;
            } else {
                // Tab closed → reopen it
                openOrReopen(selectedUrl);
            }
        } catch (e) {
            // Cross-origin issue → just reopen the tab
            openOrReopen(selectedUrl);
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
    const urlSelect = document.getElementById('urlSelect');

    if (isRunning) {
        const selectedOptionText = urlSelect.options[urlSelect.selectedIndex].text;
        statusElement.textContent = `✅ Auto refresh is running for "${selectedOptionText}" - will never stop`;
        statusElement.style.color = "green";
        startBtn.disabled = true;
        stopBtn.disabled = false;
        urlSelect.disabled = true;
    } else {
        statusElement.textContent = "❌ Auto refresh is stopped";
        statusElement.style.color = "red";
        startBtn.disabled = false;
        stopBtn.disabled = true;
        urlSelect.disabled = false;
    }
}

// Initialize on page load
window.onload = function() {
    updateSelectedUrl();
    updateStatus();
};
