/**
 * Application Service for Study Pro Global
 * Manages university applications with automated encryption
 */

import { EncryptionService } from './EncryptionService';
import { Application } from '../models/Application';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class ApplicationService {
  private static readonly APPLICATIONS_KEY = 'applications';

  /**
   * Create a new application
   */
  static async createApplication(
    userId: string,
    applicationData: Partial<Application>,
  ): Promise<Application> {
    try {
      const application: Application = {
        id: this.generateId(),
        userId,
        personalInfo: applicationData.personalInfo!,
        educationalBackground: applicationData.educationalBackground!,
        englishProficiency: applicationData.englishProficiency!,
        universityPreferences: applicationData.universityPreferences!,
        documents: applicationData.documents || {},
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Encrypt sensitive data
      application.encryptedData = EncryptionService.encrypt(
        JSON.stringify(application),
      );

      // Store application
      await this.saveApplication(application);

      return application;
    } catch (error) {
      console.error('Create application error:', error);
      throw new Error('Failed to create application');
    }
  }

  /**
   * Update an existing application
   */
  static async updateApplication(
    applicationId: string,
    updates: Partial<Application>,
  ): Promise<Application> {
    try {
      const application = await this.getApplication(applicationId);
      
      if (!application) {
        throw new Error('Application not found');
      }

      const updatedApplication: Application = {
        ...application,
        ...updates,
        updatedAt: new Date(),
      };

      // Re-encrypt with updated data
      updatedApplication.encryptedData = EncryptionService.encrypt(
        JSON.stringify(updatedApplication),
      );

      await this.saveApplication(updatedApplication);

      return updatedApplication;
    } catch (error) {
      console.error('Update application error:', error);
      throw new Error('Failed to update application');
    }
  }

  /**
   * Submit application for review
   */
  static async submitApplication(applicationId: string): Promise<Application> {
    try {
      const application = await this.getApplication(applicationId);
      
      if (!application) {
        throw new Error('Application not found');
      }

      if (application.status !== 'draft') {
        throw new Error('Application already submitted');
      }

      // Validate required fields
      this.validateApplication(application);

      // Update status
      const submittedApplication = await this.updateApplication(applicationId, {
        status: 'submitted',
        submittedAt: new Date(),
      });

      return submittedApplication;
    } catch (error) {
      console.error('Submit application error:', error);
      throw error;
    }
  }

  /**
   * Get application by ID
   */
  static async getApplication(applicationId: string): Promise<Application | null> {
    try {
      const applications = await this.getAllApplications();
      return applications.find(app => app.id === applicationId) || null;
    } catch (error) {
      console.error('Get application error:', error);
      return null;
    }
  }

  /**
   * Get all applications for a user
   */
  static async getUserApplications(userId: string): Promise<Application[]> {
    try {
      const applications = await this.getAllApplications();
      return applications.filter(app => app.userId === userId);
    } catch (error) {
      console.error('Get user applications error:', error);
      return [];
    }
  }

  /**
   * Get all applications (for admin)
   */
  static async getAllApplications(): Promise<Application[]> {
    try {
      const data = await AsyncStorage.getItem(this.APPLICATIONS_KEY);
      
      if (!data) {
        return [];
      }

      const encryptedApplications = JSON.parse(data);
      
      // Decrypt each application
      const applications = encryptedApplications.map((encrypted: string) => {
        const decrypted = EncryptionService.decrypt(encrypted);
        return JSON.parse(decrypted);
      });

      return applications;
    } catch (error) {
      console.error('Get all applications error:', error);
      return [];
    }
  }

  /**
   * Delete application
   */
  static async deleteApplication(applicationId: string): Promise<void> {
    try {
      const applications = await this.getAllApplications();
      const filtered = applications.filter(app => app.id !== applicationId);
      
      const encrypted = filtered.map(app => 
        EncryptionService.encrypt(JSON.stringify(app))
      );
      
      await AsyncStorage.setItem(
        this.APPLICATIONS_KEY,
        JSON.stringify(encrypted),
      );
    } catch (error) {
      console.error('Delete application error:', error);
      throw new Error('Failed to delete application');
    }
  }

  /**
   * Save application to storage
   */
  private static async saveApplication(application: Application): Promise<void> {
    try {
      const applications = await this.getAllApplications();
      
      // Remove old version if exists
      const filtered = applications.filter(app => app.id !== application.id);
      
      // Add new/updated version
      filtered.push(application);
      
      // Encrypt and store
      const encrypted = filtered.map(app => 
        EncryptionService.encrypt(JSON.stringify(app))
      );
      
      await AsyncStorage.setItem(
        this.APPLICATIONS_KEY,
        JSON.stringify(encrypted),
      );
    } catch (error) {
      console.error('Save application error:', error);
      throw new Error('Failed to save application');
    }
  }

  /**
   * Validate application before submission
   */
  private static validateApplication(application: Application): void {
    const errors: string[] = [];

    // Validate personal info
    if (!application.personalInfo.firstName) {
      errors.push('First name is required');
    }
    if (!application.personalInfo.lastName) {
      errors.push('Last name is required');
    }
    if (!application.personalInfo.email) {
      errors.push('Email is required');
    }
    if (!application.personalInfo.passportNumber) {
      errors.push('Passport number is required');
    }

    // Validate educational background
    if (!application.educationalBackground.highSchoolName) {
      errors.push('High school name is required');
    }
    if (!application.educationalBackground.gpa) {
      errors.push('GPA is required');
    }

    // Validate English proficiency
    if (!application.englishProficiency.testType) {
      errors.push('English proficiency test type is required');
    }
    if (!application.englishProficiency.score) {
      errors.push('English proficiency score is required');
    }

    // Validate university preferences
    if (!application.universityPreferences.preferredCountries.length) {
      errors.push('At least one preferred country is required');
    }
    if (!application.universityPreferences.preferredPrograms.length) {
      errors.push('At least one preferred program is required');
    }

    if (errors.length > 0) {
      throw new Error('Validation failed: ' + errors.join(', '));
    }
  }

  /**
   * Generate unique ID
   */
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
