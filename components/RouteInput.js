import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

const RouteInput = ({
  startValue,
  onStartChange,
  endValue,
  onEndChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Starting Location"
        placeholderTextColor="#8e8e93"
        value={startValue}
        onChangeText={onStartChange}
      />
      <TextInput
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Ending Location"
        placeholderTextColor="#8e8e93"
        value={endValue}
        onChangeText={onEndChange}
      />
      <Image
        source={require('../assets/line.png')}
        style={styles.lineConnector}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', 
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  lineConnector: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    position: 'absolute',
    top: 47.5,
    alignSelf: 'center',
  },
});

export default RouteInput;

