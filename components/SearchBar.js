import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

// 1. The component now accepts an onProfilePress prop
const SearchBar = ({ variant = 'map', value, onChangeText, onProfilePress }) => {
  const isMapVariant = variant === 'map';
  const containerStyle = [
    styles.container,
    isMapVariant ? styles.mapContainer : styles.savedContainer,
  ];

  return (
    <View style={containerStyle}>
      {isMapVariant ? (
        <Image
          source={require('../assets/logo.png')}
          style={styles.mapIcon}
        />
      ) : (
        <Icon name="search" size={20} color="#8e8e93" style={styles.searchIcon} />
      )}

      <TextInput
        style={styles.input}
        placeholder={isMapVariant ? 'Search here' : 'Search'}
        placeholderTextColor="#8e8e93"
        value={value}
        onPressnChangeText={onChangeText}
      />

      {/* 2. The profile icon is now a button that calls onProfilePress */}
      <TouchableOpacity onPress={onProfilePress}>
        <View style={styles.profileIconContainer}>
          <Icon name="user" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', borderRadius: 30, paddingHorizontal: 15, height: 50, marginBottom: 10, },
  mapContainer: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0', shadowColor: "#000", shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, },
  savedContainer: { backgroundColor: '#f0f0f0', },
  mapIcon: { width: 24, height: 24, marginRight: 10, },
  searchIcon: { marginRight: 10, },
  input: { flex: 1, fontSize: 16, color: '#000', },
  profileIconContainer: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#c0c0c0', justifyContent: 'center', alignItems: 'center', marginLeft: 10, },
});

export default SearchBar;