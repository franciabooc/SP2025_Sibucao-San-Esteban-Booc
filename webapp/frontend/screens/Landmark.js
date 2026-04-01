// /screens/Landmark.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Recommended
import SearchBar from "../components/SearchBar";
import SidebarHeader from "../components/SidebarHeader";

const Landmark = () => {
  const [landmarks, setLandmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/landmarks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLandmarks(data);
        } else {
          console.error("Unexpected response:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching landmarks:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // FILTER LANDMARKS
  // =========================
  const filteredData = landmarks.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "" ? true : item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // =========================
  // UNIQUE TYPES FOR DROPDOWN
  // =========================
  const uniqueTypes = [...new Set(landmarks.map((l) => l.type).filter(Boolean))];

  // =========================
  // RENDER ROW
  // =========================
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
      <Text style={[styles.cell, { flex: 3 }]}>{item.description}</Text>
      <Text style={styles.cell}>{item.type}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading landmarks...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search + Type Filter Row */}
        <View style={styles.filtersRow}>
          {/* Search Bar */}
          <View style={{ flex: 2, marginRight: 10 }}>
            <SearchBar
              placeholder="Search landmarks..."
              onSearch={(query) => {
                setSearchQuery(query);
                setTypeFilter(""); // Reset filter when typing
              }}
            />
          </View>

          {/* Type Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
            style={{ flex: 6 }}
          >
            <Picker
              selectedValue={typeFilter}
              style={[styles.picker, { minWidth: 150 }]}
              onValueChange={(value) => {
                setTypeFilter(value);
                setSearchQuery(""); // Clear search when filter applied
              }}
            >
              <Picker.Item label="All Types" value="" />
              {uniqueTypes.map((t, i) => (
                <Picker.Item key={i} label={t} value={t} />
              ))}
            </Picker>
          </ScrollView>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerCell, { flex: 3 }]}>Description</Text>
          <Text style={styles.headerCell}>Type</Text>
        </View>

        {/* Table Data */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No landmarks found</Text>
          }
        />
      </View>
    </View>
  );
};

export default Landmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  picker: { height: 40, marginHorizontal: 5 },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#444",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingLeft: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
});
