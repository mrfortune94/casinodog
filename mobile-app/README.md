# CasinoDog Mobile App

A user-friendly React Native mobile application for the CasinoDog casino game aggregation platform.

## 📱 Features

- **Beautiful UI**: Modern, dark-themed interface optimized for mobile gaming
- **Game Browser**: Browse thousands of casino games from 20+ providers
- **Search & Filter**: Find games by name, provider, or category
- **Game Launcher**: Play games directly in the app with WebView integration
- **User Profile**: Manage your account and preferences
- **Settings**: Configure API connection and app preferences
- **Offline Support**: Cache games list for faster loading

## 🏗️ Architecture

This mobile app is built with:
- **React Native 0.72.6** - Cross-platform mobile framework
- **React Navigation** - Navigation and routing
- **Axios** - API communication with Laravel backend
- **AsyncStorage** - Local data persistence
- **React Native WebView** - In-app game rendering

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- React Native CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Installation

1. **Navigate to mobile app directory:**
```bash
cd mobile-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start Metro bundler:**
```bash
npm start
```

4. **Run on Android:**
```bash
npm run android
```

5. **Run on iOS (macOS only):**
```bash
cd ios && pod install && cd ..
npm run ios
```

## 🔧 Configuration

### Backend API Setup

1. Open the app and navigate to **Profile → Settings**
2. Enter your CasinoDog backend URL (e.g., `https://your-server.com`)
3. (Optional) Enter your access key if authentication is required
4. Tap **Test Connection** to verify
5. Tap **Save Settings**

### Environment Variables

Create a `.env` file in the mobile-app directory:

```env
API_BASE_URL=https://your-casinodog-server.com
API_ACCESS_KEY=your_optional_access_key
```

## 📦 Building APK

### Debug Build

```bash
cd android
./gradlew assembleDebug
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build

1. Generate a signing key:
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Place the keystore in `android/app/`

3. Create `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=your_store_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

4. Build the release APK:
```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## 🤖 GitHub Actions CI/CD

This project includes automated GitHub Actions workflows for building APKs.

### Automatic Builds

APKs are automatically built on:
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual workflow dispatch

### Manual Build Trigger

1. Go to **Actions** tab in GitHub
2. Select **Build Android APK** workflow
3. Click **Run workflow**
4. Choose build type (debug/release)
5. Download the APK from artifacts

### Setting Up Release Builds

Add these secrets to your GitHub repository:
- `SIGNING_KEY_ALIAS` - Your keystore alias
- `SIGNING_KEY_PASSWORD` - Your key password
- `SIGNING_STORE_PASSWORD` - Your keystore password

Go to **Settings → Secrets and variables → Actions → New repository secret**

## 📁 Project Structure

```
mobile-app/
├── android/                 # Android native code
│   ├── app/
│   │   ├── build.gradle    # App-level Gradle config
│   │   └── src/main/       # Android source files
│   └── build.gradle        # Project-level Gradle config
├── src/
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js
│   │   ├── GamesListScreen.js
│   │   ├── GameDetailScreen.js
│   │   ├── GameLauncherScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SettingsScreen.js
│   └── services/
│       └── api.js          # API service layer
├── App.js                  # Root component
├── index.js               # App entry point
├── package.json           # Dependencies
└── babel.config.js        # Babel configuration
```

## 🎮 Using the App

### First Launch

1. Open the app
2. Grant necessary permissions
3. Navigate to **Profile → Settings**
4. Configure your backend API URL
5. Test the connection
6. Start browsing games!

### Browsing Games

- **Home Tab**: View featured games and providers
- **Search**: Use the search bar to find specific games
- **Filter**: Tap on a provider to see their games
- **Game Details**: Tap any game to view details

### Playing Games

1. Open a game detail page
2. Choose **Play for Real** or **Try Demo**
3. Game loads in full-screen WebView
4. Use the close button to exit

### Settings

Configure:
- Backend API URL
- Access key (if required)
- Username
- Notifications
- Sound preferences

## 🔌 API Integration

The app communicates with the CasinoDog Laravel backend using these endpoints:

- `GET /api/accessPing` - Test API connection
- `GET /api/gameslist/{layout}` - Fetch games list
- `GET /api/createSession` - Create game session
- `GET /api/createSessionIframed` - Create iframed session
- `GET /api/control/add_freespins` - Add free spins
- `GET /api/control/toggle_respin` - Toggle respin feature

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### Android Build Errors

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### WebView Not Loading Games

- Ensure `usesCleartextTraffic="true"` in AndroidManifest.xml
- Check that your backend allows CORS
- Verify the game URL is accessible

### Connection Issues

- Verify backend URL is correct
- Check if backend is running and accessible
- Test with `accessPing` endpoint
- Check firewall/network settings

## 📱 Screenshots

The app features:
- Dark theme optimized for gaming
- Modern card-based UI
- Smooth animations and transitions
- Responsive design for all screen sizes

## 🔒 Security Notes

- Never commit keystore files or passwords
- Use environment variables for sensitive data
- Enable ProGuard for release builds
- Implement proper authentication with your backend
- Validate all API responses

## 🚢 Deployment

### Google Play Store

1. Build a signed release APK/AAB
2. Create a Google Play Developer account
3. Create a new application
4. Upload your APK/AAB
5. Fill in store listing details
6. Submit for review

### Direct Distribution

You can distribute APKs directly:
- Via your website
- Through GitHub Releases (automated)
- Via internal distribution platforms

## 📄 License

This project follows the same license as the CasinoDog backend (MIT).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues, questions, or contributions, please refer to the main CasinoDog repository.

## 🎯 Roadmap

Future enhancements:
- [ ] Favorites system
- [ ] Game history tracking
- [ ] Push notifications
- [ ] Social features
- [ ] In-app purchases
- [ ] Biometric authentication
- [ ] Offline game caching
- [ ] Multiple language support

---

**Built with ❤️ for the CasinoDog platform**
# Trigger build
