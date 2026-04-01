import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  FlatList, 
  Keyboard 
} from 'react-native';

const RouteInput = ({
  startValue,
  onStartChange,
  endValue,
  onEndChange,
  roomData = [] // Receives the list of rooms from ExploreScreen
}) => {
  const [activeInput, setActiveInput] = useState(null); // 'start' or 'end'
  const [suggestions, setSuggestions] = useState([]);

  // --- LOGIC: Search & Filter ---
  const handleSearch = (text, type) => {
    // 1. Update the parent state so text changes
    if (type === 'start') onStartChange(text);
    else onEndChange(text);

    // 2. Hide suggestions if empty
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    // 3. Filter the room list
    const lowerText = text.toLowerCase();
    const filtered = roomData.filter(room => {
      const nameMatch = room.name && room.name.toLowerCase().includes(lowerText);
      const idMatch = room.id && room.id.toLowerCase().includes(lowerText);
      return nameMatch || idMatch;
    });

    // 4. Show top 5 results
    setSuggestions(filtered.slice(0, 5));
    setActiveInput(type);
  };

  // --- LOGIC: Select Item ---
  const handleSelect = (item) => {
    const value = item.name || item.id;
    
    if (activeInput === 'start') onStartChange(value);
    else onEndChange(value);
    
    setSuggestions([]);
    setActiveInput(null);
    Keyboard.dismiss();
  };

  return (
    // Added zIndex here to ensure the dropdown floats ABOVE the "Suggested Places"
    <View style={{ zIndex: 10 }}> 
      
      {/* --- START INPUT --- */}
      <TextInput
        style={styles.input}
        placeholder="Starting Location"
        placeholderTextColor="#8e8e93"
        value={startValue}
        onChangeText={(text) => handleSearch(text, 'start')}
        onFocus={() => setActiveInput('start')}
      />

      {/* --- END INPUT --- */}
      <TextInput
        style={[styles.input, { marginTop: 15 }]}
        placeholder="Ending Location"
        placeholderTextColor="#8e8e93"
        value={endValue}
        onChangeText={(text) => handleSearch(text, 'end')}
        onFocus={() => setActiveInput('end')}
      />

      {/* --- DROPDOWN LIST --- */}
      {suggestions.length > 0 && activeInput && (
        <View style={[
            styles.dropdown, 
            activeInput === 'start' ? { top: 55 } : { top: 125 }
        ]}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.suggestionItem} 
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.suggestionName}>{item.name}</Text>
                {item.name !== item.id && (
                  <Text style={styles.suggestionId}>{item.id}</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  
  // --- DROPDOWN STYLES ---
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 999, 
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', 
  },
  suggestionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  suggestionId: {
    fontSize: 12,
    color: '#8e8e93', 
    marginTop: 2,
  }
});

export default RouteInput;