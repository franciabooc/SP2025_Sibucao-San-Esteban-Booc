import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BuildingListItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
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
  },
});

export default BuildingListItem;
