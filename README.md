# 🌾 Kisan-AGI

## 📖 Description

**Kisan-AGI** is a modern, high-contrast agricultural mobile application specifically designed for Indian farmers. The app offers intuitive crop management, instant disease diagnosis using AI, and a supportive community platform. Built with accessibility in mind, it features large buttons, clear text, and a vibrant agricultural-themed design.
![WhatsApp Image 2026-02-04 at 17 34 12](https://github.com/user-attachments/assets/43b1db2a-2a6e-4285-af54-76b5dfa889d3)


### Key Features

- 🌍 **Multi-language Support**: English and Hindi interface
- 📸 **AI-Powered Disease Diagnosis**: Instant crop disease detection using Google Vertex AI
- 📊 **Crop Management**: Track and manage multiple crops with planting dates and status
- 🏥 **Recovery Plans**: Step-by-step recovery timelines for detected diseases
- 👥 **Community Feed**: Share crop issues, solutions, and connect with other farmers
- 🌤️ **Weather Widget**: Real-time weather information for better farming decisions
- 📍 **Nearby Dealers**: Find agricultural dealers and suppliers in your area
- 🎨 **Accessible Design**: Large, readable fonts and high-contrast colors for easy use

---

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **Framework**: Flutter 3.6+
- **Language**: Dart
- **State Management**: Provider
- **Navigation**: go_router
- **HTTP Client**: http
- **Local Storage**: shared_preferences
- **Image Picker**: image_picker
- **Fonts**: Google Fonts (Nunito)
- **Internationalization**: intl

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB Atlas (Mongoose)
- **AI/ML**: Google Cloud Vertex AI
- **File Storage**: Google Cloud Storage
- **Image Processing**: Multer
- **CORS**: Enabled for cross-origin requests

### Infrastructure
- **Database**: MongoDB Atlas (Cloud)
- **Cloud Services**: Google Cloud Platform
  - Vertex AI (for disease diagnosis)
  - Cloud Storage (for image storage)
- **Version Control**: Git & GitHub

---

## 📁 Project Structure

```
Kisan-AGI/
├── lib/
│   ├── config.dart                 # API configuration
│   ├── main.dart                   # App entry point
│   ├── nav.dart                    # Navigation routes
│   ├── theme.dart                  # App theme & colors
│   ├── models/                     # Data models
│   │   ├── crop_model.dart
│   │   ├── disease_model.dart
│   │   ├── post_model.dart
│   │   ├── recovery_plan_model.dart
│   │   └── user_model.dart
│   ├── screens/                    # App screens
│   │   ├── language_selection_screen.dart
│   │   ├── phone_login_screen.dart
│   │   ├── dashboard_screen.dart
│   │   ├── scan_screen.dart
│   │   ├── diagnosis_screen.dart
│   │   ├── community_screen.dart
│   │   ├── profile_screen.dart
│   │   ├── settings_screen.dart
│   │   └── notifications_screen.dart
│   ├── services/                   # Business logic & local storage
│   │   ├── user_service.dart
│   │   ├── crop_service.dart
│   │   ├── disease_service.dart
│   │   ├── recovery_plan_service.dart
│   │   └── post_service.dart
│   └── widgets/                    # Reusable widgets
│       ├── crop_card.dart
│       ├── post_card.dart
│       ├── recent_scan_card.dart
│       └── weather_widget.dart
├── backend/
│   ├── server.js                   # Express server
│   ├── models/
│   │   └── Dealer.js               # Dealer model
│   ├── routes/
│   │   ├── diagnose.js             # Disease diagnosis API
│   │   └── dealers.js              # Nearby dealers API
│   ├── seed.js                     # Database seeding
│   └── package.json
├── assets/
│   ├── images/                     # Crop & disease images
│   └── icons/                      # App icons
├── android/                        # Android configuration
├── ios/                            # iOS configuration
├── pubspec.yaml                    # Flutter dependencies
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Flutter SDK** 3.6 or higher
- **Node.js** 14.x or higher
- **MongoDB Atlas** account (or local MongoDB)
- **Google Cloud Platform** account (for Vertex AI)
- **Android Studio** / **Xcode** (for mobile development)
- **Git** (for version control)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Krishna-cell-12/Kisan-AGI.git
cd Kisan-AGI
```

#### 2. Flutter App Setup

```bash
# Install Flutter dependencies
flutter pub get

# Verify Flutter installation
flutter doctor
```

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Node.js dependencies
npm install

# Create .env file with your credentials
# MONGO_URI=your_mongodb_atlas_connection_string
# PROJECT_ID=your_gcp_project_id
# PORT=5000

# Seed the database (optional)
node seed.js

# Start the backend server
node server.js
```

The backend server will run on `http://localhost:5000`

#### 4. Configure API Endpoint

Update `lib/config.dart` with your backend URL:
- **Android Emulator**: `http://10.0.2.2:5000`
- **iOS Simulator**: `http://127.0.0.1:5000`
- **Physical Device**: `http://YOUR_IP_ADDRESS:5000`

---

## 🏃 Running the Application

### Run Flutter App

```bash
# Run on connected device/emulator
flutter run

# Run on specific device
flutter run -d <device_id>

# Build APK for Android
flutter build apk

# Build iOS app (macOS only)
flutter build ios
```

### Run Backend Server

```bash
cd backend
node server.js
```

---

## 🔌 API Endpoints

### 1. Disease Diagnosis
**POST** `/api/diagnose`

Upload a crop leaf image for AI-powered disease detection.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `leaf_image` (image file)

**Response:**
```json
{
  "disease_name": "Tomato Early Blight",
  "confidence_score": 98,
  "timeline": [
    {
      "day": "Day 1",
      "title": "Fungicide Application",
      "detail": "Spray Copper Oxychloride..."
    }
  ]
}
```

### 2. Nearby Dealers
**GET** `/api/dealers?lat={latitude}&long={longitude}`

Find agricultural dealers near your location.

**Query Parameters:**
- `lat`: Latitude
- `long`: Longitude

**Response:**
```json
[
  {
    "name": "AgroTech Solutions",
    "rating": 4.8,
    "stock": ["Fungicide X", "Urea"],
    "location": {
      "coordinates": [72.83, 19.11]
    }
  }
]
```

---

## 🎨 Design System

### Color Palette
- **Primary Color**: Deep Emerald Green (#2E7D32) - Agriculture & Growth
- **Secondary Color**: Harvest Gold (#FFB300) - Prosperity & Harvest
- **Background**: Clean Off-White (#FAFAFA)
- **Cards**: White with soft shadows

### Typography
- **Font Family**: Nunito (Google Fonts)
- **Style**: Large, readable fonts for accessibility
- **High Contrast**: Optimized for outdoor visibility

### UI Components
- Card-based layouts with generous spacing
- Large, accessible buttons
- Clear visual hierarchy
- Material 3 design principles

---

## 📱 App Screens

1. **Language Selection** - Choose between English and Hindi
2. **Phone Login** - OTP-based authentication
3. **Dashboard** - Weather, crops, and recent scans
4. **Scan Screen** - Camera interface for disease detection
5. **Diagnosis Screen** - Disease details and recovery plan
6. **Community Feed** - Farmer posts and discussions
7. **Profile** - User information and settings
8. **Notifications** - App alerts and updates

---

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:5000/api/dealers?lat=19.07&long=72.87
```

### Flutter Testing
```bash
# Run tests
flutter test

# Run with coverage
flutter test --coverage
```

---

## 📦 Dependencies

### Flutter (pubspec.yaml)
- `flutter`: SDK
- `provider`: ^6.1.2
- `go_router`: ^16.2.0
- `google_fonts`: ^6.1.0
- `shared_preferences`: ^2.0.0
- `image_picker`: >=1.1.2
- `http`: ^1.1.0
- `intl`: 0.20.2

### Backend (package.json)
- `express`: ^5.2.1
- `mongoose`: ^9.0.2
- `@google-cloud/vertexai`: ^1.10.0
- `@google-cloud/storage`: ^7.18.0
- `multer`: ^2.0.2
- `cors`: ^2.8.5
- `axios`: ^1.13.2
- `dotenv`: ^17.2.3

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Krishna-cell-12**

- GitHub: [@Krishna-cell-12](https://github.com/Krishna-cell-12)
- Repository: [Kisan-AGI](https://github.com/Krishna-cell-12/Kisan-AGI)

---

## 🔗 Links

- [Issues](https://github.com/Krishna-cell-12/Kisan-AGI/issues)
- [Backend Documentation](backend/README.md)
- [Architecture Documentation](architecture.md)
- [Backend Integration Guide](BACKEND_INTEGRATION.md)

---

## 📝 Push to GitHub Main Branch

To push your code to the main branch of the `kisan-agi` repository:

```bash
# 1. Check current status
git status

# 2. Add all changes
git add .

# 3. Commit changes with a descriptive message
git commit -m "Add comprehensive README with project documentation"

# 4. Add remote repository (if not already added)
git remote add origin https://github.com/Krishna-cell-12/Kisan-AGI.git

# 5. Check current branch
git branch

# 6. Push to main branch
git push origin main

# If you're on a different branch and want to push to main:
git push origin HEAD:main

# If you need to force push (use with caution):
# git push origin main --force
```

### Alternative: Push from Current Branch to Main

```bash
# If you're on a different branch (e.g., 'develop')
git checkout -b main  # Create and switch to main branch
git push origin main  # Push to main branch
```

### First Time Setup

```bash
# Initialize git (if not already initialized)
git init

# Add remote repository
git remote add origin https://github.com/Krishna-cell-12/Kisan-AGI.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Kisan-AGI agricultural app"

# Push to main branch
git push -u origin main
```

---

## ⚠️ Important Notes

- Ensure you have the necessary environment variables set in `backend/.env`
- Google Cloud service account JSON file is required for Vertex AI functionality
- MongoDB Atlas connection string must be configured
- For physical device testing, update the API base URL in `lib/config.dart`

---

## 🎯 Roadmap

- [ ] Add more language support
- [ ] Implement offline mode
- [ ] Add push notifications
- [ ] Integrate payment gateway for dealer purchases
- [ ] Add crop calendar and reminders
- [ ] Implement advanced analytics dashboard
- [ ] Add video tutorials for farmers
- [ ] Expand dealer network integration

---

<div align="center">
  <p>Made with ❤️ for Indian Farmers</p>
  <p>🌾 Empowering Agriculture Through Technology 🌾</p>
</div>

