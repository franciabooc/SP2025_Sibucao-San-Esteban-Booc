import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const IconNavBar = ({ navigation, activeScreen }) => {
  const icons = [
    { name: "Building", icon: "business-outline", type: "Ionicons", screen: "Building" },
    { name: "Emergency Light", icon: "emergency", type: "MaterialIcons", screen: "EmergencyLight" },
    { name: "Fire Exit", icon: "exit-to-app", type: "MaterialIcons", screen: "FireExitSignages" },
    { name: "Extinguisher", icon: "fire-extinguisher", type: "FontAwesome5", screen: "FireExtinguisher" },
  ];

  return (
    <View style={styles.iconNavBar}>
      {icons.map((item) => {
        const isActive = activeScreen === item.screen;
        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.iconButton}
            onPress={() => {
              if (!isActive) navigation.navigate(item.screen);
            }}
          >
            {item.type === "MaterialIcons" ? (
              <MaterialIcons
                name={item.icon}
                size={26}
                color={isActive ? "#b30000" : "#555"}
              />
            ) : item.type === "FontAwesome5" ? (
              <FontAwesome5
                name={item.icon}
                size={24}
                color={isActive ? "#b30000" : "#555"}
              />
            ) : (
              <Ionicons
                name={item.icon}
                size={26}
                color={isActive ? "#b30000" : "#555"}
              />
            )}
            <Text style={[styles.iconText, { color: isActive ? "#b30000" : "#333" }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  iconNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconButton: { alignItems: "center" },
  iconText: { marginTop: 4, fontSize: 12, textAlign: "center" },
});

export default IconNavBar;
