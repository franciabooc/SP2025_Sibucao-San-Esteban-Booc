import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SidebarHeader from "../components/SidebarHeader";
import IconNavBar from "../components/IconNavBar";

const FireExtinguisher = ({ navigation }) => {
  const [extinguishers, setExtinguishers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [lbsFilter, setLbsFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/fire_extinguishers");
        const data = await res.json();
        setExtinguishers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching fire extinguishers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Unique dropdown options
  const uniqueBuildings = useMemo(
    () => [...new Set(extinguishers.map((e) => e.building).filter(Boolean))].sort(),
    [extinguishers]
  );
  const uniqueCodes = useMemo(
    () => [...new Set(extinguishers.map((e) => e.code_no).filter(Boolean))].sort(),
    [extinguishers]
  );
  const uniqueLbs = useMemo(
    () => [...new Set(extinguishers.map((e) => e.lbs).filter(Boolean))].sort((a,b)=>a-b),
    [extinguishers]
  );

  // Filtered data
  const filteredData = useMemo(() => {
    return extinguishers.filter((item) => {
      const matchesSearch = [
        item.building,
        item.code_no,
        item.location,
        item.content,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesBuilding = buildingFilter ? item.building === buildingFilter : true;
      const matchesCode = codeFilter ? item.code_no === codeFilter : true;
      const matchesLbs = lbsFilter ? item.lbs.toString() === lbsFilter.toString() : true;

      return matchesSearch && matchesBuilding && matchesCode && matchesLbs;
    });
  }, [extinguishers, searchQuery, buildingFilter, codeFilter, lbsFilter]);

  // Check if expiration date is past
  const isExpired = (dateStr) => {
    if (!dateStr) return false;
    const today = new Date();
    const expDate = new Date(dateStr);
    return expDate < today;
  };

  // Render each row
  const renderRow = ({ item }) => (
    <View style={[styles.row, isExpired(item.expiration) && styles.expiredRow]}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.building}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.code_no}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.location}</Text>
      <Text style={styles.cell}>{item.lbs}</Text>
      <Text style={styles.cell}>{item.visibility ? "Yes" : "No"}</Text>
      <Text style={styles.cell}>{item.hose ? "Yes" : "No"}</Text>
      <Text style={styles.cell}>{item.locking_pin ? "Yes" : "No"}</Text>
      <Text style={styles.cell}>{item.pressure_gauge ? "Yes" : "No"}</Text>
      <Text style={styles.cell}>{item.operating_instruction ? "Yes" : "No"}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.content}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.expiration}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading fire extinguishers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search + Filters */}
        <View style={styles.searchFilterRow}>
          <TextInput
            style={[styles.searchInput, { flex: 3, marginRight: 5 }]}
            placeholder="Search by building, code, location, content..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Picker
            selectedValue={buildingFilter}
            style={[styles.picker, { flex: 1, marginRight: 5, height: 40 }]}
            onValueChange={setBuildingFilter}
          >
            <Picker.Item label="All Buildings" value="" />
            {uniqueBuildings.map((b) => (
              <Picker.Item key={b} label={b} value={b} />
            ))}
          </Picker>

          <Picker
            selectedValue={codeFilter}
            style={[styles.picker, { flex: 1, marginRight: 5, height: 40 }]}
            onValueChange={setCodeFilter}
          >
            <Picker.Item label="All Codes" value="" />
            {uniqueCodes.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>

           
             
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Building</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Code No.</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Location</Text>
          <Text style={styles.headerCell}>LBS</Text>
          <Text style={styles.headerCell}>Visibility</Text>
          <Text style={styles.headerCell}>Hose</Text>
          <Text style={styles.headerCell}>Pin</Text>
          <Text style={styles.headerCell}>Pressure Gauge</Text>
          <Text style={styles.headerCell}>Operating Instruction (PASS)</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Content</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Expiration</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <IconNavBar navigation={navigation} activeScreen="FireExtinguisher" />
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
  expiredRow: { backgroundColor: "#ffcccc" }, // red highlight for expired
  headerRow: { backgroundColor: "#444" },
  cell: { flex: 1, fontSize: 13, color: "#333", paddingLeft: 5 },
  headerCell: { flex: 1, fontSize: 13, fontWeight: "bold", color: "#fff", paddingLeft: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default FireExtinguisher;
