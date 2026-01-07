import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const RouteInput = ({
  startValue,
  onStartChange,
  onStartFocus, // New prop
  endValue,
  onEndChange,
  onEndFocus,   // New prop
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Starting Location"
        value={startValue}
        onChangeText={onStartChange}
        onFocus={onStartFocus} // Trigger when user taps this box
      />
      <TextInput
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Ending Location"
        value={endValue}
        onChangeText={onEndChange}
        onFocus={onEndFocus}   // Trigger when user taps this box
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

