import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

// --- Component Imports ---
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import ListItemCard from '../components/ListItemCard';
import BuildingListItem from '../components/BuildingListItem';

// --- Local Image Imports ---
import buildingImage from '../assets/category-buildings.png';
import landmarksImage from '../assets/category-landmarks.png';
import foodStallsImage from '../assets/category-food-stalls.png';
import foundersMonumentImage from '../assets/lm-fm.png';
import doloresSisonMonumentImage from '../assets/lm-dhs.png';
import museumImage from '../assets/lm-museum.png';
import chapelImage from '../assets/lm-chapel.png';
import libraryImage from '../assets/lm-library.png';
import sportsPalaceImage from '../assets/lm-sp.png';
import sheeshabowlsImage from '../assets/fs-sheesh.png';

// --- Mock Data ---
const categories = [
  { id: '1', title: 'Buildings', image: buildingImage },
  { id: '2', title: 'Landmarks', image: landmarksImage },
  { id: '3', title: 'Food Stalls', image: foodStallsImage },
];
const buildingList = [
    { id: 'b1', name: 'AMS Building'}, { id: 'b2', name: 'JH Building'},
    { id: 'b3', name: 'ME Building'}, { id: 'b4', name: 'EN Building'},
    { id: 'b5', name: 'SC Building'}, { id: 'b6', name: 'HS Building'},
    { id: 'b7', name: 'NB Building'}, { id: 'b8', name: 'DHS Building'},
    { id: 'b9', name: 'Covered Court'},
];
const buildingRooms = [
    { id: 'r1', title: 'JH-1a', floor: '1st Floor', description: 'JH-1a serves as the resource stock room where various academic and instructional materials are stored.', image: { uri: 'https://placehold.co/200x200/cccccc/000000?text=Room' } },
    { id: 'r2', title: 'JH-1b', floor: '1st Floor', description: 'JH-1B houses the Purchasing Office which manages procurement and supply-related transactions for the university.', image: { uri: 'https://placehold.co/200x200/cccccc/000000?text=Room' } },
];
const landmarkList = [
    { id: 'l1', title: 'Founder\'s Monument', description: 'This monument is associated with Dr. Jaime Hernandez Sr., who is recognized as the founder of UNC.', image: foundersMonumentImage },
    { id: 'l2', title: 'Dolores Hernandez Sison Monument', description: 'Dolores Sison served as an Assemblywoman for Region V and was a key figure in the Interim Batasang Pambansa (1978-1984).', image: doloresSisonMonumentImage },
    { id: 'l3', title: 'Museum', description: 'The UNC Museum first opened in October 1999 and is considered the first school-based museum in the Bicol region.', image: museumImage },
    { id: 'l4', title: 'Chapel', description: 'The UNC Chapel is a spiritual and service-oriented space used for religious services, special events, and reflective gatherings.', image: chapelImage },
    { id: 'l5', title: 'Library', description: 'The UNC Library serves as a central resource hub that supports the academic and research needs of students and faculty.', image: libraryImage },
    { id: 'l6', title: 'Sports Palace', description: 'The UNC Sports Palace is a multi-purpose facility used for student activities and sports.', image: sportsPalaceImage },
];
const foodStallList = [
    { id: 'fs1', title: 'Sheeshabowls', description: 'It is an on-campus canteen that provides basic meals and refreshments for both students and staff.', image: sheeshabowlsImage },
];
const floors = ['All', '1st Floor', '2nd Floor', '3rd Floor'];

// The screen now accepts and uses the isDarkMode prop
export default function ListScreen({ onProfilePress, isDarkMode }) {
  const [currentView, setCurrentView] = useState('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFloor, setActiveFloor] = useState('All');

  // --- Dynamic Styles ---
  const pageContainerStyle = [ styles.pageContainer, isDarkMode && { backgroundColor: '#121212' }];
  const headerTextStyle = [styles.header, isDarkMode && { color: '#fff' }];
  const searchBarContainerStyle = [ styles.searchBar, isDarkMode && { backgroundColor: '#333'}];
  const searchInputStyle = [ styles.searchInput, isDarkMode && { color: '#fff'}];
  const iconColor = isDarkMode ? '#fff' : '#000';

  const handleCategoryPress = (categoryTitle) => {
    setSearchQuery('');
    if (categoryTitle === 'Buildings') setCurrentView('buildingList');
    else if (categoryTitle === 'Landmarks') setCurrentView('landmarkList');
    else if (categoryTitle === 'Food Stalls') setCurrentView('foodStallList');
    else Alert.alert(categoryTitle, "This category is not yet implemented.");
  };

  const handleBackPress = (view) => {
      setSearchQuery('');
      setCurrentView(view);
  };

  // --- Views ---
  const CategoryView = () => (
     <View style={pageContainerStyle}>
        <Header title="List of Facilities" onProfilePress={onProfilePress} isDarkMode={isDarkMode} />
        <ScrollView style={styles.cardList}>
            {categories.map(item => ( <CategoryCard key={item.id} title={item.title} imageSource={item.image} onPress={() => handleCategoryPress(item.title)} /> ))}
        </ScrollView>
      </View>
  );

  const BuildingListView = () => (
      <View style={pageContainerStyle}>
          <View style={styles.searchHeaderContainer}>
              <Image source={require('../assets/logo.png')} style={styles.searchHeaderLogo} />
              <View style={searchBarContainerStyle}><Icon name="search" size={20} color="#8e8e93" /><TextInput style={searchInputStyle} placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#8e8e93" /></View>
              <TouchableOpacity onPress={onProfilePress}><View style={styles.profileIconContainer}><Icon name="user" size={18} color="#fff" /></View></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleBackPress('categories')} style={styles.backButtonHeader}><Icon name="arrow-left" size={24} color={iconColor} /><Text style={headerTextStyle}>Buildings</Text></TouchableOpacity>
          <ScrollView>
              {buildingList.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map(building => (<BuildingListItem key={building.id} title={building.name} onPress={() => handleBackPress('roomList')} isDarkMode={isDarkMode}/>))}
          </ScrollView>
      </View>
  );

  const LandmarkListView = () => (
    <View style={pageContainerStyle}>
        <View style={styles.searchHeaderContainer}>
            <Image source={require('../assets/logo.png')} style={styles.searchHeaderLogo} />
            <View style={searchBarContainerStyle}><Icon name="search" size={20} color="#8e8e93" /><TextInput style={searchInputStyle} placeholder="Search Landmarks" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#8e8e93" /></View>
            <TouchableOpacity onPress={onProfilePress}><View style={styles.profileIconContainer}><Icon name="user" size={18} color="#fff" /></View></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleBackPress('categories')} style={styles.backButtonHeader}><Icon name="arrow-left" size={24} color={iconColor} /><Text style={headerTextStyle}>Landmarks</Text></TouchableOpacity>
        <ScrollView>
            {landmarkList.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase())).map(landmark => (
                <ListItemCard key={landmark.id} title={landmark.title} description={landmark.description} imageSource={landmark.image} onPress={() => Alert.alert('Tapped on', landmark.title)} isDarkMode={isDarkMode} />
            ))}
        </ScrollView>
    </View>
  );
  
  const FoodStallListView = () => (
    <View style={pageContainerStyle}>
        <View style={styles.searchHeaderContainer}>
            <Image source={require('../assets/logo.png')} style={styles.searchHeaderLogo} />
            <View style={searchBarContainerStyle}><Icon name="search" size={20} color="#8e8e93" /><TextInput style={searchInputStyle} placeholder="Search Food Stalls" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#8e8e93" /></View>
            <TouchableOpacity onPress={onProfilePress}><View style={styles.profileIconContainer}><Icon name="user" size={18} color="#fff" /></View></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleBackPress('categories')} style={styles.backButtonHeader}><Icon name="arrow-left" size={24} color={iconColor} /><Text style={headerTextStyle}>Food Stalls</Text></TouchableOpacity>
        <ScrollView>
            {foodStallList.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map(stall => (
                <ListItemCard key={stall.id} title={stall.title} description={stall.description} imageSource={stall.image} onPress={() => Alert.alert('Tapped on', stall.title)} isDarkMode={isDarkMode} />
            ))}
        </ScrollView>
    </View>
  );

  const RoomListView = () => (
    <View style={pageContainerStyle}>
       <View style={styles.searchHeaderContainer}>
            <Image source={require('../assets/logo.png')} style={styles.searchHeaderLogo} />
            <View style={searchBarContainerStyle}><Icon name="search" size={20} color="#8e8e93" /><TextInput style={searchInputStyle} placeholder="Search Rooms" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor="#8e8e93" /></View>
            <TouchableOpacity onPress={onProfilePress}><View style={styles.profileIconContainer}><Icon name="user" size={18} color="#fff" /></View></TouchableOpacity>
        </View>
       <TouchableOpacity onPress={() => handleBackPress('buildingList')} style={styles.backButton}><Icon name="arrow-left" size={24} color={iconColor} /><View><Text style={[styles.detailsHeader, isDarkMode && {color: '#fff'}]}>AMS Building</Text><Text style={[styles.detailsSubHeader, isDarkMode && {color: '#ccc'}]}>Antonio Moran Sison</Text></View></TouchableOpacity>
       <View style={styles.floorButtonsContainer}>
          {floors.map(floor => (<TouchableOpacity key={floor} style={[styles.floorButton, activeFloor === floor && styles.activeFloorButton]} onPress={() => setActiveFloor(floor)}><Text style={[styles.floorButtonText, activeFloor === floor && styles.activeFloorButtonText]}>{floor}</Text></TouchableOpacity>))}
       </View>
       <ScrollView>
          {buildingRooms.filter(room => activeFloor === 'All' || room.floor === activeFloor).filter(room => room.title.toLowerCase().includes(searchQuery.toLowerCase())).map(room => (<ListItemCard key={room.id} title={room.title} description={room.description} imageSource={room.image} onPress={() => Alert.alert('Tapped on', room.title)} isDarkMode={isDarkMode} />))}
       </ScrollView>
    </View>
);

  const renderCurrentView = () => {
    if (currentView === 'buildingList') return <BuildingListView />;
    if (currentView === 'roomList') return <RoomListView />;
    if (currentView === 'landmarkList') return <LandmarkListView />;
    if (currentView === 'foodStallList') return <FoodStallListView />;
    return <CategoryView />;
  };
  return renderCurrentView();
}

const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 20 },
  cardList: { marginTop: 20 },
  searchHeaderContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  searchHeaderLogo: { width: 32, height: 32 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 40, marginHorizontal: 10 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  profileIconContainer: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#c0c0c0', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginLeft: 15 },
  backButtonHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 10 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  detailsHeader: { fontSize: 22, fontWeight: 'bold', marginLeft: 15 },
  detailsSubHeader: { fontSize: 14, color: '#666', marginLeft: 15 },
  floorButtonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  floorButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f0f0f0' },
  activeFloorButton: { backgroundColor: '#c00000' },
  floorButtonText: { color: '#000', fontWeight: '600' },
  activeFloorButtonText: { color: '#fff' },
});

