import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// The component is now "controlled" by its parent screen
const ListItemCard = ({
  imageSource,
  title,
  description,
  onPress,
  isBookmarked, // New prop to tell the card if it's saved
  onBookmarkPress, // New prop to handle the tap event
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </View>
      <TouchableOpacity onPress={onBookmarkPress} style={styles.bookmarkButton}>
        {/* The icon now depends on the isBookmarked prop */}
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color="#c00000"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  bookmarkButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default ListItemCard;

