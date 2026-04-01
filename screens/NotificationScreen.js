import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

// --- Component Imports ---
import Header from '../components/Header';
import NotificationCard from '../components/NotificationCard';

// --- Initial Mock Data ---
const initialNotifications = [
  {
    id: '1',
    type: 'admin',
    title: 'University Event',
    timestamp: new Date(),
    message: 'The University of Nueva Caceres will be celebrating its 77th Foundation Anniversary. Come and join us!',
    image: { uri: 'https://placehold.co/600x400/A9A9A9/FFFFFF?text=UNC+77th' },
    cta: 'Alternate Route',
    isRead: false,
  },
  {
    id: '3',
    type: 'report',
    title: 'Report Submitted',
    timestamp: new Date(),
    message: 'Your report regarding a map inaccuracy has been received and is under review.',
    isRead: false,
  },
  {
    id: '2',
    type: 'admin',
    title: 'Maintenance Announcement',
    timestamp: new Date('2025-10-11T09:00:00'),
    message: 'Please be advised that the main library will be closed for maintenance work from October 13-15.',
    isRead: true,
  },
];

const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
};

export default function NotificationScreen({ onProfilePress }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  // --- Handler Functions ---
  const handleMarkAsRead = (notificationId) => {
    setNotifications(current => current.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };

  const handleMarkAsUnread = (notificationId) => {
    setNotifications(current => current.map(n => n.id === notificationId ? { ...n, isRead: false } : n));
  };
  
  const handleDelete = (notificationId) => {
    setNotifications(current => current.filter(n => n.id !== notificationId));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(current => current.map(n => ({...n, isRead: true})));
  };

  // --- Filtering and Sorting Logic ---
  const filteredNotifications = notifications
    .filter(item => {
        if (activeFilter === 'All') return item.type === 'admin';
        if (activeFilter === 'Unread') return item.type === 'admin' && !item.isRead;
        if (activeFilter === 'Submitted Reports') return item.type === 'report';
        return false;
    })
    .sort((a, b) => b.timestamp - a.timestamp);


  return (
    <View style={styles.pageContainer}>
      <Header title="Announcements" onProfilePress={onProfilePress} />

      <View style={styles.headerActions}>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAllReadText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
          {['All', 'Unread', 'Submitted Reports'].map(filter => (
               <TouchableOpacity
                  key={filter}
                  style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
                  onPress={() => setActiveFilter(filter)}
               >
                  <Text style={[styles.filterButtonText, activeFilter === filter && styles.activeFilterButtonText]}>{filter}</Text>
              </TouchableOpacity>
          ))}
      </View>

      <ScrollView style={styles.list}>
        {filteredNotifications.length > 0 ? (
            filteredNotifications.map(item => (
                <NotificationCard
                    key={item.id}
                    notification={{...item, timestamp: formatTimestamp(item.timestamp)}}
                    onPress={() => handleMarkAsRead(item.id)}
                    onMarkAsUnread={() => handleMarkAsUnread(item.id)}
                    onDelete={() => handleDelete(item.id)}
                />
            ))
        ) : (
            <Text style={styles.noItemsText}>No {activeFilter.toLowerCase()} to show.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  headerActions: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'flex-end', // Aligns the button to the right
  },
  markAllReadText: {
      color: '#c00000',
      fontWeight: '600',
  },
  filterContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      marginBottom: 10,
  },
  filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: '#f0f2f5',
      marginRight: 10,
  },
  activeFilterButton: {
      backgroundColor: '#c00000',
  },
  filterButtonText: {
      color: '#000',
      fontWeight: '600',
  },
  activeFilterButtonText: {
      color: '#fff',
  },
  list: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  noItemsText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#6c757d',
  }
});

