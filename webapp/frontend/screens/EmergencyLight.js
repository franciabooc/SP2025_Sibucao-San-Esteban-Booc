import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Make sure to install this package
import SidebarHeader from "../components/SidebarHeader";
import IconNavBar from "../components/IconNavBar";

const EmergencyLight = ({ navigation }) => {
  const [lights, setLights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // "functional" or "not_functional"
  const [loading, setLoading] = useState(true);

  // Fetch emergency lights
  useEffect(() => {
    fetch("http://127.0.0.1:5000/emergency_lights")
      .then((res) => res.json())
      .then((data) => {
        setLights(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching emergency lights:", err);
        setLoading(false);
      });
  }, []);

  // Unique values for dropdowns
  const uniqueBuildings = [
    ...new Set(lights.map((l) => l.building_name).filter(Boolean)),
  ];
  const uniqueCodes = [...new Set(lights.map((l) => l.code_no).filter(Boolean))];

  // Filtered data
  const filteredData = lights.filter((item) => {
    const building = item.building_name || "";
    const code = item.code_no || "";
    const functional = item.functional;
    const notFunctional = item.not_functional;

    // Search filter
    const matchesSearch = [building, code, item.brand, item.location]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Building filter
    const matchesBuilding = buildingFilter ? building === buildingFilter : true;

    // Code filter
    const matchesCode = codeFilter ? code === codeFilter : true;

    // Status filter
    let matchesStatus = true;
    if (statusFilter === "functional") matchesStatus = functional === true;
    else if (statusFilter === "not_functional") matchesStatus = notFunctional === true;

    return matchesSearch && matchesBuilding && matchesCode && matchesStatus;
  });

  // Render row
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.building_name}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.code_no}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.brand}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.location}</Text>
      <Text style={styles.cell}>{item.functional ? "Yes" : "No"}</Text>
      <Text style={styles.cell}>{item.not_functional ? "Yes" : "No"}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.remarks || "-"}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading emergency lights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search + Filters Inline Row */}
        <View style={styles.searchFilterRow}>
          {/* Search Input */}
          <TextInput
            style={[styles.searchInput, { flex: 3, marginRight: 5 }]}
            placeholder="Search by building, code, brand, or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Building Filter */}
          <Picker
            selectedValue={buildingFilter}
            style={[styles.picker, { flex: 1, marginRight: 5, height: 40 }]}
            onValueChange={(value) => setBuildingFilter(value)}
          >
            <Picker.Item label="All Buildings" value="" />
            {uniqueBuildings.map((b) => (
              <Picker.Item key={b} label={b} value={b} />
            ))}
          </Picker>

          {/* Code Filter */}
          <Picker
            selectedValue={codeFilter}
            style={[styles.picker, { flex: 1, marginRight: 5, height: 40 }]}
            onValueChange={(value) => setCodeFilter(value)}
          >
            <Picker.Item label="All Codes" value="" />
            {uniqueCodes.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>

          {/* Status Filter */}
          <Picker
            selectedValue={statusFilter}
            style={[styles.picker, { flex: 1, height: 40 }]}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <Picker.Item label="All Status" value="" />
            <Picker.Item label="Functional" value="functional" />
            <Picker.Item label="Not Functional" value="not_functional" />
          </Picker>
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Building</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Code No.</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Brand</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Location</Text>
          <Text style={styles.headerCell}>Functional</Text>
          <Text style={styles.headerCell}>Not Functional</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Remarks</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <IconNavBar navigation={navigation} activeScreen="EmergencyLight" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  searchFilterRow: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    height: 40,
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
  },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default EmergencyLight;
