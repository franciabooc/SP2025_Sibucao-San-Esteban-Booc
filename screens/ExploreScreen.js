import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Keyboard, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

// --- Shared Components ---
import SearchBar from '../components/SearchBar';
import RouteInput from '../components/RouteInput';
import FloorSwitcher from '../components/FloorSwitcher'; 
import DirectionsBox from '../components/DirectionsBox'; 
import RouteOverlay from '../components/RouteOverlay';

// --- Centralized Asset Exports Map Hub ---
import { 
  AmsF1Map, AmsF2Map, AmsF3Map, amsRouting,
  meRouting, enRouting, jhRouting, dhsRouting, hsRouting, nbRouting, scRouting, stpRouting,
  chapelRouting, libRouting, spRouting,
  DhsF1Map, EnF1Map, EnF2Map, JhF1Map, JhF2Map, MeF1Map, MeF2Map,
  CampusMap, campusRouting, campusLinks, buildingBridgeLinks,

  // User-facing selectable floor records pulled dynamically from your central index
  amsF1Data, amsF2Data, amsF3Data,
  dhsF1Data, dhsF2Data, dhsF3Data, dhsF4Data,
  enF1Data, enF2Data,
  hsF1Data, hsF2Data,
  jhF1Data, jhF2Data, jhF3Data,
  meF1Data, meF2Data,
  nbF1Data, nbF2Data, nbF3Data,
  scF1Data, scF2Data, scF3Data,
  stpF1Data, stpF2Data,
  chapelData, libData, spData 
} from '../unc_maps';

// --- Logic Modules ---
import { BiAStar } from '../unc_maps/bidirectional_a_star';
import { generateInstructions } from '../unc_maps/PathInterpreter';
import { getNodeFloor } from '../unc_maps/FloorUtils';

// Friendly outdoor locations metadata mappings
import { locations, nameToNodeMap } from '../unc_maps/campus_map';

// =========================================================================
// 1. ISOLATED SUB-COMPONENTS (FIXED: Cleaned of all un-encapsulated comments)
// =========================================================================

const MapView = ({ 
  activeBuilding, currentFloor, currentFloorPath, floorCount, setCurrentFloor, setActiveBuilding, 
  setCalculatedPath, setAlternativePath, setStartLocation, setEndLocation, currentFloorDirections,
  startLocation, endLocation, calculatedPath, alternativePath, searchQuery, setSearchQuery, 
  onProfilePress, isDarkMode, setCurrentView 
}) => (
  <View style={styles.viewContainer}>
    <ScrollView 
      maximumZoomScale={3} 
      minimumZoomScale={1}
      contentContainerStyle={styles.mapScrollContainer}
      style={{ zIndex: 1 }} 
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.canvasContainer}>
          {activeBuilding === 'campus' ? (
            <CampusMap 
              startNode={startLocation}
              endNode={endLocation}
              paths={{ primary: calculatedPath, alternative: alternativePath }}
            />
          ) : activeBuilding === 'me' ? (
            currentFloor === 2 
              ? <MeF2Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
              : <MeF1Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
          ) : activeBuilding === 'en' ? (
            currentFloor === 2 
              ? <EnF2Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
              : <EnF1Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
          ) : activeBuilding === 'jh' ? (
            currentFloor === 2 
              ? <JhF2Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
              : <JhF1Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
          ) : activeBuilding === 'dhs' ? (
            <DhsF1Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
          ) : (
            currentFloor === 3 ? <AmsF3Map width={1223} height={1078} pathCoordinates={currentFloorPath} /> :
            currentFloor === 2 ? <AmsF2Map width={1223} height={1078} pathCoordinates={currentFloorPath} /> :
            <AmsF1Map width={1223} height={1078} pathCoordinates={currentFloorPath} />
          )}
        </View>
      </ScrollView>
    </ScrollView>

    <View style={styles.overlayContainer}>
      <SearchBar
        variant="map"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onProfilePress={onProfilePress}
        isDarkMode={isDarkMode}
      />
      <TouchableOpacity style={styles.routeButton} onPress={() => setCurrentView('routing')}>
        <Icon name="navigation" size={24} color="#2196F3" />
      </TouchableOpacity>
    </View>

    {activeBuilding !== 'campus' && floorCount > 1 ? (
      <FloorSwitcher 
        currentFloor={currentFloor} 
        onFloorChange={(floor) => setCurrentFloor(floor)} 
        totalAvailableFloors={floorCount}
      />
    ) : null}

    {activeBuilding !== 'campus' ? (
      <TouchableOpacity 
        style={styles.campusResetButton}
        onPress={() => { 
          setActiveBuilding('campus'); 
          setCalculatedPath([]); 
          setAlternativePath([]);
          setStartLocation('');
          setEndLocation('');
        }}
      >
        <Icon name="map" size={18} color="#fff" />
        <Text style={styles.resetButtonText}>Exit Building</Text>
      </TouchableOpacity>
    ) : null}

    {currentFloorDirections.length > 0 ? (
      <DirectionsBox directions={currentFloorDirections} />
    ) : null}
  </View>
);

const RoutingView = ({
  setCurrentView, startLocation, setStartLocation, endLocation, setEndLocation,
  suggestions, onSelectSuggestion, setActiveInput, calculatedPath, alternativePath, onStartPress,
  fullSearchableRooms
}) => (
  <View style={styles.pageContainer}>
    <View style={styles.customHeader}>
      <TouchableOpacity onPress={() => setCurrentView('map')} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Routing Hub</Text>
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
        roomData={fullSearchableRooms}
      />

      {suggestions.length > 0 ? (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item, index) => (
            <TouchableOpacity
              key={`suggest-${index}`}
              style={styles.suggestionItem}
              onPress={() => onSelectSuggestion(item)} 
            >
              <Icon name="map-pin" size={14} color="#2196F3" />
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <View style={styles.routeDetailsContainer}>
        <View style={styles.previewWrapper}>
          <CampusMap startNode={startLocation} endNode={endLocation} paths={{ primary: calculatedPath, alternative: alternativePath }} />
        </View>
        <View style={styles.timeEstimateContainer}>
          <Text style={styles.timeText}>Estimated Travel: 5 mins</Text>
          <TouchableOpacity style={styles.startButton} onPress={onStartPress}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);

// =========================================================================
// 2. MAIN HUB COORDINATION SCREEN
// =========================================================================

export default function ExploreScreen({ onProfilePress, isDarkMode }) {
  const [currentView, setCurrentView] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  
  const [activeBuilding, setActiveBuilding] = useState('campus'); 
  const [currentFloor, setCurrentFloor] = useState(1);
  const [calculatedPath, setCalculatedPath] = useState([]);
  const [alternativePath, setAlternativePath] = useState([]);
  const [currentFloorDirections, setCurrentFloorDirections] = useState([]);
  const [isRoutingActive, setIsRoutingActive] = useState(false);

  const [startNodeId, setStartNodeId] = useState('');
  const [endNodeId, setEndNodeId] = useState('');

  // --- Search Dropdown Filter Pipeline ---
  const fullSearchableRooms = useMemo(() => {
    const allSelectableItems = [];

    const datasets = [
      amsF1Data, amsF2Data, amsF3Data,
      dhsF1Data, dhsF2Data, dhsF3Data, dhsF4Data,
      enF1Data, enF2Data,
      hsF1Data, hsF2Data,
      jhF1Data, jhF2Data, jhF3Data,
      meF1Data, meF2Data,
      nbF1Data, nbF2Data, nbF3Data,
      scF1Data, scF2Data, scF3Data,
      stpF1Data, stpF2Data,
      chapelData, libData, spData 
    ];

    datasets.forEach(floorFile => {
      if (!floorFile) return;
      const nodesMap = floorFile.nodes || floorFile;
      
      if (typeof nodesMap === 'object' && nodesMap !== null) {
        Object.keys(nodesMap).forEach(nodeId => {
          const node = nodesMap[nodeId];
          if (!node) return;

          const roomName = node.name || node.label || node.roomName || node.id;
          if (roomName) {
            const cleanId = String(nodeId).trim();
            const cleanName = String(roomName).trim();
            const lowerName = cleanName.toLowerCase();

            const isStructuralNode = 
              lowerName.startsWith('node') || 
              lowerName.startsWith('inter') ||
              lowerName.startsWith('path') ||
              lowerName.includes('entrance') ||
              lowerName.includes('exit') ||
              lowerName.includes('stairs') ||
              lowerName.includes('staircase') ||
              lowerName.includes('hallway') ||
              lowerName.includes('corridor') ||
              lowerName.includes('door') ||
              lowerName.includes('bridge') ||
              lowerName.includes('link');

            if (!isStructuralNode && !allSelectableItems.some(item => item.id === cleanId)) {
              allSelectableItems.push({
                id: cleanId,
                name: cleanName
              });
            }
          }
        });
      }
    });

    if (Array.isArray(locations)) {
      locations.forEach(loc => {
        if (loc && loc.name) {
          const cleanName = String(loc.name).trim();
          const lowerName = cleanName.toLowerCase();
          const isStructuralOutdoor = lowerName.includes('entrance') || lowerName.includes('exit');

          if (!isStructuralOutdoor && !allSelectableItems.some(item => item.name.toLowerCase() === lowerName)) {
            allSelectableItems.push({
              id: cleanName,
              name: cleanName
            });
          }
        }
      });
    }

    return allSelectableItems;
  }, [locations]);

  // --- FIXED UNIVERSAL COMPILER: Seamlessly bridges Campus index maps with Indoor text arrays ---
  const universalMasterGraph = useMemo(() => {
    const masterNodes = {};
    const masterConnections = {};
    
    // Translation tracker to map numeric indices to descriptive text IDs
    const indexToAlphaIdMap = {};

    // 1. FIRST PASS: Extract all definitions and map indices for campus routing
    if (campusRouting && typeof campusRouting === 'object') {
      const cNodes = campusRouting.nodes || {};
      Object.keys(cNodes).forEach(indexKey => {
        const nodeObj = cNodes[indexKey];
        if (nodeObj) {
          const textId = String(nodeObj.id || indexKey).trim();
          indexToAlphaIdMap[String(indexKey).trim()] = textId;
          masterNodes[textId] = nodeObj;
        }
      });
    }

    // 2. SECOND PASS: Merge connections from your campus files using the translated tracking keys
    if (campusRouting && campusRouting.connections) {
      Object.keys(campusRouting.connections).forEach(indexSrc => {
        const alphaSrc = indexToAlphaIdMap[String(indexSrc).trim()] || String(indexSrc).trim();
        const rawLinks = campusRouting.connections[indexSrc];

        if (rawLinks && typeof rawLinks === 'object') {
          if (!masterConnections[alphaSrc]) masterConnections[alphaSrc] = [];

          Object.keys(rawLinks).forEach(indexDest => {
            const alphaDest = indexToAlphaIdMap[String(indexDest).trim()] || String(indexDest).trim();
            if (!masterConnections[alphaSrc].includes(alphaDest)) {
              masterConnections[alphaSrc].push(alphaDest);
            }
          });
        }
      });
    }

    // 3. THIRD PASS: Stream in all indoor files and structural models
    const indoorSources = [
      amsRouting, dhsRouting, enRouting, hsRouting, jhRouting, meRouting, 
      nbRouting, scRouting, stpRouting, chapelRouting, libRouting, spRouting,
      amsF1Data, amsF2Data, amsF3Data, dhsF1Data, dhsF2Data, dhsF3Data, dhsF4Data,
      enF1Data, enF2Data, hsF1Data, hsF2Data, jhF1Data, jhF2Data, jhF3Data,
      meF1Data, meF2Data, nbF1Data, nbF2Data, nbF3Data, scF1Data, scF2Data, scF3Data,
      stpF1Data, stpF2Data, chapelData, libData, spData
    ];

    indoorSources.forEach(graph => {
      if (!graph) return;
      const targetDataset = graph.nodes || graph;
      if (!targetDataset) return;

      if (Array.isArray(targetDataset)) {
        targetDataset.forEach(node => {
          if (!node) return;
          const rawId = node.id || node.nodeId || node.key;
          if (!rawId) return;

          const cleanNodeId = String(rawId).trim();
          if (!masterNodes[cleanNodeId]) masterNodes[cleanNodeId] = node;

          const links = node.connectedTo || node.connections || node.edges;
          if (Array.isArray(links)) {
            if (!masterConnections[cleanNodeId]) masterConnections[cleanNodeId] = [];

            links.forEach(linkTarget => {
              if (!linkTarget) return;
              const cleanLink = String(linkTarget).trim();
              
              if (!masterConnections[cleanNodeId].includes(cleanLink)) {
                masterConnections[cleanNodeId].push(cleanLink);
              }
              if (!masterConnections[cleanLink]) masterConnections[cleanLink] = [];
              if (!masterConnections[cleanLink].includes(cleanNodeId)) {
                masterConnections[cleanLink].push(cleanNodeId);
              }
            });
          }
        });
      }
      else if (typeof targetDataset === 'object') {
        Object.keys(targetDataset).forEach(nodeId => {
          const node = targetDataset[nodeId];
          if (!node) return;

          const cleanNodeId = String(nodeId).trim();
          if (!masterNodes[cleanNodeId]) masterNodes[cleanNodeId] = node;

          const links = node.connectedTo || node.connections || node.edges;
          if (Array.isArray(links)) {
            if (!masterConnections[cleanNodeId]) masterConnections[cleanNodeId] = [];

            links.forEach(linkTarget => {
              if (!linkTarget) return;
              const cleanLink = String(linkTarget).trim();
              
              if (!masterConnections[cleanNodeId].includes(cleanLink)) {
                masterConnections[cleanNodeId].push(cleanLink);
              }
              if (!masterConnections[cleanLink]) masterConnections[cleanLink] = [];
              if (!masterConnections[cleanLink].includes(cleanNodeId)) {
                masterConnections[cleanLink].push(cleanNodeId);
              }
            });
          }
        });
      }
    });

    // 4. FOURTH PASS: Inject your manual cross-building linkages array maps
    const processManualLinks = (linksArray) => {
      if (Array.isArray(linksArray)) {
        linksArray.forEach(link => {
          if (link && link.start && link.end) {
            const s = String(link.start).trim();
            const e = String(link.end).trim();

            if (!masterConnections[s]) masterConnections[s] = [];
            if (!masterConnections[e]) masterConnections[e] = [];

            if (!masterConnections[s].includes(e)) masterConnections[s].push(e);
            if (!masterConnections[e].includes(s)) masterConnections[e].push(s);
          }
        });
      }
    };

    processManualLinks(campusLinks);
    processManualLinks(buildingBridgeLinks);

    return { nodes: masterNodes, connections: masterConnections };
  }, [campusRouting]);

  const suggestions = useMemo(() => {
    const currentInputText = activeInput === 'start' ? startLocation : endLocation;
    if (!currentInputText || currentInputText.trim().length === 0) return [];
    
    const lowerText = currentInputText.toLowerCase();
    return fullSearchableRooms
      .filter(room => {
        const nameMatch = room.name && room.name.toLowerCase().includes(lowerText);
        const idMatch = room.id && room.id.toLowerCase().includes(lowerText);
        return nameMatch || idMatch;
      })
      .slice(0, 5); 
  }, [startLocation, endLocation, activeInput, fullSearchableRooms]);

  const getActiveGraph = () => {
    if (activeBuilding === 'me') return meRouting;
    if (activeBuilding === 'en') return enRouting;
    if (activeBuilding === 'jh') return jhRouting;
    if (activeBuilding === 'dhs') return dhsRouting;
    if (activeBuilding === 'campus') return campusRouting;
    return amsRouting; 
  };

  const selectSmartEntrance = (buildingName) => {
    if (!buildingName) return "";
    const clean = buildingName.trim();
    const nodes = nameToNodeMap[clean];
    return nodes && nodes.length > 0 ? nodes[0] : clean;
  };

  useEffect(() => {
    const targetQuery = (startLocation + "_" + endLocation + "_" + searchQuery).toLowerCase();
    if (targetQuery.includes('me')) setActiveBuilding('me');
    else if (targetQuery.includes('en')) setActiveBuilding('en');
    else if (targetQuery.includes('jh')) setActiveBuilding('jh');
    else if (targetQuery.includes('dhs')) setActiveBuilding('dhs');
    else if (targetQuery.includes('ams')) setActiveBuilding('ams');
    else if (!startLocation && !endLocation) setActiveBuilding('campus');
  }, [startLocation, endLocation, searchQuery]);

  useEffect(() => {
    if (calculatedPath.length === 0) {
      setCurrentFloorDirections([]);
      return;
    }

    if (activeBuilding === 'campus') {
      setCurrentFloorDirections(generateInstructions(calculatedPath, campusRouting));
      return;
    }

    const currentFloorNodes = calculatedPath.filter(node => getNodeFloor(node) === currentFloor);
    if (currentFloorNodes.length === 0) {
      setCurrentFloorDirections([]);
      return;
    }

    let steps = generateInstructions(currentFloorNodes, getActiveGraph());
    const isMultiFloor = calculatedPath.some(n => getNodeFloor(n) !== currentFloor);

    if (isMultiFloor) {
      if (currentFloor === 1) {
        steps.push("Path continues upstairs. Please switch to Level 2 (L2) to follow directions.");
      } else if (currentFloor === 2) {
        steps.unshift("Proceeding from Level 1 stairs up to the second floor platform context.");
      }
    }
    setCurrentFloorDirections(steps);
  }, [currentFloor, calculatedPath, activeBuilding]);

  const handleStartRouting = () => {
    Keyboard.dismiss();
    if (!startLocation || !endLocation) {
      Alert.alert("Missing Input Fields", "Please populate both positions.");
      return;
    }

    const startId = startNodeId || selectSmartEntrance(startLocation);
    const endId = endNodeId || selectSmartEntrance(endLocation);

    console.log("=== RUNNING PATHFINDER ===");
    console.log("Start Node ID:", startId, "Connections:", universalMasterGraph.connections[startId]);
    console.log("End Node ID:", endId, "Connections:", universalMasterGraph.connections[endId]);
    console.log("==========================");

    const pathfinder = new BiAStar(universalMasterGraph);
    const result = pathfinder.findTwoPaths(startId, endId);

    if (result.primary && result.primary.length > 0) {
      setCalculatedPath(result.primary);
      setAlternativePath(result.alternative || []);
      
      if (activeBuilding !== 'campus') {
        setCurrentFloor(getNodeFloor(result.primary[0]) || 1);
      }
      setIsRoutingActive(true);
      setCurrentView('map');
    } else {
      Alert.alert("Navigation Blocked", "No path could be calculated between these two points. Please check node linkages.");
    }
  };

  const handleSelectSuggestion = (item) => {
    if (activeInput === 'start') {
      setStartLocation(item.name);
      setStartNodeId(item.id); 
    } else {
      setEndLocation(item.name);
      setEndNodeId(item.id); 
    }
    setActiveInput(null);
  };

  const handleReset = () => {
    setStartLocation('');
    setEndLocation('');
    setStartNodeId('');
    setEndNodeId('');
    setCalculatedPath([]);
    setAlternativePath([]);
    setIsRoutingActive(false);
    setActiveBuilding('campus');
  };

  let floorCount = 1;
  if (activeBuilding === 'ams') floorCount = 3;
  else if (['me', 'en', 'jh'].includes(activeBuilding)) floorCount = 2;

  const currentFloorPath = calculatedPath.filter(node => getNodeFloor(node) === currentFloor);

  return (
    <View style={[styles.container, isDarkMode && { backgroundColor: '#121212' }]}>
      {currentView === 'map' ? (
        <MapView
          activeBuilding={activeBuilding}
          currentFloor={currentFloor}
          currentFloorPath={currentFloorPath}
          floorCount={floorCount}
          setCurrentFloor={setCurrentFloor}
          setActiveBuilding={setActiveBuilding}
          setCalculatedPath={setCalculatedPath}
          setAlternativePath={setAlternativePath}
          setStartLocation={setStartLocation}
          setEndLocation={setEndLocation}
          currentFloorDirections={currentFloorDirections}
          startLocation={startLocation}
          endLocation={endLocation}
          calculatedPath={calculatedPath}
          alternativePath={alternativePath}
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
          calculatedPath={calculatedPath}
          alternativePath={alternativePath}
          onStartPress={handleStartRouting}
          fullSearchableRooms={fullSearchableRooms}
        />
      )}

      {isRoutingActive ? (
        <RouteOverlay
          startLocation={startLocation}
          endLocation={endLocation}
          onReset={handleReset}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  viewContainer: { flex: 1 },
  overlayContainer: { position: 'absolute', top: 50, left: 0, right: 0, paddingHorizontal: 15, zIndex: 10 },
  routeButton: { position: 'absolute', top: 12, right: 25, width: 48, height: 48, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5, zIndex: 99 },
  
  canvasContainer: { padding: 10, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  mapScrollContainer: { minWidth: '100%', minHeight: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
  
  campusResetButton: { position: 'absolute', bottom: 40, left: 20, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#333', borderRadius: 20, flexDirection: 'row', alignItems: 'center', zIndex: 95, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 4 },
  resetButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
  
  pageContainer: { flex: 1, backgroundColor: '#fff', padding: 15, paddingTop: 50 },
  customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  routeDetailsContainer: { backgroundColor: '#f9f9f9', borderRadius: 15, padding: 10, marginVertical: 20, borderWidth: 1, borderColor: '#eee' },
  previewWrapper: { height: 200, borderRadius: 10, overflow: 'hidden', marginBottom: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  timeEstimateContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  timeText: { fontSize: 15, fontWeight: '600', color: '#444' },
  startButton: { backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  startButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  suggestionsBox: { backgroundColor: '#fff', borderRadius: 10, elevation: 4, marginTop: -5, marginBottom: 15, borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, zIndex: 999 },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  suggestionText: { marginLeft: 12, fontSize: 14, color: '#333', fontWeight: '500' },
});