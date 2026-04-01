import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MenuItem = ({ title, onPress, iconName, notifications = 0, isActive = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View style={styles.content}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={22}
            color={isActive ? "red" : "black"}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>

        {notifications > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{notifications}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  activeText: {
    color: "red",
    fontWeight: "bold",
  },
  notificationBadge: {
    backgroundColor: "red",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MenuItem;
