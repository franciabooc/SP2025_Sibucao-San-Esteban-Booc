import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const NotificationCard = ({ notification, onPress, onMarkAsUnread, onDelete }) => {
  const cardStyle = [
    styles.card,
    !notification.isRead && styles.newCard,
  ];

  const handleOptionsPress = () => {
    Alert.alert(
      'Notification Options',
      `What would you like to do with "${notification.title}"?`,
      [
        {
          text: 'Mark as Unread',
          onPress: onMarkAsUnread, // Calls the function passed from the parent screen
        },
        {
          text: 'Delete Notification',
          onPress: onDelete, // Calls the function passed from the parent screen
          style: 'destructive', // This makes the text red on iOS for a warning
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    // The main card is tappable to mark as read
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
          <Icon name="more-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      <Text style={styles.message}>{notification.message}</Text>
      {notification.image && (
        <Image source={notification.image} style={styles.image} />
      )}
      {notification.cta && (
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>{notification.cta}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  newCard: {
    borderColor: '#c00000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerTextContainer: { flex: 1, marginRight: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  timestamp: { fontSize: 14, color: '#666', marginTop: 2 },
  optionsButton: { padding: 5 },
  message: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 15 },
  image: { width: '100%', height: 180, borderRadius: 10, marginBottom: 15 },
  ctaButton: { backgroundColor: '#c00000', paddingVertical: 12, borderRadius: 25, alignItems: 'center' },
  ctaButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default NotificationCard;

