import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ import
import SidebarHeader from "../components/SidebarHeader";

const BASE = "http://127.0.0.1:5000";

const Logs = () => {
  const [logsData, setLogsData] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminEmail, setAdminEmail] = useState(null); // ✅ store current admin

  // Load admin email from AsyncStorage
  const loadAdmin = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("adminData");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAdminEmail(parsed.email_acc);
      }
    } catch (err) {
      console.error("Failed to load admin from storage:", err);
    }
  }, []);

  // Fetch logs from backend
  const fetchLogs = useCallback(async () => {
    try {
      setLoadingLogs(true);
      const res = await fetch(`${BASE}/admin/logs`);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }
      const data = await res.json();
      setLogsData(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching logs:", e);
      Alert.alert("Error", "Could not fetch admin logs.");
      setLogsData([]);
    } finally {
      setLoadingLogs(false);
    }
  }, []);

  // Log admin activity
  const logAction = async ({ action, object_type, object_name }) => {
    try {
      await fetch(`${BASE}/admin/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail ?? "Unknown", // ✅ send admin email
        },
        body: JSON.stringify({ action, object_type, object_name }),
      });
    } catch (err) {
      console.error("Failed to log action:", err);
    }
  };

  // Load admin & fetch logs on mount
  useEffect(() => {
    loadAdmin().then(() => {
      fetchLogs();
      logAction({
        action: "view",
        object_type: "logs_screen",
        object_name: "Admin viewed logs",
      });
    });
  }, [loadAdmin]);

  // Log search activity
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timeout = setTimeout(() => {
        logAction({
          action: "search",
          object_type: "logs_screen",
          object_name: `Search query: "${searchQuery}"`,
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchQuery, adminEmail]);

  // Filter logs
  const filteredLogs = logsData.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const combined = `${item.id ?? ""} ${item.admin ?? ""} ${item.action ?? ""} ${item.object_type ?? ""} ${item.object_name ?? ""} ${item.timestamp ?? ""}`;
    return combined.toLowerCase().includes(q);
  });

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id ?? "-"}</Text>
      <Text style={styles.cell}>{item.admin ?? "-"}</Text>
      <Text style={styles.cell}>{item.action ?? "-"}</Text>
      <Text style={styles.cell}>{item.object_type ?? "-"}</Text>
      <Text style={styles.cell}>{item.object_name ?? "-"}</Text>
      <Text style={styles.cell}>{item.timestamp ?? "-"}</Text>
    </View>
  );

  if (loadingLogs) {
    return (
      <View style={{ flex: 1 }}>
        <SidebarHeader notifications={logsData.length} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="darkred" />
          <Text>Loading logs...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SidebarHeader notifications={logsData.length} />

      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by admin, action, object..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}>Nr</Text>
          <Text style={styles.headerCell}>Admin</Text>
          <Text style={styles.headerCell}>Action</Text>
          <Text style={styles.headerCell}>Type</Text>
          <Text style={styles.headerCell}>Object</Text>
          <Text style={styles.headerCell}>Timestamp</Text>
        </View>

        <FlatList
          data={filteredLogs}
          renderItem={renderRow}
          keyExtractor={(item, idx) =>
            item.id ? String(item.id) : String(idx)
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {logsData.length === 0
                ? "No logs available."
                : "No logs match filter."}
            </Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  headerRow: { backgroundColor: "#f0c14b" },
  cell: { flex: 1, fontSize: 12, textAlign: "center", color: "#333" },
  headerCell: { flex: 1, fontSize: 12, textAlign: "center", fontWeight: "700" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 18 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#777" },
});

export default Logs;
