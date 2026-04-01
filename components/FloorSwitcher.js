import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FloorSwitcher({ currentFloor, onFloorChange }) {
  return (
    <View style={styles.floorSwitcher}>
        <TouchableOpacity 
            style={[styles.floorButton, currentFloor === 1 && styles.activeFloor]} 
            onPress={() => onFloorChange(1)}
        >
            <Text style={[styles.floorText, currentFloor === 1 && styles.activeFloorText]}>L1</Text>
        </TouchableOpacity>
        <View style={styles.floorDivider} />
        <TouchableOpacity 
            style={[styles.floorButton, currentFloor === 2 && styles.activeFloor]} 
            onPress={() => onFloorChange(2)}
        >
            <Text style={[styles.floorText, currentFloor === 2 && styles.activeFloorText]}>L2</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floorSwitcher: {
      position: 'absolute',
      top: 110, 
      left: 20, 
      backgroundColor: 'white',
      borderRadius: 12,
      flexDirection: 'row',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      zIndex: 90,
      overflow: 'hidden'
  },
  floorButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: 'white',
  },
  activeFloor: {
      backgroundColor: '#c00000', 
  },
  floorText: {
      fontWeight: 'bold',
      color: '#333',
  },
  activeFloorText: {
      color: 'white',
  },
  floorDivider: {
      width: 1,
      backgroundColor: '#eee',
  },
});