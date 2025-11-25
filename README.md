# 🎰 CasinoDog - Casino Game Aggregation Platform

[![Build Android APK](https://github.com/mrfortune94/casinodog/actions/workflows/build-android.yml/badge.svg)](https://github.com/mrfortune94/casinodog/actions/workflows/build-android.yml)

A comprehensive Laravel-based casino game aggregation platform with a modern React Native mobile frontend. Integrate 20+ game providers including Pragmatic Play, 3oaks, Relax Gaming, and many more.

## 🚀 Features

### Backend (Laravel)

#### 🎮 Game Provider Integration
- **20+ Game Providers** supported including:
  - Pragmatic Play
  - 3Oaks
  - Relax Gaming
  - BGaming
  - Betsoft
  - Habanero
  - iSoftBet
  - Mascot Gaming
  - NoLimit City
  - Play'n GO
  - Playson
  - QuickSpin
  - Red Tiger
  - Spinomenal
  - StakeLogic
  - NetEnt
  - And more...

#### 🛠️ Core Features
- **Game Aggregation** - Centralized game management from multiple providers
- **Session Management** - Handle game sessions, bridge sessions, and parent sessions
- **Operator Access Control** - Multi-operator support with access management
- **Game Launcher** - Universal game launcher for all providers
- **API Integration** - RESTful API for operator integration
- **Game Metadata** - Comprehensive game information and thumbnails
- **Automated Game Import** - Job-based game listing retrieval and updates

#### 🎯 Advanced Features
- **Game Respin Templates** - Save and reuse game results (loss/win patterns)
- **Bonus Game Tracking** - Track and manage bonus features by ID
- **Free Bets System** - Integrated free bet management
- **Crawler Data** - Automated game data collection
- **Data Logger** - Comprehensive logging system
- **GameKernel Trait** - Reusable game integration logic

#### 🔧 Developer Tools
- **Provider Scaffolding** - Generate new provider integration with one command:
  ```bash
  php artisan casino-dog:create-gameprovider
  ```
- **Game Import** - Import games from SOFTSWISS, PARIMATCH, PLAYTECH formats
- **Default Gameslist Retriever**:
  ```bash
  php artisan casino-dog:retrieve-default-gameslist {provider}
  ```

### Mobile Frontend (React Native)

#### 📱 User Interface
- **Modern, Clean Design** - User-friendly mobile experience
- **Game Browsing** - Browse all available games with thumbnails
- **Search & Filter** - Find games by name, provider, or category
- **Provider Pages** - Browse games by specific providers
- **Game Details** - View comprehensive game information
- **Fullscreen Launcher** - Immersive game playing experience

#### 👤 User Features
- **Authentication** - Login and registration
- **User Profiles** - Manage account information
- **Favorites** - Save and organize favorite games
- **Settings** - Customize app preferences
- **Session Management** - Seamless game session handling

#### 🎨 UI Components
- **Navigation** - Intuitive tab and stack navigation
- **Game Cards** - Beautiful game thumbnails and info
- **Search Bar** - Real-time search functionality
- **Filter Options** - Category and provider filters
- **WebView Integration** - Embedded game launcher
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages

### 📦 APK Build Workflow

#### Automated Builds
- **GitHub Actions** - Automated APK builds on every push
- **Manual Triggers** - Build on-demand via workflow dispatch
- **Debug & Release** - Support for both build types
- **Artifact Upload** - Downloadable APKs from GitHub Actions
- **Auto Releases** - Create GitHub releases for production builds

#### Build Features
- ✅ Node.js 18 and Java 17 setup
- ✅ Android SDK configuration
- ✅ Gradle caching for faster builds
- ✅ NPM dependency caching
- ✅ Build artifact retention (30/90 days)
- ✅ PR comments with build status

## 📋 Installation

### Backend Setup

#### Prerequisites
- PHP 8.0+
- Composer
- Laravel 9+
- MySQL/PostgreSQL

#### Quick Install
```bash
# Install Laravel with Breeze API
laravel new casinodog
cd casinodog
composer require laravel/breeze --dev
php artisan breeze:install api

# Install CasinoDog
composer require casino-dog/casino-dog
php artisan casino-dog:install

# Import default game listings
php artisan casino-dog:retrieve-default-gameslist pragmatic
php artisan casino-dog:retrieve-default-gameslist relax
```

#### Using Installer Script
```bash
# Use the automated installer
wget https://github.com/casino-man/wainwright-installer.sh
chmod +x wainwright-installer.sh
./wainwright-installer.sh
```

#### Configuration
Make sure to set correct `.env` variables:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=casinodog
DB_USERNAME=root
DB_PASSWORD=

CASINO_DOG_API_URL=https://your-domain.com
```

#### Admin Access
After installation, login at: `/allseeingdavid`
Use credentials entered during installation.

### Mobile App Setup

#### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio (for local builds)
- Java 17

#### Install Dependencies
```bash
cd mobile-app
npm install
```

#### Configure API URL
Edit `mobile-app/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

#### Run Development Build
```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

#### Build APK
```bash
cd mobile-app/android
./gradlew assembleDebug
```

APK location: `mobile-app/android/app/build/outputs/apk/debug/app-debug.apk`

### 📥 Download Pre-built APK

Visit the [GitHub Actions](https://github.com/mrfortune94/casinodog/actions) page:
1. Click on latest "Build Android APK" workflow
2. Download the **casinodog-debug-apk** artifact
3. Extract and install on Android device

## 🔧 Advanced Features

### Game Respin Templates
Save game results as templates to reuse for different players:
- Automatically saves losing spins as templates
- Can be applied to any player regardless of bet amount
- Maps game results across different bet sizes
- Bonus features saved under specific IDs

### Operator API Integration
Best used with the `casino-dog-operator-api` client SDK for:
- Multi-operator support
- API key management
- Game session handling
- Transaction processing

### Game Import Formats
Automatically import games from:
- SOFTSWISS format
- PARIMATCH format
- PLAYTECH format

### Provider Scaffolding
Create a new game provider integration:
```bash
php artisan casino-dog:create-gameprovider
```

This generates:
- Controllers
- Database migrations
- Frontend launcher views
- API routes
- Service classes



## ⚙️ Background Jobs & Workers

### Setting Up Cron Jobs

Worker & schedule runner required to run automated game importer jobs.

#### Configure Laravel Scheduler

Run `crontab -e` and add:
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Check if cron is running:
```bash
systemctl status cron
```

### Setting Up Supervisor

Install and configure supervisor for queue workers:

```bash
sudo apt-get install supervisor
cd /etc/supervisor/conf.d
sudo nano laravel-worker.conf
```

Create `laravel-worker.conf`:
```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=/usr/bin/php /var/www/laravel/artisan queue:work --sleep=0.1 --tries=2
autostart=true
autorestart=true
user=root
numprocs=10
redirect_stderr=true
stdout_logfile=/var/www/laravel/storage/logs/worker.log
```

Restart supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*
```

### Disable Automated Import

You can disable automated game import processing in `config/casino-dog.php`:
```php
'auto_import' => false,
```

## 📱 Mobile App Features

### Screens
- **HomeScreen** - Featured games and quick access
- **GamesListScreen** - Browse all games with filters
- **GameDetailScreen** - Game information and launch
- **GameLauncherScreen** - Fullscreen game experience
- **ProfileScreen** - User account management
- **SettingsScreen** - App preferences

### API Integration
- RESTful API communication
- Session management
- Authentication handling
- Error handling and retries
- Caching support

## 🚀 Deployment

### Heroku Deployment
Deploy using the skeleton at GitLab.com/casinoman

### Docker Deployment
```bash
# Build containers
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate

# Import games
docker-compose exec app php artisan casino-dog:retrieve-default-gameslist pragmatic
```

### Production Checklist
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Configure proper database credentials
- [ ] Set up SSL certificates
- [ ] Configure queue workers
- [ ] Set up cron jobs
- [ ] Configure backup system
- [ ] Set up monitoring
- [ ] Update mobile app API URL
- [ ] Build release APK with signing key

## 📚 Documentation

- **[APK Build Guide](APK_BUILD_GUIDE.md)** - Detailed APK building instructions
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Complete feature overview
- **[Game Descriptions](game_descriptions.json)** - Game metadata

## 🔐 Security

- API key authentication for operators
- Session validation
- CORS configuration
- Rate limiting
- SQL injection protection
- XSS protection

## 🧪 Testing

```bash
# Run backend tests
php artisan test

# Run mobile app tests
cd mobile-app
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open-source software.

## 🙏 Credits

App is inspired by work studying various casino platforms and aggregation systems.

## 📞 Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/mrfortune94/casinodog/issues)
- Review documentation files
- Check GitHub Actions for build status

## 🔗 Links

- **Repository**: https://github.com/mrfortune94/casinodog
- **GitHub Actions**: https://github.com/mrfortune94/casinodog/actions
- **Download APK**: Check the Actions tab for latest builds

---

**Built with ❤️ using Laravel & React Native**
