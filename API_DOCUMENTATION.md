# Study Pro Global - API Documentation

This document outlines the API endpoints that should be implemented for the Study Pro Global backend service to integrate with this mobile application.

## Base URL

```
Production: https://api.studyproglobal.com/v1
Development: https://dev-api.studyproglobal.com/v1
```

## Authentication

All authenticated endpoints require an `Authorization` header:

```
Authorization: Bearer {token}
```

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student",
      "createdAt": "2024-12-10T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student",
      "lastLogin": "2024-12-10T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Logout

```http
POST /auth/logout
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Refresh Token

```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Profile

#### Get Current User

```http
GET /users/me
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "createdAt": "2024-12-10T10:00:00Z",
    "lastLogin": "2024-12-10T10:00:00Z"
  }
}
```

#### Update Profile

```http
PUT /users/me
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "phone": "+1234567890"
  }
}
```

### Applications

#### Create Application

```http
POST /applications
```

**Headers:** Authorization required

**Request Body:**
```json
{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2000-01-01",
    "nationality": "India",
    "passportNumber": "A12345678",
    "email": "john@example.com",
    "phone": "+1234567890",
    "currentAddress": "123 Main St, City, Country"
  },
  "educationalBackground": {
    "highSchoolName": "ABC High School",
    "highSchoolCountry": "India",
    "graduationYear": "2020",
    "gpa": "3.8"
  },
  "englishProficiency": {
    "testType": "IELTS",
    "score": "7.5",
    "testDate": "2023-12-01"
  },
  "universityPreferences": {
    "preferredCountries": ["USA", "UK", "Canada"],
    "preferredPrograms": ["Computer Science", "Engineering"],
    "degreeLevel": "Undergraduate",
    "preferredStartDate": "2024-09"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "userId": "user_123",
    "status": "draft",
    "createdAt": "2024-12-10T10:00:00Z",
    "updatedAt": "2024-12-10T10:00:00Z"
  }
}
```

#### Get All Applications

```http
GET /applications?page=1&limit=10&status=submitted
```

**Headers:** Authorization required

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)
- `status`: Filter by status (draft, submitted, under_review, accepted, rejected)

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "app_123",
        "userId": "user_123",
        "status": "submitted",
        "personalInfo": {...},
        "educationalBackground": {...},
        "englishProficiency": {...},
        "universityPreferences": {...},
        "createdAt": "2024-12-10T10:00:00Z",
        "updatedAt": "2024-12-10T10:00:00Z",
        "submittedAt": "2024-12-10T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### Get Application by ID

```http
GET /applications/:id
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "userId": "user_123",
    "status": "submitted",
    "personalInfo": {...},
    "educationalBackground": {...},
    "englishProficiency": {...},
    "universityPreferences": {...},
    "documents": {...},
    "createdAt": "2024-12-10T10:00:00Z",
    "updatedAt": "2024-12-10T10:00:00Z",
    "submittedAt": "2024-12-10T11:00:00Z"
  }
}
```

#### Update Application

```http
PUT /applications/:id
```

**Headers:** Authorization required

**Request Body:** Same as Create Application

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "status": "draft",
    "updatedAt": "2024-12-10T12:00:00Z"
  }
}
```

#### Submit Application

```http
POST /applications/:id/submit
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "status": "submitted",
    "submittedAt": "2024-12-10T12:00:00Z"
  }
}
```

#### Delete Application

```http
DELETE /applications/:id
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

### Document Management

#### Upload Document

```http
POST /applications/:id/documents
```

**Headers:** 
- Authorization required
- Content-Type: multipart/form-data

**Request Body:**
```
file: [binary]
documentType: "passport" | "transcript" | "recommendation" | "statement" | "cv" | "certificate" | "financial" | "other"
description: "Optional description"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "documentId": "doc_123",
    "applicationId": "app_123",
    "documentType": "passport",
    "fileName": "passport.pdf",
    "fileSize": 1048576,
    "url": "https://storage.studyproglobal.com/documents/doc_123",
    "uploadedAt": "2024-12-10T12:00:00Z"
  }
}
```

#### Get Documents

```http
GET /applications/:id/documents
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "documentId": "doc_123",
      "documentType": "passport",
      "fileName": "passport.pdf",
      "fileSize": 1048576,
      "url": "https://storage.studyproglobal.com/documents/doc_123",
      "uploadedAt": "2024-12-10T12:00:00Z"
    }
  ]
}
```

#### Delete Document

```http
DELETE /documents/:documentId
```

**Headers:** Authorization required

**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

### Universities

#### Get Universities

```http
GET /universities?country=USA&program=Computer Science&page=1&limit=20
```

**Query Parameters:**
- `country`: Filter by country
- `program`: Filter by program
- `page`: Page number
- `limit`: Results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "universities": [
      {
        "id": "uni_123",
        "name": "Example University",
        "country": "USA",
        "city": "Boston",
        "ranking": 50,
        "programs": [...],
        "requirements": [...],
        "applicationDeadline": "2024-12-31",
        "tuitionFee": "$50,000/year"
      }
    ],
    "pagination": {...}
  }
}
```

#### Get University Details

```http
GET /universities/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uni_123",
    "name": "Example University",
    "country": "USA",
    "city": "Boston",
    "description": "...",
    "programs": [...],
    "requirements": [...],
    "applicationDeadline": "2024-12-31",
    "tuitionFee": "$50,000/year",
    "website": "https://example.edu"
  }
}
```

### Admin Endpoints

#### Update Application Status

```http
PATCH /admin/applications/:id/status
```

**Headers:** Authorization required (Admin role)

**Request Body:**
```json
{
  "status": "under_review" | "accepted" | "rejected",
  "notes": "Optional admin notes"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_123",
    "status": "under_review",
    "updatedAt": "2024-12-10T12:00:00Z"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Error Codes

- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Unauthorized access
- `VALIDATION_001`: Invalid input data
- `APP_001`: Application not found
- `APP_002`: Application already submitted
- `DOC_001`: Document upload failed
- `DOC_002`: Invalid file type
- `DOC_003`: File too large
- `SERVER_001`: Internal server error

## Rate Limiting

- Rate limit: 100 requests per minute per user
- Response header: `X-RateLimit-Remaining`
- Exceeded: HTTP 429 Too Many Requests

## Encryption

All sensitive data should be:
1. Transmitted over HTTPS/TLS 1.2+
2. Encrypted at rest using AES-256
3. Hashed passwords using bcrypt (10+ rounds)

## Webhooks (Optional)

Configure webhooks for application status updates:

```http
POST /webhooks/configure
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks",
  "events": ["application.submitted", "application.status_changed"]
}
```

## Testing

Use these test credentials in development:

```
Email: test@studyproglobal.com
Password: TestPass123
```

## Versioning

API versioning is done through URL: `/v1/`, `/v2/`, etc.

## Support

For API support, contact: api-support@studyproglobal.com
