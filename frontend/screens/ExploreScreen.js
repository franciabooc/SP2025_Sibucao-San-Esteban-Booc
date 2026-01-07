import React, { useState, useMemo, useEffect } from 'react';
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
import InteractiveMap from '../unc_map/InteractiveMap';
import { locations, nameToNodeMap } from '../unc_map/mapSvg'; // Added nameToNodeMap import
import { BiAStar } from '../unc_map/BiAStar';
import nodesData from '../unc_map/nodes.json';

// --- 1. SUB-COMPONENTS DEFINED OUTSIDE TO FIX INPUT FOCUS BUG ---

const MapView = ({ startLocation, endLocation, paths, searchQuery, setSearchQuery, onProfilePress, isDarkMode, setCurrentView }) => (
  <View style={{ flex: 1 }}>
    {/* Pass paths to the map */}
    <InteractiveMap startNode={startLocation} endNode={endLocation} paths={paths} />
    <View style={styles.overlayContainer}>
      <SearchBar
        variant="map"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onProfilePress={onProfilePress}
        isDarkMode={isDarkMode}
      />
      <TouchableOpacity style={styles.routeButton} onPress={() => setCurrentView('routing')}>
        <Image source={require('../assets/routing.png')} style={styles.routeIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const RoutingView = ({
  setCurrentView, startLocation, setStartLocation, endLocation, setEndLocation,
  suggestions, onSelectSuggestion, setActiveInput, paths
}) => (
  <View style={styles.pageContainer}>
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => setCurrentView('map')} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Routing</Text>
      <View style={{ width: 24 }} />
    </View>

    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <RouteInput
        startValue={startLocation}
        onStartChange={setStartLocation}
        onStartFocus={() => setActiveInput('start')}
        endValue={endLocation}
        onEndChange={setEndLocation}
        onEndFocus={() => setActiveInput('end')}
      />

      {/* SEARCH SUGGESTIONS BOX */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item, index) => (
            <TouchableOpacity
              key={`suggest-${index}`}
              style={styles.suggestionItem}
              onPress={() => onSelectSuggestion(item.name)}
            >
              <Icon name="map-pin" size={14} color="#666" />
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.routeDetailsContainer}>
        <View style={styles.previewWrapper}>
          <InteractiveMap startNode={startLocation} endNode={endLocation} paths={paths} />
        </View>
        <View style={styles.timeEstimateContainer}>
          <Text style={styles.timeText}>Estimated Time: 5mins</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setCurrentView('map')}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);

// --- 2. MAIN COMPONENT ---

export default function ExploreScreen({ onProfilePress, isDarkMode }) {
  const [currentView, setCurrentView] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [paths, setPaths] = useState({ primary: [], alternative: [] });

  // 1. Calculate Paths when locations change
  useEffect(() => {
    if (startLocation && endLocation) {
      const solver = new BiAStar(nodesData);
      // findTwoPaths now automatically tests all sIds vs tIds internally
      const result = solver.findTwoPaths(startLocation, endLocation);

      if (result && result.primary.length > 0) {
        setPaths(result);
      } else {
        setPaths({ primary: [], alternative: [] });
      }
    }
  }, [startLocation, endLocation]);
  // 2. Suggestions Logic
  const suggestions = useMemo(() => {
    const currentInputText = activeInput === 'start' ? startLocation : endLocation;
    if (!currentInputText || currentInputText.length < 2) return [];

    return locations
      .filter(b => b.name.toLowerCase().includes(currentInputText.toLowerCase()))
      .slice(0, 5);
  }, [startLocation, endLocation, activeInput]);

  // 3. Selection Handler
  const handleSelectSuggestion = (name) => {
    if (activeInput === 'start') {
      setStartLocation(name);
    } else {
      setEndLocation(name);
    }
    setActiveInput(null);
  };

  return (
    <View style={styles.container}>
      {currentView === 'map' ? (
        <MapView
          startLocation={startLocation}
          endLocation={endLocation}
          paths={paths}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onProfilePress={onProfilePress}
          isDarkMode={isDarkMode}
          setCurrentView={setCurrentView}
        />
      ) : (
        <RoutingView
          setCurrentView={setCurrentView}
          startLocation={startLocation}
          setStartLocation={setStartLocation}
          endLocation={endLocation}
          setEndLocation={setEndLocation}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          setActiveInput={setActiveInput}
          paths={paths}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  overlayContainer: { position: 'absolute', top: 50, left: 0, right: 0, paddingHorizontal: 15, zIndex: 10 },
  routeButton: { position: 'absolute', top: 80, right: 15, width: 50, height: 50, borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  routeIcon: { width: 25, height: 25 },
  pageContainer: { flex: 1, backgroundColor: '#fff', padding: 15, paddingTop: 50 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  routeDetailsContainer: { backgroundColor: '#f9f9f9', borderRadius: 15, padding: 10, marginVertical: 20 },
  previewWrapper: { height: 200, borderRadius: 10, overflow: 'hidden', marginBottom: 10 },
  timeEstimateContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeText: { fontSize: 16, fontWeight: '500' },
  startButton: { backgroundColor: '#c00000', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  startButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  suggestionsBox: { backgroundColor: '#fff', borderRadius: 10, elevation: 3, marginTop: -10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  suggestionText: { marginLeft: 10, fontSize: 14, color: '#333' },
});