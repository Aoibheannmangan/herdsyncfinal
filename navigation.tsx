import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

import Land from './screens/Land';
import { Animal } from './screens/Animal';
import ToDo from './screens/ToDo';
import { BirthEvents } from './screens/BirthEvents';
import { Breeding } from './screens/Breeding';
import { Calves } from './screens/Calves';
import { Cows } from './screens/Cows';
import { Remedies } from './screens/Remedies';
import { Weight } from './screens/Weight';


export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Land: undefined;
  Animal: undefined;
  ToDo: undefined;
  BirthEvents: undefined;
  Breeding: undefined;
  Calves: undefined;
  Cows: undefined;
  Remedies: undefined;
  Weight: undefined;
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
        <Stack.Screen name="BirthEvents" component={BirthEvents} />
        <Stack.Screen name="Breeding" component={Breeding} />
        <Stack.Screen name="Calves" component={Calves} />
        <Stack.Screen name="Cows" component={Cows} />
        <Stack.Screen name="Remedies" component={Remedies} />
        <Stack.Screen name="Weight" component={Weight} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
