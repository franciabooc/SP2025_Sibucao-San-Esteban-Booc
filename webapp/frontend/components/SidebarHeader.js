import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NotificationContext } from "../context/NotificationContext";
import { ProfileContext } from "../context/ProfileContext";

const SidebarHeader = () => {
  const navigation = useNavigation();
  const { unseenCount } = useContext(NotificationContext);
  const { profilePic } = useContext(ProfileContext); // get profile picture

  return (
    <View style={styles.header}>
      {/* Left Hamburger */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu-outline" size={26} color="#000" />
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.actions}>
        {/* Notifications */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={22} color="#000" />
          {unseenCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unseenCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate("Profile")}
        >
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              style={styles.profileImage}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={22} color="#000" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e6eb",
  },
  actions: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrapper: { position: "relative" },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold", textAlign: "center" },
  profileImage: { width: 22, height: 22, borderRadius: 11 },
});

export default SidebarHeader;
