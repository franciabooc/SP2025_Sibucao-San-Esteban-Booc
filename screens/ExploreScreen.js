import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// --- Component Imports ---
import SearchBar from '../components/SearchBar';
import RoutingModal from '../components/RoutingModal'; // 1. Import the new modal component

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  // 2. Add state to control the modal's visibility
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder} />

      <View style={styles.overlayContainer}>
        <SearchBar
          variant="map"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.routeButton}
          // 3. This now opens the modal instead of showing an alert
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require('../assets/routing.png')}
            style={styles.routeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 4. Render the modal component */}
      <RoutingModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeIcon: {
    width: 25,
    height: 25,
  },
});

