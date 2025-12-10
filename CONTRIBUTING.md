# Contributing to Study Pro Global

Thank you for your interest in contributing to Study Pro Global! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Security](#security)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or higher)
- npm or yarn
- Git
- React Native development environment
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/studyproglobal-application-.git
cd studyproglobal-application-
```

3. Add the upstream remote:
```bash
git remote add upstream https://github.com/bikkhoto/studyproglobal-application-.git
```

## Development Setup

### Install Dependencies

```bash
npm install
```

### iOS Setup (macOS only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the Development Server

```bash
npm start
```

### Running on Devices/Emulators

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

## Making Changes

### Branch Naming Convention

Create a new branch for your changes:

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Security: `security/description`

Example:
```bash
git checkout -b feature/add-document-upload
```

### Commit Message Guidelines

Write clear, concise commit messages:

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `security`: Security improvements

Example:
```
feat: Add document upload functionality

- Implement document picker integration
- Add file validation
- Update UI for document management

Closes #123
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React Native

- Use functional components with hooks
- Follow React Native best practices
- Implement proper error handling
- Use proper TypeScript props types

### Code Style

- Run ESLint before committing:
```bash
npm run lint
```

- Format code with Prettier:
```bash
npm run format
```

### File Organization

```
src/
├── screens/        # UI screens
├── components/     # Reusable components
├── services/       # Business logic
├── models/         # Data models
├── navigation/     # Navigation config
├── utils/          # Utility functions
└── constants/      # Constants
```

### Naming Conventions

- Components: PascalCase (`HomeScreen.tsx`)
- Services: PascalCase (`AuthService.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`API_URL`)

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Maintain test coverage above 70%
- Use descriptive test names

Example:
```typescript
describe('AuthService', () => {
  it('should successfully register a new user', async () => {
    // Test implementation
  });

  it('should reject registration with invalid email', async () => {
    // Test implementation
  });
});
```

## Submitting Changes

### Before Submitting

1. **Update your branch**:
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests**:
```bash
npm test
```

3. **Run linter**:
```bash
npm run lint
```

4. **Check TypeScript**:
```bash
npx tsc --noEmit
```

### Creating a Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature
```

2. Open a Pull Request on GitHub

3. Fill out the PR template with:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if UI changes)

4. Wait for review and address feedback

### Pull Request Guidelines

- Keep PRs focused and small
- One feature/fix per PR
- Include tests for new features
- Update documentation if needed
- Add screenshots for UI changes
- Link related issues

## Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email security@studyproglobal.com
2. Include detailed description
3. Provide steps to reproduce
4. Wait for response before disclosure

### Security Best Practices

When contributing:
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Follow encryption guidelines
- Validate all user inputs
- Use secure storage for sensitive data
- Follow OWASP Mobile Security guidelines

## Code Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Peer Review**: Maintainers review code quality
3. **Security Review**: Security implications checked
4. **Testing**: Functionality verified
5. **Approval**: At least one maintainer approval required
6. **Merge**: Changes merged to main branch

## Development Tips

### Debugging

- Use React Native Debugger
- Enable console logs for development
- Use TypeScript for type checking
- Test on both iOS and Android

### Performance

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Optimize images and assets
- Profile app performance regularly

### Accessibility

- Add accessibility labels
- Support screen readers
- Ensure proper color contrast
- Test with accessibility features

## Questions?

- Open an issue for bug reports or feature requests
- Join our community discussions
- Check existing issues and PRs
- Read the documentation

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project website

Thank you for contributing to Study Pro Global! 🎉
