/**
 * Application Form Screen for Study Pro Global
 * Multi-step form for university applications
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ApplicationService } from '../services/ApplicationService';
import { AuthService } from '../services/AuthService';
import {
  PersonalInfo,
  EducationalBackground,
  EnglishProficiency,
  UniversityPreferences,
} from '../models/Application';

type ApplicationFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ApplicationForm'
>;
type ApplicationFormScreenRouteProp = RouteProp<RootStackParamList, 'ApplicationForm'>;

interface Props {
  navigation: ApplicationFormScreenNavigationProp;
  route: ApplicationFormScreenRouteProp;
}

const ApplicationFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  // Educational Background
  const [highSchoolName, setHighSchoolName] = useState('');
  const [highSchoolCountry, setHighSchoolCountry] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [gpa, setGpa] = useState('');

  // English Proficiency
  const [testType, setTestType] = useState<'TOEFL' | 'IELTS' | 'Duolingo' | 'PTE' | 'Other'>('IELTS');
  const [score, setScore] = useState('');
  const [testDate, setTestDate] = useState('');

  // University Preferences
  const [preferredCountries, setPreferredCountries] = useState('');
  const [preferredPrograms, setPreferredPrograms] = useState('');
  const [degreeLevel, setDegreeLevel] = useState<'Undergraduate' | 'Graduate' | 'Postgraduate' | 'PhD'>('Undergraduate');
  const [preferredStartDate, setPreferredStartDate] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = await AuthService.getCurrentUser();
      if (!user) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      const personalInfo: PersonalInfo = {
        firstName,
        lastName,
        dateOfBirth,
        nationality,
        passportNumber,
        email,
        phone,
        currentAddress,
      };

      const educationalBackground: EducationalBackground = {
        highSchoolName,
        highSchoolCountry,
        graduationYear,
        gpa,
      };

      const englishProficiency: EnglishProficiency = {
        testType,
        score,
        testDate,
      };

      const universityPreferences: UniversityPreferences = {
        preferredCountries: preferredCountries.split(',').map(s => s.trim()),
        preferredPrograms: preferredPrograms.split(',').map(s => s.trim()),
        degreeLevel,
        preferredStartDate,
      };

      await ApplicationService.createApplication(user.id, {
        personalInfo,
        educationalBackground,
        englishProficiency,
        universityPreferences,
        documents: {},
      } as any);

      Alert.alert('Success', 'Application created successfully!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create application');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="John"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Doe"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth (YYYY-MM-DD) *</Text>
              <TextInput
                style={styles.input}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="2000-01-01"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nationality *</Text>
              <TextInput
                style={styles.input}
                value={nationality}
                onChangeText={setNationality}
                placeholder="India"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Passport Number *</Text>
              <TextInput
                style={styles.input}
                value={passportNumber}
                onChangeText={setPassportNumber}
                placeholder="A12345678"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone *</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+1234567890"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Address *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={currentAddress}
                onChangeText={setCurrentAddress}
                placeholder="123 Main St, City, Country"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Educational Background</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>High School Name *</Text>
              <TextInput
                style={styles.input}
                value={highSchoolName}
                onChangeText={setHighSchoolName}
                placeholder="ABC High School"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>High School Country *</Text>
              <TextInput
                style={styles.input}
                value={highSchoolCountry}
                onChangeText={setHighSchoolCountry}
                placeholder="USA"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Graduation Year *</Text>
              <TextInput
                style={styles.input}
                value={graduationYear}
                onChangeText={setGraduationYear}
                placeholder="2020"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>GPA *</Text>
              <TextInput
                style={styles.input}
                value={gpa}
                onChangeText={setGpa}
                placeholder="3.5"
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>English Proficiency</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Test Type *</Text>
              <View style={styles.radioGroup}>
                {['IELTS', 'TOEFL', 'Duolingo', 'PTE', 'Other'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.radioButton}
                    onPress={() => setTestType(type as any)}>
                    <View
                      style={[
                        styles.radio,
                        testType === type && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioLabel}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Score *</Text>
              <TextInput
                style={styles.input}
                value={score}
                onChangeText={setScore}
                placeholder="7.5"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Test Date (YYYY-MM-DD) *</Text>
              <TextInput
                style={styles.input}
                value={testDate}
                onChangeText={setTestDate}
                placeholder="2023-12-01"
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.stepTitle}>University Preferences</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Countries (comma-separated) *</Text>
              <TextInput
                style={styles.input}
                value={preferredCountries}
                onChangeText={setPreferredCountries}
                placeholder="USA, UK, Canada"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Programs (comma-separated) *</Text>
              <TextInput
                style={styles.input}
                value={preferredPrograms}
                onChangeText={setPreferredPrograms}
                placeholder="Computer Science, Engineering"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Degree Level *</Text>
              <View style={styles.radioGroup}>
                {['Undergraduate', 'Graduate', 'Postgraduate', 'PhD'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={styles.radioButton}
                    onPress={() => setDegreeLevel(level as any)}>
                    <View
                      style={[
                        styles.radio,
                        degreeLevel === level && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioLabel}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Start Date (YYYY-MM) *</Text>
              <TextInput
                style={styles.input}
                value={preferredStartDate}
                onChangeText={setPreferredStartDate}
                placeholder="2024-09"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[
              styles.progressStep,
              step >= s && styles.progressStepActive,
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.content}>
        {renderStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {step > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 4 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  progressContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#1e40af',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  radioGroup: {
    marginTop: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#1e40af',
    backgroundColor: '#1e40af',
  },
  radioLabel: {
    fontSize: 16,
    color: '#334155',
  },
  navigation: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1e40af',
    alignItems: 'center',
    marginRight: 8,
  },
  backButtonText: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default ApplicationFormScreen;
