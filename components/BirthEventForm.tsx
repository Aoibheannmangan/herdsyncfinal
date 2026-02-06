import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const BirthEventForm = () => {
	const [date, setDate] = useState(new Date());
	const [id, setId] = useState('');
	const [gender, setGender] = useState('M');
	const [genderOpen, setGenderOpen] = useState(false);
	const [genderItems] = useState([
		{ label: 'Male', value: 'M' },
		{ label: 'Female', value: 'F' },
	]);
	const [sireBreed, setSireBreed] = useState('');
	const [calvingDifficulty, setCalvingDifficulty] = useState('1');
	const [calvingDifficultyOpen, setCalvingDifficultyOpen] = useState(false);
	const [calvingDifficultyItems] = useState([
		{ label: '1 - Normal Calving', value: '1' },
		{ label: '2 - Some Assistance', value: '2' },
		{ label: '3 - Considerable Assistance', value: '3' },
		{ label: '4 - Vet Assistance', value: '4' },
	]);
	const [size, setSize] = useState('xs');
	const [sizeOpen, setSizeOpen] = useState(false);
	const [sizeItems] = useState([
		{ label: 'XS - Extra Small', value: 'xs' },
		{ label: 'SM - Small', value: 'sm' },
		{ label: 'MD - Medium', value: 'md' },
		{ label: 'LG - Large', value: 'lg' },
		{ label: 'XL - Extra Large', value: 'xl' },
	]);
	const [calfVigour, setCalfVigour] = useState('vg');
	const [calfVigourOpen, setCalfVigourOpen] = useState(false);
	const [calfVigourItems] = useState([
		{ label: 'VG - Very Vigorous', value: 'vg' },
		{ label: 'G - Vigorous', value: 'g' },
		{ label: 'A - Average', value: 'a' },
		{ label: 'P - Lazy', value: 'p' },
		{ label: 'VP - Very Lazy/Weak', value: 'vp' },
	]);
	const [birthWeight, setBirthWeight] = useState('');
	const [comments, setComments] = useState('');

	const saveBirthEvent = async () => {
		const event = {
			date: date.toISOString().split('T')[0],
			id,
			gender,
			sireBreed,
			calvingDifficulty,
			size,
			calfVigour,
			birthWeight,
			comments,
		};
		try {
			const existing = await AsyncStorage.getItem('birthEvents');
			const events = existing ? JSON.parse(existing) : [];
			events.push(event);
			await AsyncStorage.setItem('birthEvents', JSON.stringify(events));
			Alert.alert('Saved', 'Birth event saved successfully.');
			setId('');
			setGender('M');
			setSireBreed('');
			setCalvingDifficulty('1');
			setSize('xs');
			setCalfVigour('vg');
			setBirthWeight('');
			setComments('');
			setDate(new Date());
		} catch (e) {
			Alert.alert('Error', 'Failed to save birth event.');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Date of Birth</Text>
			<View style={styles.datePickerInline}>
				<DateTimePicker
					value={date}
					mode="date"
					display="default"
					onChange={(event, selectedDate) => {
						if (event.type === 'set' && selectedDate) {
							setDate(selectedDate);
						}
					}}
					style={{ width: '100%' }}
				/>
			</View>

			<Text style={styles.label}>ID</Text>
			<TextInput style={styles.input} value={id} onChangeText={setId} placeholder="Enter ID" placeholderTextColor="#000" />

			<Text style={styles.label}>Gender</Text>
			<DropDownPicker
				open={genderOpen}
				value={gender}
				items={genderItems}
				setOpen={setGenderOpen}
				setValue={setGender}
				setItems={() => {}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				containerStyle={{ ...styles.dropdownContainer, zIndex: genderOpen ? 100 : 10 }}
				dropDownContainerStyle={{ ...styles.dropdownMenu, zIndex: genderOpen ? 100 : 10 }}
			/>

			<Text style={styles.label}>Sire Breed</Text>
			<TextInput style={styles.input} value={sireBreed} onChangeText={setSireBreed} placeholder="Enter Sire Breed" placeholderTextColor="#000" />

			<Text style={styles.label}>Calving Difficulty</Text>
			<DropDownPicker
				open={calvingDifficultyOpen}
				value={calvingDifficulty}
				items={calvingDifficultyItems}
				setOpen={setCalvingDifficultyOpen}
				setValue={setCalvingDifficulty}
				setItems={() => {}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				containerStyle={{ ...styles.dropdownContainer, zIndex: calvingDifficultyOpen ? 100 : 10 }}
				dropDownContainerStyle={{ ...styles.dropdownMenu, zIndex: calvingDifficultyOpen ? 100 : 10 }}
			/>

			<Text style={styles.label}>Size</Text>
			<DropDownPicker
				open={sizeOpen}
				value={size}
				items={sizeItems}
				setOpen={setSizeOpen}
				setValue={setSize}
				setItems={() => {}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				containerStyle={{ ...styles.dropdownContainer, zIndex: sizeOpen ? 100 : 10 }}
				dropDownContainerStyle={{ ...styles.dropdownMenu, zIndex: sizeOpen ? 100 : 10 }}
			/>

			<Text style={styles.label}>Calf Vigour</Text>
			<DropDownPicker
				open={calfVigourOpen}
				value={calfVigour}
				items={calfVigourItems}
				setOpen={setCalfVigourOpen}
				setValue={setCalfVigour}
				setItems={() => {}}
				style={styles.dropdown}
				textStyle={styles.dropdownText}
				containerStyle={{ ...styles.dropdownContainer, zIndex: calfVigourOpen ? 100 : 10 }}
				dropDownContainerStyle={{ ...styles.dropdownMenu, zIndex: calfVigourOpen ? 100 : 10 }}
			/>

			<Text style={styles.label}>Birth Weight</Text>
			<TextInput
				style={styles.input}
				value={birthWeight}
				onChangeText={setBirthWeight}
				placeholder="Enter Birth Weight"
				placeholderTextColor="#000"
				keyboardType="numeric"
			/>

			<Text style={styles.label}>Comments</Text>
			<TextInput
				style={[styles.input, { height: 60 }]}
				value={comments}
				onChangeText={setComments}
				placeholder="Enter Comments"
				placeholderTextColor="#000"
				multiline
			/>

			<TouchableOpacity style={styles.saveButton} onPress={saveBirthEvent}>
				<Text style={styles.saveButtonText}>Save</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
	},
	label: {
		fontWeight: 'bold',
		marginTop: 16,
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginBottom: 8,
		backgroundColor: '#f9f9f9',
		color: '#000',
	},
	dropdownContainer: {
		marginBottom: 8,
		zIndex: 10,
	},
	dropdown: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		backgroundColor: '#f9f9f9',
		minHeight: 36,
		zIndex: 10,
	},
	dropdownText: {
		color: '#000',
		fontSize: 16,
	},
	dropdownMenu: {
		borderWidth: 1,
		borderColor: '#ccc',
		backgroundColor: '#fff',
		zIndex: 10,
	},
	datePickerInline: {
		marginBottom: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		backgroundColor: '#f9f9f9',
		padding: 4,
		alignItems: 'center',
	},
	saveButton: {
		backgroundColor: '#007bff',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 24,
	},
	saveButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default BirthEventForm;
