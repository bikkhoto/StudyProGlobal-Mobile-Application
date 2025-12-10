/**
 * Application Detail Screen for Study Pro Global
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ApplicationService } from '../services/ApplicationService';
import { Application } from '../models/Application';

type ApplicationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ApplicationDetail'
>;
type ApplicationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ApplicationDetail'
>;

interface Props {
  navigation: ApplicationDetailScreenNavigationProp;
  route: ApplicationDetailScreenRouteProp;
}

const ApplicationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { applicationId } = route.params;
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = async () => {
    try {
      const app = await ApplicationService.getApplication(applicationId);
      setApplication(app);
    } catch (error) {
      console.error('Load application error:', error);
      Alert.alert('Error', 'Failed to load application');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!application) return;

    Alert.alert(
      'Submit Application',
      'Are you sure you want to submit this application? You will not be able to edit it after submission.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          style: 'default',
          onPress: async () => {
            try {
              await ApplicationService.submitApplication(applicationId);
              Alert.alert('Success', 'Application submitted successfully!');
              loadApplication();
            } catch (error) {
              Alert.alert('Error', error instanceof Error ? error.message : 'Failed to submit');
            }
          },
        },
      ],
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Application',
      'Are you sure you want to delete this application? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ApplicationService.deleteApplication(applicationId);
              Alert.alert('Success', 'Application deleted successfully!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete application');
            }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  if (!application) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Application not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Application Details</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(application.status) },
            ]}>
            <Text style={styles.statusText}>
              {application.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Name" value={`${application.personalInfo.firstName} ${application.personalInfo.lastName}`} />
            <InfoRow label="Date of Birth" value={application.personalInfo.dateOfBirth} />
            <InfoRow label="Nationality" value={application.personalInfo.nationality} />
            <InfoRow label="Passport" value={application.personalInfo.passportNumber} />
            <InfoRow label="Email" value={application.personalInfo.email} />
            <InfoRow label="Phone" value={application.personalInfo.phone} />
            <InfoRow label="Address" value={application.personalInfo.currentAddress} />
          </View>
        </View>

        {/* Educational Background */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educational Background</Text>
          <View style={styles.infoCard}>
            <InfoRow label="High School" value={application.educationalBackground.highSchoolName} />
            <InfoRow label="Country" value={application.educationalBackground.highSchoolCountry} />
            <InfoRow label="Graduation Year" value={application.educationalBackground.graduationYear} />
            <InfoRow label="GPA" value={application.educationalBackground.gpa} />
          </View>
        </View>

        {/* English Proficiency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>English Proficiency</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Test Type" value={application.englishProficiency.testType} />
            <InfoRow label="Score" value={application.englishProficiency.score} />
            <InfoRow label="Test Date" value={application.englishProficiency.testDate} />
          </View>
        </View>

        {/* University Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>University Preferences</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Degree Level" value={application.universityPreferences.degreeLevel} />
            <InfoRow label="Countries" value={application.universityPreferences.preferredCountries.join(', ')} />
            <InfoRow label="Programs" value={application.universityPreferences.preferredPrograms.join(', ')} />
            <InfoRow label="Start Date" value={application.universityPreferences.preferredStartDate} />
          </View>
        </View>

        {/* Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <View style={styles.infoCard}>
            <InfoRow label="Created" value={new Date(application.createdAt).toLocaleString()} />
            <InfoRow label="Last Updated" value={new Date(application.updatedAt).toLocaleString()} />
            {application.submittedAt && (
              <InfoRow label="Submitted" value={new Date(application.submittedAt).toLocaleString()} />
            )}
          </View>
        </View>

        {/* Actions */}
        {application.status === 'draft' && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Application</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete Application</Text>
            </TouchableOpacity>
          </View>
        )}

        {application.status !== 'draft' && (
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxText}>
              This application has been submitted and cannot be edited.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
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
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
  },
  actions: {
    marginTop: 10,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  infoBoxText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
});

export default ApplicationDetailScreen;
