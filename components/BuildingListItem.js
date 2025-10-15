import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// 1. Accept the isDarkMode prop
const BuildingListItem = ({ title, onPress, isDarkMode }) => {
  // 2. Define a dynamic style for the text color
  const titleStyle = [styles.title, isDarkMode && { color: '#fff' }];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.line} />
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  line: {
    width: 5,
    height: 25,
    backgroundColor: '#c00000',
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});

export default BuildingListItem;
