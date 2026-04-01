import React, { useEffect, useState, useCallback } from "react";
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

import SidebarHeader from "../components/SidebarHeader";
import BottomNavBar from "../components/BottomNavBar";
import SearchBar from "../components/SearchBar";

const Relocation = () => {
  const [relocations, setRelocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // =========================
  // FETCH RELOCATION DATA
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/relocation")
      .then((res) => res.json())
      .then((data) => {
        setRelocations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching relocation data:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // RESET SEARCH AND FILTER ON FOCUS
  // =========================
  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
      setStatusFilter("");
    }, [])
  );

  // =========================
  // HANDLERS
  // =========================
  const handleAdd = () => {
    navigation.navigate("AddRelocation");
  };

  const handleUpdate = (id) => {
    navigation.navigate("UpdateRelocation", { id });
  };

  // =========================
  // FILTER RELOCATIONS
  // =========================
  const filteredData = relocations.filter((item) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      item.previous_location?.toLowerCase().includes(query) ||
      item.new_location?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // UNIQUE STATUSES
  // =========================
  const uniqueStatuses = [
    ...new Set(relocations.map((r) => r.status).filter(Boolean)),
  ];

  // =========================
  // RENDER ROW
  // =========================
  const renderRow = ({ item, index }) => (
    <View style={styles.row}>
      {/* Row number instead of database ID */}
      <Text style={styles.cellId}>{index + 1}</Text>

      <Text style={[styles.cell, { flex: 2 }]}>{item.previous_location}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.new_location}</Text>
      <Text style={styles.cell}>{item.date_start}</Text>
      <Text style={styles.cell}>{item.end_date || "-"}</Text>
      <Text style={[styles.cell, { flex: 3 }]}>{item.description}</Text>
      <Text style={styles.cell}>{item.status}</Text>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => handleUpdate(item.id)}
      >
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading relocations...</Text>
      </View>
    );
  }

  // =========================
  // MAIN VIEW
  // =========================
  return (
    <View style={styles.screen}>
      <SidebarHeader title="Relocations" />

      <View style={styles.container}>
        {/* Search + Filter + Add */}
        <View style={styles.filtersRow}>
          <View style={{ flex: 2, marginRight: 10 }}>
            <SearchBar
              placeholder="Search relocations..."
              onSearch={(query) => {
                setSearchQuery(query);
                setStatusFilter("");
              }}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
            style={{ flex: 3 }}
          >
            <Picker
              selectedValue={statusFilter}
              style={[styles.picker, { minWidth: 150 }]}
              onValueChange={(value) => {
                setStatusFilter(value);
                setSearchQuery("");
              }}
            >
              <Picker.Item label="All Statuses" value="" />
              {uniqueStatuses.map((s, i) => (
                <Picker.Item key={i} label={s} value={s} />
              ))}
            </Picker>
          </ScrollView>

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCellId}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Previous Location</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>New Location</Text>
          <Text style={styles.headerCell}>Start Date</Text>
          <Text style={styles.headerCell}>End Date</Text>
          <Text style={[styles.headerCell, { flex: 3 }]}>Description</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCellAction}>Action</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No relocation records found</Text>
          }
        />
      </View>

      <BottomNavBar navigation={navigation} />
    </View>
  );
};

export default Relocation;

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

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

  headerRow: { backgroundColor: "#444" },

  cell: { flex: 1, fontSize: 14, color: "#333" },
  cellId: { width: 40, fontSize: 14, color: "#333", textAlign: "center" },

  headerCell: { flex: 1, fontSize: 14, fontWeight: "bold", color: "#fff" },
  headerCellId: { width: 40, fontSize: 14, fontWeight: "bold", color: "#fff", textAlign: "center" },
  headerCellAction: { width: 80, fontSize: 14, fontWeight: "bold", color: "#fff", textAlign: "center" },

  // =====================
  // BUTTONS
  // =====================
  addButton: {
    backgroundColor: "#b30000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
});
