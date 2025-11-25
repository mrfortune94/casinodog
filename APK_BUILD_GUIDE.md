# CasinoDog Mobile App - APK Build Guide

## 🎯 Overview
This guide explains how to build the CasinoDog mobile app as an Android APK using GitHub Actions.

## 📱 Features Built
- ✅ React Native mobile frontend with user-friendly UI
- ✅ Game browsing, search, and filtering
- ✅ Game launcher with fullscreen WebView
- ✅ User authentication and profile management
- ✅ Provider browsing and favorites
- ✅ Automated APK build workflow

## 🚀 Quick Start

### Option 1: Automated Build via GitHub Actions (Recommended)

The APK is automatically built when you push to the `main` branch or manually trigger the workflow.

#### To Download the APK:

1. Go to your GitHub repository: https://github.com/mrfortune94/casinodog
2. Click on the **Actions** tab
3. Click on the latest **"Build Android APK"** workflow run
4. Scroll down to the **Artifacts** section
5. Download **casinodog-debug-apk.zip**
6. Extract and install the APK on your Android device

#### To Manually Trigger a Build:

1. Go to **Actions** tab in your repository
2. Click **Build Android APK** workflow
3. Click **Run workflow** button
4. Select release type (debug or release)
5. Click **Run workflow**

### Option 2: Local Build

#### Prerequisites:
```bash
# Install Node.js 18+
# Install Java 17
# Install Android SDK

# Install dependencies
cd mobile-app
npm install
```

#### Build Debug APK:
```bash
cd mobile-app/android
./gradlew assembleDebug
```

The APK will be at: `mobile-app/android/app/build/outputs/apk/debug/app-debug.apk`

#### Build Release APK:
```bash
cd mobile-app/android
./gradlew assembleRelease
```

## 🔧 Configuration

### Backend API URL

Update the API URL in `mobile-app/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### App Configuration

Edit `mobile-app/app.json` to customize:
- App name
- Bundle identifier
- Version
- Permissions

## 📋 Workflow Details

The GitHub Actions workflow (`.github/workflows/build-android.yml`) automatically:

1. ✅ Checks out the repository
2. ✅ Sets up Node.js 18 and Java 17
3. ✅ Installs React Native dependencies
4. ✅ Configures Android SDK
5. ✅ Builds the APK (debug or release)
6. ✅ Uploads APK as artifact
7. ✅ Creates GitHub release (for release builds)

## 🎨 App Structure

```
mobile-app/
├── src/
│   ├── screens/          # All app screens
│   │   ├── HomeScreen.js
│   │   ├── GamesListScreen.js
│   │   ├── GameDetailScreen.js
│   │   ├── GameLauncherScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SettingsScreen.js
│   └── services/
│       └── api.js        # Backend API integration
├── android/              # Android native code
└── App.js               # Main app component
```

## 🔐 Release Build (Optional)

To create a signed release APK, you need to:

1. Generate a signing key:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore casinodog-release.keystore -alias casinodog -keyalg RSA -keysize 2048 -validity 10000
```

2. Add GitHub Secrets:
- Go to Settings → Secrets and variables → Actions
- Add secrets:
  - `SIGNING_KEY_ALIAS`: casinodog
  - `SIGNING_KEY_PASSWORD`: your_key_password
  - `SIGNING_STORE_PASSWORD`: your_store_password

3. Upload keystore to repository (or encode in secret)

4. Run workflow with "release" type

## 🐛 Troubleshooting

### Build Fails
- Check Actions logs for specific errors
- Ensure all dependencies are properly installed
- Verify API URL is accessible

### APK Won't Install
- Enable "Unknown Sources" in Android settings
- Check Android version compatibility (minimum: Android 5.0)

### App Crashes on Launch
- Check backend API is running
- Verify API URL in api.js
- Check device logs via `adb logcat`

## 📱 Installing APK on Device

1. Download the APK to your Android device
2. Open the APK file
3. Enable "Install from Unknown Sources" if prompted
4. Tap "Install"
5. Open the app once installed

## 🎯 Next Steps

- [ ] Configure production API URL
- [ ] Add app icons and splash screen
- [ ] Set up code signing for release builds
- [ ] Configure Firebase for push notifications (optional)
- [ ] Add crash reporting (optional)
- [ ] Submit to Google Play Store (optional)

## 📞 Support

For issues or questions:
- Check GitHub Actions logs
- Review error messages in the app
- Create an issue in the repository

---

**Built with ❤️ using React Native**
