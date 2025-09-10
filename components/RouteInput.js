import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

const RouteInput = ({
  startValue,
  onStartChange,
  endValue,
  onEndChange,
}) => {
  return (
    // A container is added to manage the position of the line image
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Starting Location"
        placeholderTextColor="#8e8e93"
        value={startValue}
        onChangeText={onStartChange}
      />
      <TextInput
        // A top margin is added to create space between the inputs
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Ending Location"
        placeholderTextColor="#8e8e93"
        value={endValue}
        onChangeText={onEndChange}
      />
      {/* The Image is now positioned absolutely within the container */}
      <Image
        source={require('../assets/line.png')}
        style={styles.lineConnector}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Ensures the absolute positioning is relative to this container
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  // The style for the image is updated to position it correctly
  lineConnector: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    position: 'absolute',
    // This value is calculated to perfectly center the image in the gap
    top: 47.5,
    // This property will now center the image horizontally
    alignSelf: 'center',
  },
});

export default RouteInput;

