
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple ToDo app with local storage
export default function ToDo() {
	const [items, setItems] = useState<{ text: string; checked: boolean }[]>([]);
	const [input, setInput] = useState('');

	// Load items from local storage on mount
	useEffect(() => {
		const loadItems = async () => {
			const stored = await AsyncStorage.getItem('todoItems');
			if (stored) setItems(JSON.parse(stored));
		};
		loadItems();
	}, []);

	// Save items to local storage whenever they change
	useEffect(() => {
		AsyncStorage.setItem('todoItems', JSON.stringify(items));
	}, [items]);

	// Add a new item
	const addItem = () => {
		if (input.trim()) {
			setItems([...items, { text: input.trim(), checked: false }]);
			setInput('');
		}
	};

	// Toggle checkbox
	const toggleItem = (index: number) => {
		const updated = [...items];
		updated[index].checked = !updated[index].checked;
		setItems(updated);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>To-Do List</Text>
			<View style={styles.inputRow}>
				<TextInput
					style={styles.input}
					placeholder="Add a new item"
					value={input}
					onChangeText={setInput}
				/>
				<Button title="Add" onPress={addItem} />
			</View>
			<FlatList
				data={items}
				keyExtractor={(_, i) => i.toString()}
				renderItem={({ item, index }) => (
					<TouchableOpacity style={styles.itemRow} onPress={() => toggleItem(index)}>
						<View style={[styles.checkbox, item.checked && styles.checked]}>
							{item.checked && <Text style={styles.checkmark}>✓</Text>}
						</View>
						<Text style={[styles.itemText, item.checked && styles.itemChecked]}>{item.text}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
		alignSelf: 'center',
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		marginRight: 8,
	},
	itemRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: '#007AFF',
		borderRadius: 6,
		marginRight: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	checked: {
		backgroundColor: '#007AFF',
		borderColor: '#007AFF',
	},
	checkmark: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	itemText: {
		fontSize: 18,
	},
	itemChecked: {
		textDecorationLine: 'line-through',
		color: '#aaa',
	},
});
