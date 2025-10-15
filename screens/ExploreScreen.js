import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';


// --- Component Imports ---
import SearchBar from '../components/SearchBar';
import RouteInput from '../components/RouteInput';
import ListItemCard from '../components/ListItemCard';

// --- Mock Data ---
const suggestedPlace = {
    id: 'p1',
    title: 'Library',
    description: 'The UNC Library serves as a central resource hub...',
    image: require('../assets/lm-library.png') // Make sure this asset exists
};

export default function ExploreScreen({ onProfilePress, isDarkMode }) {
  // 1. Add state to control which view is visible ('map' or 'routing')
  const [currentView, setCurrentView] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');


  // --- Sub-Component for the Main Map View ---
  const MapView = () => (
    <>
      <View style={styles.mapPlaceholder} />
      <View style={styles.overlayContainer}>
        <SearchBar
          variant="map"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onProfilePress={onProfilePress}
          isDarkMode={isDarkMode}
        />
        <TouchableOpacity
          style={styles.routeButton}
          // 2. This now switches to the routing view
          onPress={() => setCurrentView('routing')}
        >
          <Image
            source={require('../assets/routing.png')}
            style={styles.routeIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  // --- Sub-Component for the Routing View ---
  const RoutingView = () => (
    <View style={styles.pageContainer}>
        <View style={styles.customHeader}>
            <TouchableOpacity onPress={() => setCurrentView('map')} style={styles.backButton}>
                <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Routing</Text>
            <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <RouteInput
                startValue={startLocation}
                onStartChange={setStartLocation}
                endValue={endLocation}
                onEndChange={setEndLocation}
            />
             <View style={styles.routeDetailsContainer}>
                <Image
                    source={{ uri: 'https://placehold.co/600x400/e0e0e0/000000?text=Map+Preview' }}
                    style={styles.mapPreview}
                />
                <View style={styles.timeEstimateContainer}>
                    <Text style={styles.timeText}>Estimated Time: 5mins</Text>
                    <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.suggestionsTitle}>Places you might want to visit</Text>
            <ListItemCard
                imageSource={suggestedPlace.image}
                title={suggestedPlace.title}
                description={suggestedPlace.description}
                isBookmarked={false}
            />
        </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 3. Conditionally render the correct view */}
      {currentView === 'map' ? <MapView /> : <RoutingView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overlayContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  routeButton: {
    position: 'absolute',
    top: 80,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeIcon: {
    width: 25,
    height: 25,
  },
  // --- Styles for Routing View ---
  pageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15,
      paddingTop: 50, // Adjust for status bar
  },
  customHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  backButton: {
      padding: 5,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  routeDetailsContainer: {
      backgroundColor: '#f9f9f9',
      borderRadius: 15,
      padding: 10,
      marginVertical: 20,
  },
  mapPreview: {
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
  },
  timeEstimateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  timeText: {
      fontSize: 16,
      fontWeight: '500',
  },
  startButton: {
      backgroundColor: '#c00000',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 20,
  },
  startButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
  },
  suggestionsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
  },
});

