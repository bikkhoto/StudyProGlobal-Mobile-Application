/**
 * Encryption Service for Study Pro Global
 * Provides automated encryption for all sensitive data
 */

import CryptoJS from 'crypto-js';
import EncryptedStorage from 'react-native-encrypted-storage';

// SECURITY NOTE: This is a development key. In production:
// - Use environment variables for the encryption key
// - Implement proper key management (e.g., AWS KMS, Azure Key Vault)
// - Generate unique keys per user/session
// - Rotate keys regularly
// - Never commit actual production keys to version control
const ENCRYPTION_KEY = 'StudyProGlobal_SecureKey_2024';

export class EncryptionService {
  /**
   * Encrypt sensitive data using AES encryption
   */
  static encrypt(data: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt encrypted data
   */
  static decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Store encrypted data in secure storage
   */
  static async storeSecure(key: string, value: string): Promise<void> {
    try {
      const encrypted = this.encrypt(value);
      await EncryptedStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Secure storage error:', error);
      throw new Error('Failed to store data securely');
    }
  }

  /**
   * Retrieve and decrypt data from secure storage
   */
  static async retrieveSecure(key: string): Promise<string | null> {
    try {
      const encrypted = await EncryptedStorage.getItem(key);
      if (!encrypted) {
        return null;
      }
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Secure retrieval error:', error);
      throw new Error('Failed to retrieve data securely');
    }
  }

  /**
   * Clear all secure storage
   */
  static async clearSecure(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      console.error('Clear storage error:', error);
      throw new Error('Failed to clear secure storage');
    }
  }

  /**
   * Hash password using SHA256
   */
  static hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }
}
