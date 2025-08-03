# 🤖 AI AutoRefresh - Neural Network URL Monitoring System

A futuristic web application that automatically refreshes web pages at high frequency with an AI-themed interface. Perfect for monitoring GitHub profiles, websites, or any URL that needs constant refreshing.

![AI AutoRefresh](https://img.shields.io/badge/AI-AutoRefresh-00ff88?style=for-the-badge&logo=robot)
![Version](https://img.shields.io/badge/version-2.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 Core Functionality
- **Infinite Loop Protocol**: Refreshes selected URLs every second
- **Multi-Target Support**: Add and manage multiple URLs with custom names
- **Smart Tab Management**: Automatically reopens closed tabs
- **Protected URLs**: System prevents deletion of default/protected targets

### 🎨 Interface & Design
- **Dual Theme Support**: Dark (default) and Light themes
- **Neural Network Aesthetic**: Futuristic AI-themed interface
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Status Updates**: Live monitoring of refresh operations
- **Animated Background**: Dynamic grid lines for visual appeal

### 🔧 Advanced Features
- **Cross-Origin Handling**: Manages browser security restrictions gracefully
- **Local Storage**: Remembers theme preferences
- **Notification System**: Success/error/warning notifications
- **Progress Indicators**: Visual feedback for system operations
- **Button State Management**: Context-aware UI controls

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rksingh1713/Profile-Auto-Refresh.git
   cd Profile-Auto-Refresh
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Start monitoring**
   - Select or add a target URL
   - Click "Initialize Protocol" to start auto-refresh
   - Monitor status in real-time

## 📖 Usage Guide

### Basic Operations

#### 🎯 Adding New Targets
1. Enter the URL in the "Add New Target" section
2. Provide a display name for easy identification
3. Click "Deploy Target" to add to the list

#### 🔄 Starting Auto-Refresh
1. Select your target URL from the dropdown
2. Click "Initialize Protocol" 
3. A new tab will open and refresh every second
4. Monitor status in the control panel

#### ⏹️ Stopping the Process
1. Click "Terminate Process" to stop auto-refresh
2. The monitored tab will automatically close
3. System returns to ready state

### Advanced Features

#### 🌓 Theme Switching
- Click the theme toggle button (moon/sun icon) in the top-right
- Preference is automatically saved to local storage

#### 🗑️ URL Management
- Use the trash icon to delete custom URLs
- Protected URLs (like default GitHub profile) cannot be deleted
- At least one URL must remain in the system

## 🏗️ Project Structure

```
Profile-Auto-Refresh/
├── index.html          # Main HTML structure
├── script.js           # Core JavaScript functionality
├── style.css           # Styling and themes
└── README.md          # Project documentation
```

### Key Files

#### `index.html`
- Main application interface
- Responsive layout with semantic HTML
- Font Awesome icons for enhanced UI
- Theme toggle functionality

#### `script.js`
- Auto-refresh engine with 1-second intervals
- URL management system
- Theme persistence
- Notification system
- Cross-origin error handling

#### `style.css`
- CSS custom properties for theme management
- Responsive design patterns
- Animated background elements
- Modern glassmorphism effects

## ⚡ Technical Details

### Refresh Mechanism
```javascript
// Core refresh loop - executes every 1000ms
refreshInterval = setInterval(() => {
    try {
        if (newWindow && !newWindow.closed) {
            newWindow.location.href = selectedUrl;
        } else {
            openOrReopen(selectedUrl);
        }
    } catch (e) {
        openOrReopen(selectedUrl);
    }
}, 1000);
```

### Theme System
```css
/* Dynamic CSS variables for instant theme switching */
:root {
    --primary-bg: #0a0e1a;
    --accent-color: #00ff88;
    /* ... more variables */
}

[data-theme="light"] {
    --primary-bg: #f8f9fa;
    --accent-color: #007bff;
    /* ... light theme overrides */
}
```

## 🔒 Security Considerations

- **Cross-Origin Limitations**: Some websites may block automatic refreshing due to CORS policies
- **Pop-up Blockers**: Browser may block automatic tab opening - allow pop-ups for this domain
- **Resource Usage**: High-frequency refreshing consumes bandwidth and system resources
- **Rate Limiting**: Some servers may rate-limit rapid requests

## 🎨 Customization

### Adding New Themes
1. Define new CSS custom properties in `style.css`
2. Create a new `[data-theme="your-theme"]` selector
3. Update the theme toggle function in `script.js`

### Modifying Refresh Interval
```javascript
// Change the interval value (in milliseconds)
}, 1000); // Current: 1 second

// Examples:
}, 500);   // 0.5 seconds (more aggressive)
}, 2000);  // 2 seconds (less aggressive)
```

### Custom Notification Styles
Modify the notification system in `script.js` to add new notification types or styling.

## 🐛 Known Issues

1. **Cross-Origin Restrictions**: Some websites may not refresh properly due to browser security
2. **Resource Intensive**: High-frequency refreshing can impact system performance
3. **Pop-up Blockers**: May prevent automatic tab opening in some browsers

## 🛠️ Troubleshooting

### Issue: Page doesn't refresh
- **Solution**: Check if the target website allows iframe embedding
- **Workaround**: Use websites that don't have strict CORS policies

### Issue: Tab doesn't open automatically
- **Solution**: Allow pop-ups for this domain in your browser settings
- **Chrome**: Settings → Privacy and security → Site Settings → Pop-ups and redirects

### Issue: High CPU usage
- **Solution**: Increase refresh interval or monitor fewer URLs simultaneously
- **Alternative**: Use system task manager to monitor resource usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rajesh Kumar Singh**
- GitHub: [@rksingh1713](https://github.com/rksingh1713)
- Profile: [GitHub Profile](https://github.com/rksingh1713)

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Modern CSS techniques for the futuristic design
- Browser APIs for tab management functionality

## 📊 Stats

- **Refresh Rate**: 1 second intervals
- **Supported Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Friendly**: Responsive design
- **Theme Options**: Dark & Light modes
- **File Size**: < 50KB total

---

<div align="center">

**⚡ Neural Engine v2.0 | 🔒 Secure Protocol | ♾️ Infinite Loop**

Made with 💚 and lots of ☕

</div>
