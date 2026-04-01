// /screens/Feedback.js
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import SidebarHeader from "../components/SidebarHeader";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // ---------------------------
  // FETCH FEEDBACK
  // ---------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:5000/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedback(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setLoading(false);
      });
  }, []);

  // ---------------------------
  // UNIQUE CATEGORY FOR PICKER
  // ---------------------------
  const uniqueCategories = useMemo(
    () => [...new Set(feedback.map((f) => f.category).filter(Boolean))],
    [feedback]
  );

  // ---------------------------
  // FILTERED FEEDBACK
  // ---------------------------
  const filteredFeedback = useMemo(() => {
    return feedback.filter((item) => {
      const q = searchQuery.toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        item.email?.toLowerCase().includes(q) ||
        item.message?.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [feedback, searchQuery, categoryFilter]);

  // ---------------------------
  // RENDER ROW
  // ---------------------------
  const renderRow = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.email}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.category}</Text>
      <Text style={[styles.cell, { flex: 3 }]}>{item.message}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.timestamp}</Text>
    </View>
  );

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading feedback...</Text>
      </View>
    );
  }

  // ---------------------------
  // MAIN VIEW
  // ---------------------------
  return (
    <View style={styles.screen}>
      <SidebarHeader notifications={feedback.length} />

      <View style={styles.container}>
        {/* SEARCH AND FILTERS */}
        <View style={styles.filtersContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by email or message..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Picker
            selectedValue={categoryFilter}
            style={styles.picker}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <Picker.Item label="All Categories" value="" />
            {uniqueCategories.map((c, i) => (
              <Picker.Item key={i} label={c} value={c} />
            ))}
          </Picker>
        </View>

        {/* TABLE HEADER */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>EMAIL</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>CATEGORY</Text>
          <Text style={[styles.headerCell, { flex: 3 }]}>MESSAGE</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>TIME</Text>
        </View>

        {/* FEEDBACK LIST */}
        <FlatList
          data={filteredFeedback}
          renderItem={renderRow}
          keyExtractor={(item) => item.feedback_id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No feedback found</Text>
          }
        />

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total Feedback: {filteredFeedback.length}
          </Text>
        </View>
      </View>

      {/* ============================
          ANNOUNCEMENT NAVIGATION BUTTON
      ============================ */}
      <View style={styles.iconNavBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Announcement")} // navigate to Announcement.js
        >
          <MaterialIcons name="announcement" size={26} color="#b30000" />
          <Text style={styles.iconText}>Announcement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ============================
    STYLES
============================ */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  /* SEARCH AND FILTERS ROW */
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    color: "#333",
  },
  picker: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
  },

  /* TABLE STYLES */
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
    alignItems: "center",
  },
  headerRow: { backgroundColor: "#f5b5b5" },
  cell: { flex: 1, fontSize: 12, textAlign: "center", color: "#333" },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
  footer: { marginTop: 10, alignItems: "flex-end" },
  footerText: { fontSize: 12, color: "#555", fontStyle: "italic" },

  /* ICON NAV BAR */
  iconNavBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  iconButton: { alignItems: "center" },
  iconText: { marginTop: 4, fontSize: 12, color: "#333", textAlign: "center" },
});

export default Feedback;
