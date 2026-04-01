import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const ListItemCard = ({
  imageSource,
  title,
  description,
  onPress,
  isBookmarked,
  onBookmarkPress,
  isDarkMode
}) => {

  const containerStyle = [
    styles.container,
    isDarkMode && { backgroundColor: '#1e1e1e' }
  ];
  const titleStyle = [styles.title, isDarkMode && { color: '#fff' }];
  const descriptionStyle = [styles.description, isDarkMode && { color: '#ccc' }];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={titleStyle} numberOfLines={1}>{title}</Text>
        <Text style={descriptionStyle} numberOfLines={2}>{description}</Text>
      </View>
      <TouchableOpacity onPress={onBookmarkPress} style={styles.bookmarkButton}>
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
    color: '#000',
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

