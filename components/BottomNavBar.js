import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BottomNavBar = ({ activeTab, onPressExplore, onPressSaved, onPressList, onPressNotify }) => {
  return (
    <View style={styles.container}>
      //Explore Button
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Explore' && styles.activeButton]}
        onPress={onPressExplore}>
        <Icon name="compass" size={28} color={activeTab === 'Explore' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      //Bookmark Button
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Saved' && styles.activeButton]}
        onPress={onPressSaved}>
        <Icon name="bookmark" size={28} color={activeTab === 'Saved' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      //List Button
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'List' && styles.activeButton]}
        onPress={onPressList}>
        <Icon name="list" size={28} color={activeTab === 'List' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>

      //Notifications Button
      <TouchableOpacity
        style={[styles.iconButton, activeTab === 'Notify' && styles.activeButton]}
        onPress={onPressNotify}>
        <Icon name="bell" size={28} color={activeTab === 'Notify' ? '#FFFFFF' : '#333'} />
      </TouchableOpacity>
    </View>
  );
};


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
    width: 50,
    height: 50,
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#D32F2F', 
  },
});

export default BottomNavBar;

