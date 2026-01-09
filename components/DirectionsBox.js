import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

export default function DirectionsBox({ directions }) {
  if (!directions || directions.length === 0) return null;

  return (
    <View style={styles.directionsContainer}>
        <Text style={styles.directionsTitle}>Directions:</Text>
        <ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled={true}>
            {directions.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                    <Icon 
                        name={
                            step.includes("Left") ? "arrow-left" : 
                            step.includes("Right") ? "arrow-right" : 
                            step.includes("arrived") ? "map-pin" : 
                            step.includes("Level") ? "layers" : 
                            "arrow-up"
                        } 
                        size={20} 
                        color={step.includes("Level") ? "#c00000" : "#333"} 
                    />
                    <Text style={[
                        styles.stepText, 
                        step.includes("Level") && { color: '#c00000', fontWeight: 'bold' }
                    ]}>
                        {step}
                    </Text>
                </View>
            ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  directionsContainer: {
      position: 'absolute',
      bottom: 20,
      left: 15,
      right: 15,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      maxHeight: 200,
      zIndex: 100 
  },
  directionsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepText: { marginLeft: 10, fontSize: 14, color: '#555' }
});