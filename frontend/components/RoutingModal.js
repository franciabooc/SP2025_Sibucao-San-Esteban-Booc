import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ListItemCard from './ListItemCard';

//Mock Data
const suggestedPlace = {
  id: 'p1',
  title: 'Library',
  description: 'The UNC Library serves as a central resource hub...',
  image: require('../assets/lm-library.png')
};

const RoutingModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Draggable handle and close button */}
          <View style={styles.header}>
            <View style={styles.handle} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* User Input Component */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Starting Location"
              placeholderTextColor="#8e8e93"
            />
            <TextInput
              style={styles.input}
              placeholder="Ending Location"
              placeholderTextColor="#8e8e93"
            />
          </View>

          {/* Route Details Component */}
          <View style={styles.routeDetailsContainer}>
            <Image
              source={{ uri: 'https://placehold.co/600x400/e0e0e0/000000?text=Map+Preview' }}
              style={styles.mapPreview}
            />
            <View style={styles.timeEstimateContainer}>
              <Text style={styles.timeText}>Estimated Time: 5mins</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Suggested Places Component */}
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Places you might want to visit</Text>
            <ListItemCard
              imageSource={suggestedPlace.image}
              title={suggestedPlace.title}
              description={suggestedPlace.description}
              isBookmarked={false}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#c00000',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  routeDetailsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  mapPreview: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  timeEstimateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#c00000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestionsContainer: {
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default RoutingModal;

