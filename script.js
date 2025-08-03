let newWindow = null;
let refreshInterval = null;
let isRunning = false;
let selectedUrl = "https://github.com/rksingh1713"; // Default URL

// Protected URLs that cannot be deleted
const protectedUrls = [
    "https://github.com/rksingh1713"
];

// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function updateSelectedUrl() {
    const urlSelect = document.getElementById('urlSelect');
    selectedUrl = urlSelect.value;
    
    // Update delete button state when URL changes
    updateDeleteButtonState();
    
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
        showNotification('Please enter both URL and display name', 'error');
        return;
    }
    
    // Basic URL validation
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        showNotification('URL must start with http:// or https://', 'error');
        return;
    }
    
    // Check if URL already exists
    for (let i = 0; i < urlSelect.options.length; i++) {
        if (urlSelect.options[i].value === url) {
            showNotification('This URL already exists in the list!', 'error');
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
    
    showNotification('Target deployed successfully!', 'success');
}

function deleteSelectedUrl() {
    const urlSelect = document.getElementById('urlSelect');
    const selectedIndex = urlSelect.selectedIndex;
    const selectedUrl = urlSelect.value;
    
    // Check if the selected URL is protected
    if (protectedUrls.includes(selectedUrl)) {
        showNotification('Cannot delete protected URL! This is a system default target.', 'error');
        return;
    }
    
    // Check if there are enough options to delete
    if (urlSelect.options.length <= 1) {
        showNotification('Cannot delete! At least one target must remain active.', 'error');
        return;
    }
    
    // Get the name of the URL being deleted for confirmation
    const selectedOptionText = urlSelect.options[selectedIndex].text;
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to terminate "${selectedOptionText}"?`)) {
        return;
    }
    
    // If auto refresh is running for this URL, stop it
    if (isRunning && this.selectedUrl === urlSelect.value) {
        stopAutoRefresh();
    }
    
    // Remove the selected option
    urlSelect.remove(selectedIndex);
    
    // Select the first available option
    if (urlSelect.options.length > 0) {
        urlSelect.selectedIndex = 0;
        updateSelectedUrl();
    }
    
    showNotification(`"${selectedOptionText}" has been terminated successfully!`, 'success');
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
    showNotification('Neural protocol initialized successfully!', 'success');
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
    showNotification('Process terminated successfully!', 'warning');
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const urlSelect = document.getElementById('urlSelect');
    const statusCard = document.querySelector('.status-card');

    if (isRunning) {
        const selectedOptionText = urlSelect.options[urlSelect.selectedIndex].text;
        statusElement.textContent = `🔄 Neural protocol active for "${selectedOptionText}" - Infinite loop engaged`;
        statusElement.className = 'status-text status-running';
        startBtn.disabled = true;
        stopBtn.disabled = false;
        urlSelect.disabled = true;
        statusCard.classList.add('active');
        
        // Update button text
        startBtn.innerHTML = '<i class="fas fa-rocket"></i><span>Protocol Active</span>';
        stopBtn.innerHTML = '<i class="fas fa-stop"></i><span>Terminate Process</span>';
    } else {
        statusElement.textContent = "⚡ System ready - Awaiting neural protocol initialization";
        statusElement.className = 'status-text status-stopped';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        urlSelect.disabled = false;
        statusCard.classList.remove('active');
        
        // Update button text
        startBtn.innerHTML = '<i class="fas fa-rocket"></i><span>Initialize Protocol</span>';
        stopBtn.innerHTML = '<i class="fas fa-stop"></i><span>Process Terminated</span>';
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--accent-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--warning-color)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.onload = function() {
    initializeTheme();
    updateSelectedUrl();
    updateStatus();
    updateDeleteButtonState();
    
    // Add some startup effects
    setTimeout(() => {
        showNotification('AI AutoRefresh System Online', 'success');
    }, 500);
};

// Function to update delete button state based on selection
function updateDeleteButtonState() {
    const urlSelect = document.getElementById('urlSelect');
    const deleteBtn = document.querySelector('.btn-danger');
    const selectedUrl = urlSelect.value;
    
    if (protectedUrls.includes(selectedUrl)) {
        deleteBtn.disabled = true;
        deleteBtn.style.opacity = '1';
        deleteBtn.title = 'Cannot delete protected system URL';
    } else {
        deleteBtn.disabled = false;
        deleteBtn.style.opacity = '1';
        deleteBtn.title = 'Delete selected URL';
    }
}
