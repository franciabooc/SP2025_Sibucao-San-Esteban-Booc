import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

function CategoryCard({ imageSource, title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#e0e0e0', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

// This is the most important line. It MUST be here.
export default CategoryCard;
