// /screens/Accounts.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";

import SidebarHeader from "../components/SidebarHeader"; // ✅ IMPORT

const Users = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH USER ACCOUNTS
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAccounts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  // =========================
  // SAFE SEARCH FILTER
  // =========================
  const filteredAccounts = accounts.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      String(item.id || "").toLowerCase().includes(q) ||
      String(item.firstName || "").toLowerCase().includes(q) ||
      String(item.middleName || "").toLowerCase().includes(q) ||
      String(item.lastName || "").toLowerCase().includes(q) ||
      String(item.email || "").toLowerCase().includes(q)
    );
  });

  // =========================
  // RENDER ROW
  // =========================
  const renderRow = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.firstName}</Text>
      <Text style={styles.cell}>{item.middleName || "-"}</Text>
      <Text style={styles.cell}>{item.lastName}</Text>
      <Text style={styles.cell}>{item.email}</Text>
    </View>
  );

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading user accounts...</Text>
      </View>
    );
  }

  // =========================
  // MAIN VIEW
  // =========================
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ✅ Custom Header */}
      <SidebarHeader />

      <View style={styles.container}>
        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by ID, name, or email..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#777"
        />

        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={styles.headerCell}>USER ID</Text>
          <Text style={styles.headerCell}>FIRST NAME</Text>
          <Text style={styles.headerCell}>MIDDLE NAME</Text>
          <Text style={styles.headerCell}>LAST NAME</Text>
          <Text style={styles.headerCell}>EMAIL</Text>
  
        </View>

        {/* Table */}
        <FlatList
          data={filteredAccounts}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No accounts found</Text>
          }
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total Accounts: {filteredAccounts.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Users;

// =========================
// STYLES
// =========================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: "#f5b5b5",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  cell: { flex: 1, fontSize: 12, textAlign: "center", color: "#333" },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  footer: { marginTop: 10, alignItems: "flex-end" },
  footerText: { fontSize: 12, color: "#555", fontStyle: "italic" },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
});
