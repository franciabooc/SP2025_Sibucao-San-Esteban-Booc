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
    { id: 'sv1', category: 'Rooms', title: 'JH27', description: 'JH27 is a computer-focused learning space...', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=JH27' } },
    { id: 'sv2', category: 'Landmarks', title: 'Chapel', description: 'The UNC Chapel is a spiritual and reflective...', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Chapel' } },
    { id: 'sv3', category: 'Building', title: 'Science Building', description: 'The Science Building consists of classrooms...', image: { uri: 'https://placehold.co/200x200/A9A9A9/FFFFFF?text=Science+Bldg' } },
];

const filters = ['Building', 'Rooms', 'Offices', 'Food Stalls', 'Landmarks'];

// The component now accepts onProfilePress and isDarkMode as props
export default function SavedScreen({ onProfilePress, isDarkMode }) {
    const [activeFilter, setActiveFilter] = useState('Building');
    const [savedItems, setSavedItems] = useState(initialSavedItems);

    const handleRemoveBookmark = (itemIdToRemove) => {
        setSavedItems(currentItems =>
            currentItems.filter(item => item.id !== itemIdToRemove)
        );
    };

    // --- Dynamic Styles ---
    const pageContainerStyle = [
        styles.pageContainer,
        isDarkMode && { backgroundColor: '#121212' }
    ];
    const noItemsTextStyle = [
        styles.noItemsText,
        isDarkMode && { color: '#ccc' }
    ];

    const filteredItems = savedItems.filter(item => {
        return item.category.toLowerCase().includes(activeFilter.toLowerCase());
    });

    return (
        <View style={pageContainerStyle}>
            {/* The onProfilePress and isDarkMode props are passed to the Header */}
            <Header title="Saved Locations" onProfilePress={onProfilePress} isDarkMode={isDarkMode} />

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
                            isBookmarked={true}
                            onBookmarkPress={() => handleRemoveBookmark(item.id)}
                            isDarkMode={isDarkMode}
                        />
                    ))
                ) : (
                    <Text style={noItemsTextStyle}>No saved items in this category.</Text>
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

