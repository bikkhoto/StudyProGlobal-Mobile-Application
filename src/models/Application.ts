/**
 * Application Models for Study Pro Global
 * International Student University Application System
 */

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phone: string;
  currentAddress: string;
}

export interface EducationalBackground {
  highSchoolName: string;
  highSchoolCountry: string;
  graduationYear: string;
  gpa: string;
  transcriptUrl?: string;
  diplomaUrl?: string;
}

export interface EnglishProficiency {
  testType: 'TOEFL' | 'IELTS' | 'Duolingo' | 'PTE' | 'Other';
  score: string;
  testDate: string;
  certificateUrl?: string;
}

export interface UniversityPreferences {
  preferredCountries: string[];
  preferredPrograms: string[];
  degreeLevel: 'Undergraduate' | 'Graduate' | 'Postgraduate' | 'PhD';
  preferredStartDate: string;
}

export interface Documents {
  passport?: string;
  transcripts?: string[];
  recommendationLetters?: string[];
  statementOfPurpose?: string;
  cv?: string;
  englishProficiencyCertificate?: string;
  financialDocuments?: string[];
  otherDocuments?: string[];
}

export interface Application {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  educationalBackground: EducationalBackground;
  englishProficiency: EnglishProficiency;
  universityPreferences: UniversityPreferences;
  documents: Documents;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submittedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
  encryptedData?: string;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin' | 'counselor';
  createdAt: Date;
  lastLogin?: Date;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  programs: Program[];
  requirements: string[];
  applicationDeadline: string;
  tuitionFee: string;
  ranking?: number;
}

export interface Program {
  id: string;
  name: string;
  degree: string;
  duration: string;
  description: string;
  requirements: string[];
  tuitionFee: string;
}
