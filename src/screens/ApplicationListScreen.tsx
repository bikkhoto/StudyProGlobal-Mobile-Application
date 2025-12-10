/**
 * Application List Screen for Study Pro Global
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AuthService } from '../services/AuthService';
import { ApplicationService } from '../services/ApplicationService';
import { Application } from '../models/Application';

type ApplicationListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ApplicationList'
>;

interface Props {
  navigation: ApplicationListScreenNavigationProp;
}

const ApplicationListScreen: React.FC<Props> = ({ navigation }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      if (!user) {
        navigation.replace('Home');
        return;
      }

      const apps = await ApplicationService.getUserApplications(user.id);
      setApplications(apps);
    } catch (error) {
      console.error('Load applications error:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {applications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No Applications Yet</Text>
            <Text style={styles.emptyStateText}>
              Start your journey by creating your first university application
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('ApplicationForm', {})}>
              <Text style={styles.createButtonText}>Create Application</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>My Applications</Text>
              <Text style={styles.headerSubtitle}>
                {applications.length} {applications.length === 1 ? 'application' : 'applications'}
              </Text>
            </View>

            {applications.map((app) => (
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

                <View style={styles.appCardBody}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Name:</Text>
                    <Text style={styles.infoValue}>
                      {app.personalInfo.firstName} {app.personalInfo.lastName}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Countries:</Text>
                    <Text style={styles.infoValue}>
                      {app.universityPreferences.preferredCountries.join(', ')}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Programs:</Text>
                    <Text style={styles.infoValue} numberOfLines={1}>
                      {app.universityPreferences.preferredPrograms.join(', ')}
                    </Text>
                  </View>
                </View>

                <View style={styles.appCardFooter}>
                  <Text style={styles.dateText}>
                    Created: {new Date(app.createdAt).toLocaleDateString()}
                  </Text>
                  {app.submittedAt && (
                    <Text style={styles.dateText}>
                      Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => navigation.navigate('ApplicationForm', {})}>
              <Text style={styles.floatingButtonText}>+ New Application</Text>
            </TouchableOpacity>
          </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  appCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  appCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  appCardBody: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    width: 80,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
  },
  appCardFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  dateText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApplicationListScreen;
