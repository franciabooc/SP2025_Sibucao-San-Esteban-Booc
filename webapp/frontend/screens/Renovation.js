import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import SidebarHeader from "../components/SidebarHeader";
import BottomNavBar from "../components/BottomNavBar";
import SearchBar from "../components/SearchBar";

const Renovation = () => {
  const [renovations, setRenovations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/renovation");
      const data = await res.json();
      setRenovations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching renovations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // RESET SEARCH & FILTER ON FOCUS
  // =========================
  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
      setStatusFilter("");
      fetchData(); // refresh list on focus
    }, [])
  );

  // =========================
  // HANDLERS
  // =========================
  const handleAdd = () => navigation.navigate("AddRenovation");

  const handleUpdate = (id) => navigation.navigate("UpdateRenovation", { id });

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = renovations.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.building?.toLowerCase().includes(query) ||
      item.room?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "" ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // UNIQUE STATUSES
  // =========================
  const uniqueStatuses = [
    ...new Set(renovations.map((r) => r.status).filter(Boolean)),
  ];

  // =========================
  // RENDER ROW
  // =========================
  const renderRow = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.building}</Text>
      <Text style={styles.cell}>{item.room}</Text>
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
        <Text>Loading renovations...</Text>
      </View>
    );
  }

  // =========================
  // MAIN VIEW
  // =========================
  return (
    <SafeAreaView style={styles.screen}>
      <SidebarHeader title="Renovations" />

      <View style={styles.container}>
        {/* Search + Status Filter + Add */}
        <View style={styles.topRow}>
          {/* Search */}
          <View style={{ flex: 2, marginRight: 10 }}>
            <SearchBar
              placeholder="Search renovations..."
              onSearch={(query) => {
                setSearchQuery(query);
                setStatusFilter("");
              }}
            />
          </View>

          {/* Status Filter */}
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

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={styles.headerCell}>Building</Text>
          <Text style={styles.headerCell}>Room</Text>
          <Text style={styles.headerCell}>Start Date</Text>
          <Text style={styles.headerCell}>End Date</Text>
          <Text style={[styles.headerCell, { flex: 3 }]}>Description</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Action</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No renovation records found</Text>
          }
        />
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
};

export default Renovation;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  topRow: {
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
  cell: { flex: 1, fontSize: 14, color: "#333", paddingLeft: 5 },
  headerCell: { flex: 1, fontSize: 14, fontWeight: "bold", color: "#fff", paddingLeft: 5 },

  // Buttons
  addButton: {
    backgroundColor: "#b30000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  updateButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  emptyText: { textAlign: "center", marginTop: 20, color: "#777", fontStyle: "italic" },
});
