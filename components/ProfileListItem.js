import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const ProfileListItem = ({ icon, text, type = 'chevron', value, onValueChange, onPress, isDarkMode }) => {
  const textColor = isDarkMode ? '#fff' : '#333';
  const iconColor = isDarkMode ? '#fff' : '#333';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={icon} size={22} color={iconColor} style={styles.icon} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      {type === 'chevron' && <Icon name="chevron-right" size={24} color="#c0c0c0" />}
      {type === 'toggle' && <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#767577', true: '#c00000' }} thumbColor={'#f4f3f4'} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileListItem;

