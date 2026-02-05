import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {

    const handleAnimalPress = () => {

    }

    const handleToDoPress = () => {}

    const handleLandPress = () => {}


  return (
    <View style={styles.container}>
      {/* Button for land */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleLandPress} activeOpacity={0.8}>
        <Image source={require('../assets/land.png')} style={styles.imageButton} />
      </TouchableOpacity>

      {/* Button for animal */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleAnimalPress} activeOpacity={0.8}>
        <Image source={require('../assets/animal.png')} style={styles.imageButton} />
      </TouchableOpacity>

      {/* Button for to-do */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleToDoPress} activeOpacity={0.8}>
        <Image source={require('../assets/todo.png')} style={styles.imageButton} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '90%', // Button stretches almost full width
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden', // Ensures image corners are rounded
  },
  imageButton: {
    width: '100%', // Image fills button width
    height: 160, // Increased height for better visibility
    resizeMode: 'cover',
    borderRadius: 12,
  },
});
