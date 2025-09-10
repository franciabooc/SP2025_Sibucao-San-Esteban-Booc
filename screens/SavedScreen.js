import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

// --- Component Imports ---
import Header from '../components/Header';
import ListItemCard from '../components/ListItemCard';

// --- Mock Data ---
const initialSavedItems = [
    { id: 'sv1', category: 'Rooms', title: 'JH27', description: 'JH27 is a computer-focused learning space used for technology-related learning activities.', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=JH27' } },
    { id: 'sv2', category: 'Landmarks', title: 'Chapel', description: 'The UNC Chapel is a spiritual and reflective gatherings within the university.', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Chapel' } },
    { id: 'sv3', category: 'Building', title: 'Science Building', description: 'The Science Building consists of classrooms, faculty offices, and laboratories that support science-related academic activities.', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Science+Bldg' } },
    { id: 'sv4', category: 'Landmarks', title: 'Covered Court', description: 'The UNC Covered Court is a multi-purpose facility used for student activities and sports.', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Court' } },
    { id: 'sv5', category: 'Food Stalls', title: 'Sheeshabowls', description: 'An on-campus canteen that provides basic meals and refreshments.', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Sheeshabowls' } },
];

const filters = ['Building', 'Rooms', 'Offices', 'Food Stalls', 'Landmarks'];

export default function SavedScreen() {
    const [activeFilter, setActiveFilter] = useState('Building');
    // 1. Manage the list of saved items in state
    const [savedItems, setSavedItems] = useState(initialSavedItems);

    // 2. This function removes an item from the list
    const handleRemoveBookmark = (itemIdToRemove) => {
        setSavedItems(currentItems =>
            currentItems.filter(item => item.id !== itemIdToRemove)
        );
    };

    const filteredItems = savedItems.filter(item => {
        return item.category.toLowerCase().includes(activeFilter.toLowerCase());
    });


    return (
        <View style={styles.pageContainer}>
            <Header title="Saved Locations" />

            <View style={styles.filterButtonsContainer}>
                {filters.map(filter => (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[styles.filterButtonText, activeFilter === filter && styles.activeFilterButtonText]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView>
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <ListItemCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            imageSource={item.image}
                            onPress={() => Alert.alert('Tapped on', item.title)}
                            // 3. Pass the new props to the card
                            isBookmarked={true} // It's always true on this screen
                            onBookmarkPress={() => handleRemoveBookmark(item.id)}
                        />
                    ))
                ) : (
                    <Text style={styles.noItemsText}>No saved items in this category.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    activeFilterButton: {
        backgroundColor: '#c00000',
    },
    filterButtonText: {
        color: '#000',
        fontWeight: '600',
    },
    activeFilterButtonText: {
        color: '#fff',
    },
    noItemsText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#6c757d',
    }
});

