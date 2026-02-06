import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BirthEventForm from '../components/BirthEventForm';

export const BirthEvents = () => {
	const [events, setEvents] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const fetchEvents = async () => {
			const stored = await AsyncStorage.getItem('birthEvents');
			setEvents(stored ? JSON.parse(stored) : []);
		};
		fetchEvents();
	}, [showForm, refresh]);

	const handleFormClose = () => {
		setShowForm(false);
		setRefresh(r => !r);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Birth Events</Text>
			<TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
				<Text style={styles.addButtonText}>Add Information</Text>
			</TouchableOpacity>

			{events.length === 0 && (
				<Text style={styles.noInfo}>Currently no information</Text>
			)}

			{events.length > 0 && (
				<FlatList
					style={styles.scrollArea}
					data={events}
					keyExtractor={(_, idx) => idx.toString()}
					renderItem={({ item }: { item: {
						date: string;
						id: string;
						gender: string;
						sireBreed: string;
						calvingDifficulty: string;
						size: string;
						calfVigour: string;
						birthWeight: string;
						comments: string;
					} }) => {
						const calvingDifficultyLabels: { [key: string]: string } = {
							'1': '1 - Normal Calving',
							'2': '2 - Some Assistance',
							'3': '3 - Considerable Assistance',
							'4': '4 - Vet Assistance',
						};
						const sizeLabels: { [key: string]: string } = {
							'xs': 'XS - Extra Small',
							'sm': 'SM - Small',
							'md': 'MD - Medium',
							'lg': 'LG - Large',
							'xl': 'XL - Extra Large',
						};
						const calfVigourLabels: { [key: string]: string } = {
							'vg': 'VG - Very Vigorous',
							'g': 'G - Vigorous',
							'a': 'A - Average',
							'p': 'P - Lazy',
							'vp': 'VP - Very Lazy/Weak',
						};
						const genderLabel = item.gender === 'M' ? 'Male' : 'Female';
						const calvingDifficultyLabel = calvingDifficultyLabels[item.calvingDifficulty] || item.calvingDifficulty;
						const sizeLabel = sizeLabels[item.size] || item.size;
						const calfVigourLabel = calfVigourLabels[item.calfVigour] || item.calfVigour;
						return (
							<View style={styles.eventCard}>
								<Text>Date of Birth: {item.date}</Text>
								<Text>ID: {item.id}</Text>
								<Text>Gender: {genderLabel}</Text>
								<Text>Sire Breed: {item.sireBreed}</Text>
								<Text>Calving Difficulty: {calvingDifficultyLabel}</Text>
								<Text>Size: {sizeLabel}</Text>
								<Text>Calf Vigour: {calfVigourLabel}</Text>
								<Text>Birth Weight: {item.birthWeight}</Text>
								<Text>Comments: {item.comments}</Text>
							</View>
						);
					}}
				/>
			)}

			<Modal visible={showForm} animationType="slide">
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<BirthEventForm />
					<TouchableOpacity style={styles.closeButton} onPress={handleFormClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</ScrollView>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 16,
		alignSelf: 'center',
	},
	addButton: {
		backgroundColor: '#007bff',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	addButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	noInfo: {
		color: '#888',
		fontSize: 16,
		alignSelf: 'center',
		marginTop: 32,
	},
	scrollArea: {
		marginTop: 8,
	},
	eventCard: {
		backgroundColor: '#f2f2f2',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
	},
	closeButton: {
		backgroundColor: '#dc3545',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		margin: 16,
	},
	closeButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
