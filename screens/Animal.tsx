import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// Animal screen with navigation to view or add information
export default function Animal() {
    const handleCowPress = () => {}
    const handleCalfPress = () => {}
    const handleBirthEventPress = () => {}
    const handleWeightPress = () => {}
    const handleBreedingPress = () => {}
    const handleRemediesPress = () => {}

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={handleBirthEventPress} activeOpacity={0.8}>
                <Image source={require('../assets/birthevents.png')} style={styles.imageButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleCalfPress} activeOpacity={0.8}>
                <Image source={require('../assets/calves.png')} style={styles.imageButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleCowPress} activeOpacity={0.8}>
                <Image source={require('../assets/cows.png')} style={styles.imageButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleWeightPress} activeOpacity={0.8}>
                <Image source={require('../assets/weight.png')} style={styles.imageButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleBreedingPress} activeOpacity={0.8}>
                <Image source={require('../assets/breeding.png')} style={styles.imageButton} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={handleRemediesPress} activeOpacity={0.8}>
                <Image source={require('../assets/dosing.png')} style={styles.imageButton} />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 32, // Add space at top and bottom
        alignItems: 'center',
        backgroundColor: '#fff',
        minHeight: '100%',
    },
    buttonWrapper: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    imageButton: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        borderRadius: 12,
    },
});
