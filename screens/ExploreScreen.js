import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, Keyboard, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

// Components
import SearchBar from '../components/SearchBar';
import RouteInput from '../components/RouteInput';
import ListItemCard from '../components/ListItemCard';
import FloorSwitcher from '../components/FloorSwitcher'; 
import DirectionsBox from '../components/DirectionsBox'; 

// Maps
import AMSFloor1 from '../unc_maps/ams_building/ams_floor1'; 
import AMSFloor2 from '../unc_maps/ams_building/ams_floor2';

// Logic
import { BiAStar } from '../unc_maps/bidirectional_a_star';
import graphData from '../unc_maps/nodes_and_connections.json';
import { generateInstructions } from '../unc_maps/PathInterpreter';
import { getNodeFloor } from '../unc_maps/FloorUtils';

const suggestedPlace = {
  id: 'p1',
  title: 'Library',
  description: 'The UNC Library serves as a central resource hub for students and faculty.',
  image: require('../assets/lm-library.png') 
};

export default function ExploreScreen({ onProfilePress, isDarkMode }) {
  const [currentView, setCurrentView] = useState('map');
  const [currentFloor, setCurrentFloor] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Routing State
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [calculatedPath, setCalculatedPath] = useState([]);
  
  //Update directions dynamically based on the floor
  const [currentFloorDirections, setCurrentFloorDirections] = useState([]);

  // --- HELPER: Smart Search ---
  const findNodeIdByName = (inputText) => {
    if (!inputText) return null;
    const lowerText = inputText.toLowerCase().trim();
    const nodes = Object.values(graphData.nodes);

    const exactNameMatch = nodes.find(n => n.name && n.name.toLowerCase() === lowerText);
    if (exactNameMatch) return exactNameMatch.id;

    const exactIdMatch = nodes.find(n => n.id.toLowerCase() === lowerText);
    if (exactIdMatch) return exactIdMatch.id;

    const partialMatch = nodes.find(n => 
        (n.name && n.name.toLowerCase().includes(lowerText)) ||
        n.id.toLowerCase().includes(lowerText)
    );
    return partialMatch ? partialMatch.id : null;
  };

  // --- EFFECT: Update Directions when Floor or Path Changes ---
  useEffect(() => {
    if (calculatedPath.length === 0) {
        setCurrentFloorDirections([]);
        return;
    }

    // 1. Get nodes strictly for the current floor
    const floorNodes = calculatedPath.filter(node => getNodeFloor(node) === currentFloor);

    // 2. If no nodes on this floor, show empty
    if (floorNodes.length === 0) {
        setCurrentFloorDirections([]);
        return;
    }

    // 3. Generate text instructions for THIS segment only
    let steps = generateInstructions(floorNodes);

    // 4. Add Contextual "Pause/Resume" Messages
    const isMultiFloor = calculatedPath.some(n => getNodeFloor(n) !== currentFloor);
    
    if (isMultiFloor) {
        // CASE: We are on Floor 1, going to Floor 2
        if (currentFloor === 1) {
             // Check if the last node on this floor is a stair
             const lastNodeId = floorNodes[floorNodes.length - 1].id || floorNodes[floorNodes.length - 1];
             if (lastNodeId.includes('stair')) {
                 steps.push("You have reached the stairs. Please switch to Level 2 (L2) to continue.");
             }
        } 
        // CASE: We are on Floor 2, coming from Floor 1
        else if (currentFloor === 2) {
             // Check if the first node on this floor is a stair
             const firstNodeId = floorNodes[0].id || floorNodes[0];
             if (firstNodeId.includes('stair')) {
                 steps.unshift("Continued from Level 1. Proceed from the stairs.");
             }
             
             // Add arrival message if this is the final destination
             const endNodeId = findNodeIdByName(endLocation);
             // Simple check if the last node in our current path is the actual end destination
             const lastPathNode = floorNodes[floorNodes.length - 1];
             const lastPathId = lastPathNode.id || lastPathNode;
             
             if (lastPathId === endNodeId) {
                 // FIX: changed endId to endNodeId
                 const destinationName = graphData.nodes[endNodeId]?.name || "your destination";
                 steps.push(`You have arrived at ${destinationName}.`);
             }
        }
    } else {
        // Single floor navigation - standard arrival message
        const lastNode = calculatedPath[calculatedPath.length - 1];
        const lastId = lastNode.id || lastNode;
        if (floorNodes[floorNodes.length -1] === lastNode) {
             steps[steps.length - 1] = `You have arrived at destination.`;
        }
    }

    setCurrentFloorDirections(steps);

  }, [currentFloor, calculatedPath]); // Re-run whenever floor or path changes


  // --- ACTION: Start Button Pressed ---
  const handleStartNavigation = () => {
    Keyboard.dismiss();

    if (!startLocation || !endLocation) {
      Alert.alert("Missing Info", "Please enter both a Start and End location.");
      return;
    }

    const startId = findNodeIdByName(startLocation);
    const endId = findNodeIdByName(endLocation);

    if (!startId || !endId) {
      Alert.alert("Location Not Found", `We couldn't find one of the locations.`);
      return;
    }

    const pathfinder = new BiAStar(graphData);
    const result = pathfinder.findTwoPaths(startId, endId);

    if (result.primary && result.primary.length > 0) {
      setCalculatedPath(result.primary);
      
      // Auto-switch to the floor where the path STARTS
      const startFloor = getNodeFloor(result.primary[0]);
      setCurrentFloor(startFloor);
      setCurrentView('map'); 

    } else {
      Alert.alert("No Path", "There is no walkable path between these two points.");
    }
  };

  // --- RENDER FUNCTION: Map View ---
  const renderMapView = () => {
    const allRooms = Object.values(graphData.nodes).filter(node => node.name).map(n => ({ id: n.id, name: n.name }));

    // Filter path strictly for visual drawing
    const currentFloorPath = calculatedPath.filter(node => getNodeFloor(node) === currentFloor);

    return (
      <View style={styles.container}>
        
        {/* SEARCH BAR */}
        <View style={{ zIndex: 100, position: 'absolute', top: 50, left: 20, right: 20 }}>
            <SearchBar 
                variant="map" 
                value={searchQuery} 
                onChangeText={setSearchQuery} 
                onProfilePress={onProfilePress}
                roomData={allRooms} 
                onSelectResult={(item) => {
                    setStartLocation(item.name); 
                    setCurrentView('routing');   
                }}
            />
        </View>

        {/* FLOOR SWITCHER */}
        <FloorSwitcher 
            currentFloor={currentFloor} 
            onFloorChange={setCurrentFloor} 
        />

        {/* ROUTE BUTTON */}
        <TouchableOpacity
          style={styles.routeButton}
          onPress={() => setCurrentView('routing')}
        >
          <Image source={require('../assets/routing.png')} style={styles.routeIcon} />
        </TouchableOpacity>

        {/* DIRECTIONS BOX */}
        <DirectionsBox 
            directions={currentFloorDirections} 
            calculatedPath={calculatedPath} 
            currentFloor={currentFloor} 
        />

        {/* MAP BACKGROUND */}
        <ScrollView 
          maximumZoomScale={3} 
          minimumZoomScale={1}
          contentContainerStyle={styles.mapScrollContainer}
          style={{ zIndex: 1 }} 
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.mapContainer}>
                    {currentFloor === 1 ? (
                   <AMSFloor1 
                       width={1200} 
                       height={600} 
                       pathCoordinates={currentFloorPath} 
                   />
               ) : (
                   <AMSFloor2 
                       width={1200} 
                       height={600} 
                       pathCoordinates={currentFloorPath} 
                   />
               )}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  };

  // --- RENDER FUNCTION: Routing View ---
  const renderRoutingView = () => {
    const allRooms = Object.values(graphData.nodes).filter(node => node.name);

    // Filter path strictly for visual drawing in the preview
    const currentFloorPath = calculatedPath.filter(node => getNodeFloor(node) === currentFloor);

    return (
      <View style={[styles.pageContainer, isDarkMode && { backgroundColor: '#121212' }]}>
          <View style={styles.customHeader}>
              <TouchableOpacity onPress={() => setCurrentView('map')} style={styles.backButton}>
                  <Icon name="arrow-left" size={24} color={isDarkMode ? "#fff" : "#000"} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, isDarkMode && {color: '#fff'}]}>Routing</Text>
              <View style={{ width: 24 }} />
          </View>

          <View style={{ zIndex: 20 }}> 
              <RouteInput
                  startValue={startLocation}
                  onStartChange={setStartLocation}
                  endValue={endLocation}
                  onEndChange={setEndLocation}
                  roomData={allRooms}
              />
          </View>

          <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}>
              <View style={[styles.routeDetailsContainer, isDarkMode && { backgroundColor: '#1e1e1e', borderColor: '#333' }]}>
                  <View style={styles.mapPreviewFallback}>
                      {currentFloor === 1 ? <AMSFloor1 width={300} height={150} pathCoordinates={currentFloorPath} /> : <AMSFloor2 width={300} height={150} pathCoordinates={currentFloorPath} />}
                  </View>
                  <View style={styles.timeEstimateContainer}>
                      <Text style={[styles.timeText, isDarkMode && { color: '#fff' }]}>Estimated Time: 5mins</Text>
                      <TouchableOpacity style={styles.startButton} onPress={handleStartNavigation}>
                          <Text style={styles.startButtonText}>Start</Text>
                      </TouchableOpacity>
                  </View>
              </View>

              <Text style={[styles.suggestionsTitle, isDarkMode && { color: '#fff' }]}>Suggested Places</Text>
              <ListItemCard
                  imageSource={suggestedPlace.image}
                  title={suggestedPlace.title}
                  description={suggestedPlace.description}
                  isBookmarked={false}
              />
          </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentView === 'map' ? renderMapView() : renderRoutingView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  mapScrollContainer: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
  mapContainer: { padding: 50, backgroundColor: '#fff' },
  
  routeButton: { 
    position: 'absolute', top: 110, right: 15, width: 55, height: 55, 
    borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', 
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6, zIndex: 90
  },
  routeIcon: { width: 28, height: 28 },

  pageContainer: { flex: 1, backgroundColor: '#fff', padding: 15, paddingTop: 50 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  routeDetailsContainer: { backgroundColor: '#f9f9f9', borderRadius: 15, padding: 15, marginVertical: 20, borderWidth: 1, borderColor: '#eee' },
  mapPreviewFallback: { height: 150, backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  timeEstimateContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeText: { fontSize: 16, fontWeight: '500' },
  startButton: { backgroundColor: '#c00000', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  startButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  suggestionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
});