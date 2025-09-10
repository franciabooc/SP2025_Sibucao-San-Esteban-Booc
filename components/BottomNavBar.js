import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// The component now accepts an `activeTab` prop to know which button is selected
const BottomNavBar = ({ activeTab, onPressExplore, onPressSaved, onPressList, onPressNotify }) => {
  return (
    <View style={styles.container}>
      {/* Explore Button */}
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Explore' && styles.activeButton]}
        onPress={onPressExplore}>
        <Icon name="compass" size={28} color={activeTab === 'Explore' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      {/* Saved/Bookmark Button */}
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Saved' && styles.activeButton]}
        onPress={onPressSaved}>
        <Icon name="bookmark" size={28} color={activeTab === 'Saved' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      {/* List Button */}
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'List' && styles.activeButton]}
        onPress={onPressList}>
        <Icon name="list" size={28} color={activeTab === 'List' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      {/* Notifications Button */}
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Notify' && styles.activeButton]}
        onPress={onPressNotify}>
        <Icon name="bell" size={28} color={activeTab === 'Notify' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  iconButton: {
    // Added dimensions and borderRadius to create the circle effect
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width/height to make a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  // This is the new style for the selected button
  activeButton: {
    backgroundColor: '#D32F2F', // A nice red color
  },
});

export default BottomNavBar;

