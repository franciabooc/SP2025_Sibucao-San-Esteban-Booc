import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function FloorSwitcher({ currentFloor, onFloorChange, totalAvailableFloors = 2 }) {
  // Directly loops exactly through [1, 2] or [1, 2, 3] based on the data graph file structure!
  const floorsArray = Array.from({ length: totalAvailableFloors }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      {floorsArray.map((floor) => {
        const isActive = currentFloor === floor;
        return (
          <TouchableOpacity
            key={floor}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => onFloorChange(floor)}
          >
            <Text style={[styles.buttonText, isActive && styles.activeText]}>
              L{floor}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 120, // Floating positioned right above instructions panel card
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 95,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  activeText: {
    color: '#fff',
  },
});