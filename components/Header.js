import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const Header = ({ title, onProfilePress, isDarkMode }) => {
  const containerStyle = [
    styles.container,
    isDarkMode && { backgroundColor: '#1e1e1e', borderBottomColor: '#333' }
  ];
  const titleStyle = [styles.title, isDarkMode && { color: '#fff' }];
  const iconColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={containerStyle}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={titleStyle}>{title}</Text>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={24} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onProfilePress}>
          <View style={styles.profileIconContainer}>
            <Icon name="user" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  profileIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;

