// /screens/Rooms.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Picker,
} from "react-native";

import SearchBar from "../components/SearchBar";
import SidebarHeader from "../components/SidebarHeader";

const Rooms = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [classificationFilter, setClassificationFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ROOMS
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRooms(data);
        else console.error("Unexpected response:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // FILTER ROOMS
  // =========================
  const filteredData = rooms.filter((item) => {
    const roomName = item.room_name || "";
    const building = item.building;
    const floor = item.room_flr;
    const classification = item.classification;
    const occupant = item.occupant || "";

    // Search filter
    const matchesSearch = [roomName, building || "", occupant]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Building & Floor filters (exclude nulls)
    const matchesBuilding = buildingFilter
      ? building && building === buildingFilter
      : true;

    const matchesFloor = floorFilter ? floor && floor === floorFilter : true;

    // Classification filter with "No Classification"
    const matchesClassification =
      classificationFilter === ""
        ? true // All classifications
        : classificationFilter === "__none__"
        ? !classification // null, undefined, or empty string
        : classification === classificationFilter;

    return matchesSearch && matchesBuilding && matchesFloor && matchesClassification;
  });

  // =========================
  // UNIQUE VALUES FOR DROPDOWNS
  // Exclude nulls from Building and Floor
  // =========================
  const uniqueBuildings = [...new Set(rooms.map((r) => r.building).filter(Boolean))];
  const uniqueFloors = [...new Set(rooms.map((r) => r.room_flr).filter(Boolean))];
  const uniqueClassifications = [
    ...new Set(rooms.map((r) => r.classification).filter(Boolean)),
  ];

  // =========================
  // TABLE HEADER
  // =========================
  const renderTableHeader = () => (
    <View>
      <View style={[styles.row]}>
        <View style={[styles.groupHeaderBox, { flex: 7 }]}>
          <Text style={styles.groupHeaderText}>ROOM INFORMATION</Text>
          <View style={styles.subHeaderRow}>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>Nr</Text>
            <Text style={[styles.subHeaderText, { flex: 2 }]}>Building</Text>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>Floor</Text>
            <Text style={[styles.subHeaderText, { flex: 2 }]}>Room</Text>
            <Text style={[styles.subHeaderText, { flex: 2 }]}>Occupant</Text>
          </View>
        </View>

        <View style={[styles.groupHeaderBox, { flex: 1 }]}>
          <Text style={styles.groupHeaderText}>Classification</Text>
        </View>

        <View style={[styles.groupHeaderBox, { flex: 2 }]}>
          <Text style={styles.groupHeaderText}>Capacity</Text>
          <View style={styles.subHeaderRow}>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>Area (sqm)</Text>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>
              Current No. of Occupants
            </Text>
          </View>
        </View>

        <View style={[styles.groupHeaderBox, { flex: 3 }]}>
          <Text style={styles.groupHeaderText}>ACU</Text>
          <View style={styles.subHeaderRow}>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>No. of Units</Text>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>Capacity</Text>
            <Text style={[styles.subHeaderText, { flex: 1 }]}>Type</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // =========================
  // RENDER ROW
  // =========================
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.room_id || "-"}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.building || "-"}</Text>
      <Text style={styles.cell}>{item.room_flr || "-"}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.room_name || "-"}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.occupant || "-"}</Text>
      <Text style={styles.cell}>{item.classification || "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.area_sqm || "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.current_occupants || "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.no_of_units || "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.capacity || "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.type || "-"}</Text>
    </View>
  );

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading rooms...</Text>
      </View>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search + Filters Row */}
        <View style={styles.filtersRow}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <SearchBar
              placeholder="Search rooms..."
              onSearch={(query) => {
                setSearchQuery(query);
                setBuildingFilter(""); // reset all filters when typing
                setFloorFilter("");
                setClassificationFilter("");
              }}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 4 }}>
            {/* Building Filter */}
            <Picker
              selectedValue={buildingFilter}
              style={[styles.picker, { width: 150 }]}
              onValueChange={(value) => {
                setBuildingFilter(value);
                setSearchQuery(""); // clear search when using filter
              }}
            >
              <Picker.Item label="All Buildings" value="" />
              {uniqueBuildings.map((b, i) => (
                <Picker.Item key={i} label={b} value={b} />
              ))}
            </Picker>

            {/* Floor Filter */}
            <Picker
              selectedValue={floorFilter}
              style={[styles.picker, { width: 120 }]}
              onValueChange={(value) => {
                setFloorFilter(value);
                setSearchQuery("");
              }}
            >
              <Picker.Item label="All Floors" value="" />
              {uniqueFloors.map((f, i) => (
                <Picker.Item key={i} label={f} value={f} />
              ))}
            </Picker>

            {/* Classification Filter */}
            <Picker
              selectedValue={classificationFilter}
              style={[styles.picker, { width: 150 }]}
              onValueChange={(value) => {
                setClassificationFilter(value);
                setSearchQuery("");
              }}
            >
              <Picker.Item label="All Classifications" value="" />
              <Picker.Item label="No Classification" value="__none__" />
              {uniqueClassifications.map((c, i) => (
                <Picker.Item key={i} label={c} value={c} />
              ))}
            </Picker>
          </ScrollView>
        </View>

        {/* Table */}
        <FlatList
          data={filteredData}
          ListHeaderComponent={renderTableHeader}
          renderItem={renderRow}
          keyExtractor={(item) => item.room_id.toString()}
        />
      </View>
    </View>
  );
};

export default Rooms;

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
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
  cell: { flex: 1, fontSize: 12, color: "#333", paddingLeft: 5 },
  groupHeaderBox: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 2,
  },
  groupHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  subHeaderRow: { flexDirection: "row" },
  subHeaderText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 5,
    borderLeftWidth: 1,
    borderColor: "#fff",
  },
});
