import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import SearchBar from "../components/SearchBar";
import SidebarHeader from "../components/SidebarHeader";

const Pathway = () => {
  const [pathways, setPathways] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/pathway")
      .then((res) => res.json())
      .then((data) => {
        setPathways(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // RESET SEARCH AND FILTER ON FOCUS
  // =========================
  useFocusEffect(
    useCallback(() => {
      // Reset filters when returning to this screen
      setSearchQuery("");
      setTypeFilter("");
    }, [])
  );

  // =========================
  // FILTER PATHWAYS
  // =========================
  const filteredData = pathways.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "" ? true : item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // =========================
  // UNIQUE TYPES FOR DROPDOWN
  // =========================
  const uniqueTypes = [
    ...new Set(pathways.map((p) => p.type).filter(Boolean)),
  ];

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

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading pathways...</Text>
      </View>
    );
  }

  // =========================
  // MAIN VIEW
  // =========================
  return (
    <View style={styles.screen}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search + Type Filter */}
        <View style={styles.filtersRow}>
          <View style={{ flex: 2, marginRight: 10 }}>
            <SearchBar
              placeholder="Search pathways..."
              onSearch={(query) => {
                setSearchQuery(query);
                setTypeFilter("");
              }}
            />
          </View>

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
                setSearchQuery("");
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

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pathways found</Text>
          }
        />
      </View>

      {/* =========================
         ICON NAVIGATION BAR
      ========================= */}
      <View style={styles.iconNavBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("Renovation", {
              onBack: () => {
                // Optional callback if needed
                setSearchQuery("");
                setTypeFilter("");
              },
            })
          }
        >
          <MaterialIcons name="construction" size={26} color="#b30000" />
          <Text style={styles.iconText}>Renovation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate("Relocation", {
              onBack: () => {
                setSearchQuery("");
                setTypeFilter("");
              },
            })
          }
        >
          <FontAwesome5 name="people-carry" size={24} color="#b30000" />
          <Text style={styles.iconText}>Relocation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pathway;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  filtersRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, justifyContent: "space-between" },
  picker: { height: 40, marginHorizontal: 5 },
  row: { flexDirection: "row", backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#ddd", paddingVertical: 10, paddingHorizontal: 5, alignItems: "center" },
  headerRow: { backgroundColor: "#444" },
  cell: { flex: 1, fontSize: 14, color: "#333", paddingLeft: 5 },
  headerCell: { flex: 1, fontSize: 14, fontWeight: "bold", color: "#fff", paddingLeft: 5 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#777", fontStyle: "italic" },
  iconNavBar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#fff", paddingVertical: 12, borderTopWidth: 1, borderColor: "#ddd" },
  iconButton: { alignItems: "center" },
  iconText: { marginTop: 4, fontSize: 12, color: "#333", textAlign: "center" },
});
