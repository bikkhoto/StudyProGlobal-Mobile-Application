/**
 * App Navigator for Study Pro Global
 * Handles navigation between screens
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import ApplicationListScreen from '../screens/ApplicationListScreen';
import ApplicationDetailScreen from '../screens/ApplicationDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  ApplicationForm: { applicationId?: string };
  ApplicationList: undefined;
  ApplicationDetail: { applicationId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e40af',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Study Pro Global' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationFormScreen}
          options={{ title: 'Application Form' }}
        />
        <Stack.Screen
          name="ApplicationList"
          component={ApplicationListScreen}
          options={{ title: 'My Applications' }}
        />
        <Stack.Screen
          name="ApplicationDetail"
          component={ApplicationDetailScreen}
          options={{ title: 'Application Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
