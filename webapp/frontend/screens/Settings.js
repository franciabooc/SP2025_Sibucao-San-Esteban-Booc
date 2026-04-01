import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import SidebarHeader from "../components/SidebarHeader"; // ✅ fixed import

const Settings = () => {
  // ---- STATES ----
  const [mapTheme, setMapTheme] = useState("Default");
  const [defaultView, setDefaultView] = useState("Building");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Load admin info from AsyncStorage
  const loadAdminData = async () => {
    try {
      const storedAdmin = await AsyncStorage.getItem("adminData");
      if (storedAdmin) {
        const admin = JSON.parse(storedAdmin);
        const name = `${admin.f_name || admin.firstName || ""} ${
          admin.l_name || admin.lastName || ""
        }`.trim();
        setAdminName(name);
        setEmail(admin.email_acc || admin.email || "");
      }
    } catch (err) {
      console.error("❌ Error loading admin info:", err);
      Alert.alert("Error", "Could not load your profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // ---- HANDLERS ----
  const handleBackup = () => {
    Alert.alert("💾 Backup Started", "Database backup in progress...");
  };

  const handleRestore = () => {
    Alert.alert("📂 Restore Complete", "Data restoration successful.");
  };

  const handleSave = () => {
    Alert.alert("✅ Settings Saved", "Your preferences were updated successfully.");
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <SidebarHeader notifications={0} /> {/* optional: replace 0 with actual notifications */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#d32f2f" />
          <Text>Loading your admin profile...</Text>
        </View>
      </View>
    );
  }

  // ---- RENDER ----
  return (
    <View style={{ flex: 1 }}>
      <SidebarHeader notifications={0} /> {/* optional: replace 0 with actual notifications */}

      <ScrollView style={styles.container}>
        {/* MAP SETTINGS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="map" size={22} color="#d32f2f" />
            <Text style={styles.sectionTitle}>Map Settings</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Default View</Text>
            <View style={styles.optionGroup}>
              {["Building", "Pathway", "Landmark"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    defaultView === option && styles.optionActive,
                  ]}
                  onPress={() => setDefaultView(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      defaultView === option && styles.optionActiveText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Map Theme</Text>
            <View style={styles.optionGroup}>
              {["Default", "Dark", "Satellite"].map((theme) => (
                <TouchableOpacity
                  key={theme}
                  style={[
                    styles.optionButton,
                    mapTheme === theme && styles.optionActive,
                  ]}
                  onPress={() => setMapTheme(theme)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      mapTheme === theme && styles.optionActiveText,
                    ]}
                  >
                    {theme}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* SYSTEM CONFIGURATION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={22} color="#d32f2f" />
            <Text style={styles.sectionTitle}>System Configuration</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.label}>Maintenance Mode</Text>
            <Switch
              value={maintenanceMode}
              onValueChange={setMaintenanceMode}
              trackColor={{ false: "#ccc", true: "#f48fb1" }}
              thumbColor={maintenanceMode ? "#d32f2f" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* ADMIN INFORMATION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle" size={22} color="#d32f2f" />
            <Text style={styles.sectionTitle}>Administrator Profile</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Admin Name"
            value={adminName}
            editable={false} // 🔒 Read-only
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            editable={false} // 🔒 Read-only
          />
        </View>

        {/* BACKUP AND RESTORE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cloud-upload" size={22} color="#d32f2f" />
            <Text style={styles.sectionTitle}>Backup & Restore</Text>
          </View>

          <TouchableOpacity style={styles.backupButton} onPress={handleBackup}>
            <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Backup Data</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
            <Ionicons name="cloud-download-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Restore Data</Text>
          </TouchableOpacity>
        </View>

       {/* SAVE BUTTON  
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save All Settings</Text>
        </TouchableOpacity>*/}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// ---- STYLES ----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  section: {
    marginBottom: 25,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  sectionTitle: { fontSize: 17, fontWeight: "600", marginLeft: 8, color: "#d32f2f" },
  settingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  label: { fontSize: 14, color: "#333" },
  optionGroup: { flexDirection: "row" },
  optionButton: { borderWidth: 1, borderColor: "#ccc", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8 },
  optionActive: { backgroundColor: "#d32f2f", borderColor: "#d32f2f" },
  optionText: { fontSize: 13, color: "#333" },
  optionActiveText: { color: "#fff", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, fontSize: 14, marginBottom: 10, color: "#333" },
  backupButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#4CAF50", padding: 10, borderRadius: 6, marginBottom: 10 },
  restoreButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#2196F3", padding: 10, borderRadius: 6 },
  buttonText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
  saveButton: { backgroundColor: "#d32f2f", paddingVertical: 14, borderRadius: 8 },
  saveButtonText: { color: "#fff", fontSize: 15, textAlign: "center", fontWeight: "bold" },
});

export default Settings;
