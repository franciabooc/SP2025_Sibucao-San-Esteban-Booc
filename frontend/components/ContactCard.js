import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const ContactCard = ({ icon, title, number }) => {
  const handleCallPress = () => {
    const phoneNumber = `tel:${number.replace(/\s/g, '')}`; // Remove spaces for the link
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Icon name={icon} size={24} color="#333" style={styles.icon} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.number}>{number}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
        <Icon name="phone-call" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c00000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactCard;

