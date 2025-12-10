/**
 * Dashboard Screen for Study Pro Global
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AuthService } from '../services/AuthService';
import { ApplicationService } from '../services/ApplicationService';
import { User, Application } from '../models/Application';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const currentUser = await AuthService.getCurrentUser();
    if (!currentUser) {
      navigation.replace('Home');
      return;
    }
    setUser(currentUser);

    const userApps = await ApplicationService.getUserApplications(currentUser.id);
    setApplications(userApps);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            navigation.replace('Home');
          },
        },
      ],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#94a3b8';
      case 'submitted':
        return '#3b82f6';
      case 'under_review':
        return '#f59e0b';
      case 'accepted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.firstName} {user?.lastName}!
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{applications.length}</Text>
            <Text style={styles.statLabel}>Total Applications</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {applications.filter(a => a.status === 'submitted').length}
            </Text>
            <Text style={styles.statLabel}>Submitted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {applications.filter(a => a.status === 'accepted').length}
            </Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ApplicationForm', {})}>
            <Text style={styles.actionButtonIcon}>📝</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonTitle}>New Application</Text>
              <Text style={styles.actionButtonText}>
                Start a new university application
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ApplicationList')}>
            <Text style={styles.actionButtonIcon}>📋</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonTitle}>My Applications</Text>
              <Text style={styles.actionButtonText}>
                View and manage your applications
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Applications */}
        {applications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            {applications.slice(0, 3).map((app) => (
              <TouchableOpacity
                key={app.id}
                style={styles.appCard}
                onPress={() =>
                  navigation.navigate('ApplicationDetail', {
                    applicationId: app.id,
                  })
                }>
                <View style={styles.appCardHeader}>
                  <Text style={styles.appCardTitle}>
                    {app.universityPreferences.degreeLevel} Application
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(app.status) },
                    ]}>
                    <Text style={styles.statusText}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.appCardText}>
                  Countries: {app.universityPreferences.preferredCountries.join(', ')}
                </Text>
                <Text style={styles.appCardDate}>
                  Created: {new Date(app.createdAt).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {applications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No Applications Yet</Text>
            <Text style={styles.emptyStateText}>
              Start your journey by creating your first university application
            </Text>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  logoutText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionButtonContent: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  appCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  appCardText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  appCardDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default DashboardScreen;
