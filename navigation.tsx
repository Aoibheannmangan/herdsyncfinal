import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Land from './screens/Land';
import Animal from './screens/Animal.tsx';
import ToDo from './screens/ToDo';


export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Land: undefined;
  Animal: undefined;
  ToDo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Land" component={Land} />
        <Stack.Screen name="Animal" component={Animal} />
        <Stack.Screen name="ToDo" component={ToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
