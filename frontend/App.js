import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Screen Imports ---
import ListScreen from './screens/ListScreen';
import SavedScreen from './screens/SavedScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import BottomNavBar from './components/BottomNavBar';

export default function App() {
  const [activeTab, setActiveTab] = useState('Explore');
  // This state is now simpler: just 'main' or 'profile'
  const [currentView, setCurrentView] = useState('main');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    setCurrentView('main'); // Ensure we go back to the main view when changing tabs
  }

  const openProfile = () => setCurrentView('profile');
  const closeProfile = () => setCurrentView('main');
  // The functions for managing notifications are no longer needed here

  const renderMainContent = () => {
    switch (activeTab) {
      case 'Explore':
        return <ExploreScreen onProfilePress={openProfile} />;
      case 'List':
        return <ListScreen onProfilePress={openProfile} />;
      case 'Saved':
        return <SavedScreen onProfilePress={openProfile} />;
      case 'Notify':
        return <NotificationScreen onProfilePress={openProfile} />;
      default:
        return <View style={styles.pageContainer}><Text style={styles.header}>{activeTab}</Text></View>;
    }
  };

  // This function now handles all top-level navigation
  const renderCurrentView = () => {
    if (currentView === 'profile') {
      // It now only needs to pass the closeProfile function
      return <ProfileScreen onBackPress={closeProfile} />;
    }

    // The 'main' view is the default, showing tabs and the bottom bar
    return (
      <>
        <View style={styles.content}>{renderMainContent()}</View>
        <BottomNavBar
          activeTab={activeTab}
          onPressExplore={() => handleTabPress('Explore')}
          onPressSaved={() => handleTabPress('Saved')}
          onPressList={() => handleTabPress('List')}
          onPressNotify={() => handleTabPress('Notify')}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderCurrentView()}
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

