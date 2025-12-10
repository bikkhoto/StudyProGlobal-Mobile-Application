/**
 * Authentication Service for Study Pro Global
 * Handles user authentication with encrypted storage
 */

import { EncryptionService } from './EncryptionService';
import { User } from '../models/Application';

export class AuthService {
  private static readonly USER_KEY = 'current_user';
  private static readonly TOKEN_KEY = 'auth_token';

  /**
   * Register a new user
   */
  static async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    try {
      // Hash password
      const passwordHash = EncryptionService.hashPassword(password);

      // Create user object
      const user: User = {
        id: this.generateId(),
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'student',
        createdAt: new Date(),
      };

      // Store user data securely
      await EncryptionService.storeSecure(
        `user_${user.id}`,
        JSON.stringify(user),
      );

      // Store email to ID mapping for login
      await EncryptionService.storeSecure(
        `email_${email}`,
        user.id,
      );

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    }
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<User> {
    try {
      // Get user ID from email
      const userId = await EncryptionService.retrieveSecure(`email_${email}`);
      
      if (!userId) {
        throw new Error('User not found');
      }

      // Get user data
      const userData = await EncryptionService.retrieveSecure(`user_${userId}`);
      
      if (!userData) {
        throw new Error('User data not found');
      }

      const user: User = JSON.parse(userData);

      // Verify password
      const passwordHash = EncryptionService.hashPassword(password);
      
      if (passwordHash !== user.passwordHash) {
        throw new Error('Invalid password');
      }

      // Update last login
      user.lastLogin = new Date();
      await EncryptionService.storeSecure(`user_${userId}`, JSON.stringify(user));

      // Store current user
      await EncryptionService.storeSecure(this.USER_KEY, JSON.stringify(user));

      // Generate and store token
      const token = this.generateToken(user);
      await EncryptionService.storeSecure(this.TOKEN_KEY, token);

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await EncryptedStorage.removeItem(this.USER_KEY);
      await EncryptedStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  }

  /**
   * Get current logged-in user
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await EncryptionService.retrieveSecure(this.USER_KEY);
      
      if (!userData) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await EncryptionService.retrieveSecure(this.TOKEN_KEY);
      return token !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate unique ID
   */
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Generate authentication token
   */
  private static generateToken(user: User): string {
    const tokenData = {
      userId: user.id,
      email: user.email,
      timestamp: Date.now(),
    };
    return EncryptionService.encrypt(JSON.stringify(tokenData));
  }
}

// Fix import issue
import EncryptedStorage from 'react-native-encrypted-storage';
