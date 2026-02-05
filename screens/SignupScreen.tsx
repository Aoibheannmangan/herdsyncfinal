
// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
// AsyncStorage is used for storing user data locally
import AsyncStorage from '@react-native-async-storage/async-storage';
// useNavigation allows us to navigate between screens
import { useNavigation, NavigationProp } from '@react-navigation/native';
// Import the navigation type for type safety
import { RootStackParamList } from '../navigation';
// Import the custom button for consistent styling
import CustomButton from '../components/CustomButton';

// The SignupScreen component handles user registration
export default function SignupScreen() {
  // State variables for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // Navigation object for moving between screens
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Function to handle the sign up logic
  const handleSignup = async () => {
    // Check that all fields are filled in
    if (!name || !email || !county || !phone || !password || !repeatPassword) {
      Alert.alert('Please fill all fields');
      return;
    }
    // Check that the passwords match
    if (password !== repeatPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    // Create a user object to store
    const user = { name, email, county, phone, password };
    try {
      // Store the user data in local storage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Signup successful!');
      // Navigate to the login screen after successful signup
      navigation.navigate('Login');
    } catch (error) {
      // Show an alert if there is an error during signup
      Alert.alert('Error signing up');
    }
  };

  // Render the sign up form
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title for the sign up screen */}
      <Text style={styles.title}>Create an account</Text>
      {/* Name input field */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {/* County input field */}
      <TextInput
        style={styles.input}
        placeholder="County"
        value={county}
        onChangeText={setCounty}
      />
      {/* Phone number input field */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Always boolean literal
      />
      {/* Repeat password input field */}
      <TextInput
        style={styles.input}
        placeholder="Repeat Password"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry={true} // Always boolean literal
      />
      {/* Custom button for submitting the sign up form */}
      <CustomButton title="Sign Up" onPress={handleSignup} />
    </ScrollView>
  );
}

// Styles for the sign up screen components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Use 'center' for React Native, comment in British English
    alignItems: 'center', // Use 'center' for React Native, comment in British English
    padding: 16,
    backgroundColor: '#fff', // Use 'backgroundColor', comment in British English
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
