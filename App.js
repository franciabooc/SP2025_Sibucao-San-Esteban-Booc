import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

// --- Component Imports ---
import BottomNavBar from './components/BottomNavBar';

// --- Screen Imports ---
import ListScreen from './screens/ListScreen';
import SavedScreen from './screens/SavedScreen';
import ExploreScreen from './screens/ExploreScreen'; // 1. Import your new screen

export default function App() {
  const [activeTab, setActiveTab] = useState('Explore'); // Default to Explore

  const handleTabPress = (tabName) => {
      setActiveTab(tabName);
  }

  // 2. This function is now updated to show the ExploreScreen
  const renderContent = () => {
    switch (activeTab) {
      case 'Explore':
        return <ExploreScreen />;
      case 'List':
        return <ListScreen />;
      case 'Saved':
        return <SavedScreen />;
      
      default:
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.header}>{activeTab}</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{renderContent()}</View>

      <BottomNavBar
        activeTab={activeTab}
        onPressExplore={() => handleTabPress('Explore')}
        onPressSaved={() => handleTabPress('Saved')}
        onPressList={() => handleTabPress('List')}
        onPressNotify={() => handleTabPress('Notify')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  pageContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
});

