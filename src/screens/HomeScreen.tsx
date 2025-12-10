/**
 * Home Screen for Study Pro Global
 * Landing page for the application
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AuthService } from '../services/AuthService';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const authenticated = await AuthService.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      navigation.replace('Dashboard');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Study Pro Global</Text>
          <Text style={styles.subtitle}>
            Official Global Mobile Application
          </Text>
          <Text style={styles.description}>
            Fully Functional Automated Encrypted System for University
            Applications for International Students
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureTitle}>Secure & Encrypted</Text>
            <Text style={styles.featureText}>
              All your data is encrypted and stored securely
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureTitle}>Global Universities</Text>
            <Text style={styles.featureText}>
              Apply to universities worldwide from one platform
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Automated Process</Text>
            <Text style={styles.featureText}>
              Streamlined application process with automated tracking
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureTitle}>Complete Management</Text>
            <Text style={styles.featureText}>
              Manage all your applications in one place
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Trusted by thousands of international students worldwide
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  features: {
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  actions: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

export default HomeScreen;
