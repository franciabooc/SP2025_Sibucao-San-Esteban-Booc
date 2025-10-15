import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const RouteInput = ({
  startValue,
  onStartChange,
  endValue,
  onEndChange,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Starting Location"
        placeholderTextColor="#8e8e93"
        value={startValue}
        onChangeText={onStartChange}
      />
      {/* A margin is added to create space, replacing the line image */}
      <TextInput
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Ending Location"
        placeholderTextColor="#8e8e93"
        value={endValue}
        onChangeText={onEndChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
});

export default RouteInput;

