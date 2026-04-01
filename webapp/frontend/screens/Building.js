import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import SearchBar from "../components/SearchBar";
import SidebarHeader from "../components/SidebarHeader";

const Building = () => {
  const [buildings, setBuildings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  /* ============================
     FETCH BUILDINGS
  ============================ */
  useEffect(() => {
    fetch("http://127.0.0.1:5000/buildings")
      .then((response) => response.json())
      .then((data) => {
        setBuildings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
        setLoading(false);
      });
  }, []);

  /* ============================
     FILTER SEARCH
  ============================ */
  const filteredData = buildings.filter((item) =>
    item.bldg_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ============================
     TABLE ROW
  ============================ */
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.bldg_name}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>
        {item.type_of_structure}
      </Text>
      <Text style={styles.cell}>{item.no_of_storey}</Text>
      <Text style={styles.cell}>{item.area_footprint_sqm}</Text>
      <Text style={styles.cell}>{item.total_area_sqm}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>
        {item.date_constructed}
      </Text>
    </View>
  );

  /* ============================
     LOADING STATE
  ============================ */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text style={{ marginTop: 10 }}>Loading buildings...</Text>
      </View>
    );
  }

  /* ============================
     MAIN UI
  ============================ */
  return (
    <View style={styles.screen}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search */}
        <View style={styles.headerContainer}>
        
        </View>

        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>
            Building Name
          </Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>
            Type of Structure
          </Text>
          <Text style={styles.headerCell}>No. of Story</Text>
          <Text style={styles.headerCell}>Area (Footprint) in sq.mt</Text>
          <Text style={styles.headerCell}>Total Area ub sq.m</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>
           Date Constructed
          </Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={filteredData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* ============================
         ICON NAVIGATION BAR
      ============================ */}
      <View style={styles.iconNavBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("EmergencyLight")}
        >
          <MaterialIcons name="emergency" size={26} color="#b30000" />
          <Text style={styles.iconText}>Emergency Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("FireExitSignages")}
        >
          <MaterialIcons name="exit-to-app" size={26} color="#b30000" />
          <Text style={styles.iconText}>Fire Exit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("FireExtinguisher")}
        >
          <FontAwesome5
            name="fire-extinguisher"
            size={24}
            color="#b30000"
          />
          <Text style={styles.iconText}>Extinguisher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ============================
   STYLES
============================ */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  searchWrapper: {
    width: "40%",
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

  /* ICON NAV BAR */
  iconNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default Building;
