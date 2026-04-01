import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { ProfileContext } from "../context/ProfileContext";

const Profile = () => {
  const navigation = useNavigation();
  const { profilePic, setProfilePic } = useContext(ProfileContext);

  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Administrator");

  // Load admin info from AsyncStorage
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
        if (admin.profilePic) setProfilePic(admin.profilePic); // update context
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
      Alert.alert("Error", "Could not load your profile data.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Pick image from gallery
  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "We need access to your photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setProfilePic(uri); // update context

        // Save to AsyncStorage
        const storedAdmin = await AsyncStorage.getItem("adminData");
        if (storedAdmin) {
          const admin = JSON.parse(storedAdmin);
          admin.profilePic = uri;
          await AsyncStorage.setItem("adminData", JSON.stringify(admin));
        }
      }
    } catch (err) {
      console.error("Image pick error:", err);
      Alert.alert("Error", "Could not select image.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.hamburger}
        >
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Admin Panel</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{role}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.profilePicWrapper}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <Ionicons name="person-circle-outline" size={100} color="#d32f2f" />
            )}
            <Text style={styles.uploadText}>Tap to change picture</Text>
          </TouchableOpacity>

          <View style={styles.profileItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{adminName}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{role}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#d32f2f",
  },
  hamburger: { paddingRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", flex: 1, textAlign: "center" },
  badge: { backgroundColor: "#ff8c00", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    alignItems: "center",
  },
  profilePicWrapper: { alignItems: "center", marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  uploadText: { fontSize: 12, color: "#888" },
  profileItem: { width: "100%", marginBottom: 15 },
  label: { fontWeight: "600", color: "#555", marginBottom: 4, fontSize: 14 },
  value: { color: "#333", fontSize: 16, fontWeight: "500" },
});

export default Profile;
