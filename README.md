# Study Pro Global - Mobile Application

Official Global Mobile Application for Study Pro Global - A fully functional automated encrypted system for university applications designed specifically for international students.

## 🌟 Features

### 🔒 Security & Encryption
- **End-to-End Encryption**: All sensitive data is encrypted using AES-256 encryption
- **Secure Storage**: Encrypted local storage for all application data
- **Password Hashing**: SHA-256 password hashing for user authentication
- **Automated Security**: Built-in security measures for data protection

### 🌍 International Student Support
- **Multi-Country Support**: Apply to universities worldwide from one platform
- **Document Management**: Securely upload and manage application documents
- **Application Tracking**: Real-time tracking of application status
- **Multiple Applications**: Manage multiple university applications simultaneously

### 📝 Application Management
- **Step-by-Step Forms**: Intuitive multi-step application forms
- **Personal Information**: Comprehensive personal details collection
- **Educational Background**: Academic history and qualifications
- **English Proficiency**: Support for IELTS, TOEFL, Duolingo, PTE, and other tests
- **University Preferences**: Specify preferred countries, programs, and start dates

### ⚡ Automated Features
- **Auto-Save**: Automatic saving of application progress
- **Status Updates**: Automated application status tracking
- **Validation**: Built-in form validation to ensure data completeness
- **Draft Management**: Save applications as drafts and submit when ready

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- React Native development environment
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bikkhoto/studyproglobal-application-.git
cd studyproglobal-application-
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the Application

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Development Server
```bash
npm start
```

## 📱 Application Structure

```
src/
├── screens/           # Application screens
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ApplicationFormScreen.tsx
│   ├── ApplicationListScreen.tsx
│   └── ApplicationDetailScreen.tsx
├── services/          # Business logic and services
│   ├── EncryptionService.ts
│   ├── AuthService.ts
│   └── ApplicationService.ts
├── models/            # Data models and types
│   └── Application.ts
├── navigation/        # Navigation configuration
│   └── AppNavigator.tsx
└── components/        # Reusable components
```

## 🔐 Security Features

### Data Encryption
All sensitive data including personal information, educational background, and documents are encrypted before storage using industry-standard AES-256 encryption.

### Authentication
- Secure user registration and login
- Password hashing using SHA-256
- Encrypted token-based authentication
- Secure session management

### Secure Storage
- React Native Encrypted Storage for iOS
- Android Keystore System for Android
- No plain text storage of sensitive data

## 🎯 User Roles

### Student
- Create and manage university applications
- Upload required documents
- Track application status
- Manage personal profile

### Admin (Future Enhancement)
- Review submitted applications
- Update application status
- Manage users
- Generate reports

### Counselor (Future Enhancement)
- Guide students through application process
- Review and provide feedback
- Track student progress

## 📋 Application Workflow

1. **Registration**: Create a secure account
2. **Login**: Access the dashboard
3. **Create Application**: Fill out the multi-step application form
   - Personal Information
   - Educational Background
   - English Proficiency
   - University Preferences
4. **Save as Draft**: Save progress and continue later
5. **Submit**: Submit completed application for review
6. **Track Status**: Monitor application progress

## 🧪 Testing

Run tests:
```bash
npm test
```

Run linting:
```bash
npm run lint
```

## 📦 Dependencies

### Core
- React Native 0.82.1
- React 19.1.1
- TypeScript 5.8.3

### Navigation
- @react-navigation/native
- @react-navigation/stack
- react-native-screens
- react-native-gesture-handler

### Security
- react-native-encrypted-storage
- crypto-js
- @react-native-async-storage/async-storage

### Utilities
- react-native-document-picker
- react-native-fs
- react-native-safe-area-context

## 🛠️ Development

### Code Style
This project uses ESLint and Prettier for code formatting and style consistency.

### Type Safety
TypeScript is used throughout the project for type safety and better developer experience.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@studyproglobal.com or open an issue on GitHub.

## 🌐 About Study Pro Global

Study Pro Global is dedicated to helping international students achieve their educational dreams by simplifying the university application process through innovative technology and secure data management.

---

**Built with ❤️ for International Students Worldwide**
