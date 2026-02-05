
// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// AsyncStorage is used for storing user data locally
import AsyncStorage from '@react-native-async-storage/async-storage';
// useNavigation allows us to navigate between screens
import { useNavigation, NavigationProp } from '@react-navigation/native';
// Import the navigation type for type safety
import { RootStackParamList } from '../navigation';
// Import the custom button type
import CustomButton from '../components/CustomButton';

// The LoginScreen component handles user login
export default function LoginScreen() {
  // State variables for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Navigation object for moving between screens
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Function to handle login logic
  const handleLogin = async () => {
    try {
      // Retrieve user data from local storage
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        // Check if entered credentials match stored user
        if (user.email === email && user.password === password) {
          // Navigate to Home screen if credentials are correct
          navigation.navigate('Home');
        } else {
          // Show alert if credentials are incorrect
          Alert.alert('Invalid credentials');
        }
      } else {
        // Show alert if no user is found in storage
        Alert.alert('No user found. Please sign up first.');
      }
    } catch (error) {
      // Show alert if there is an error during login
      Alert.alert('Error logging in');
    }
  };

  // Render the login form
  return (
    <View style={styles.container}>
      {/* Logo image, ensure logo.png exists in assets folder */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // Use 'autoCapitalize', comment in British English
        keyboardType="email-address"
      />
      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Always boolean literal
      />
      {/* Button to submit login */}
      <CustomButton title="Login" onPress={handleLogin} />
      {/* Button to navigate to the sign up screen */}
      <CustomButton title="Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

// Styles for the login screen components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Use 'center' for React Native, comment in British English
    alignItems: 'center', // Use 'center' for React Native, comment in British English
    padding: 16,
    backgroundColor: '#fff', // Use 'backgroundColor', comment in British English
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    backgroundColor: '#eee', // Use 'backgroundColor', comment in British English
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc', // Use 'borderColor', comment in British English
    borderRadius: 8,
    marginBottom: 12,
  },

});
