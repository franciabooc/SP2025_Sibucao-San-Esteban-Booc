import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get current route

  // Updated buttons with Pathway icon as Ionicons
  const buttons = [
    { name: "Pathway", icon: "map-outline", type: "Ionicons", screen: "Pathway" },
    { name: "Renovation", icon: "construction", type: "MaterialIcons", screen: "Renovation" },
    { name: "Relocation", icon: "people-carry", type: "FontAwesome5", screen: "Relocation" },
  ];

  return (
    <View style={styles.navBar}>
      {buttons.map((btn) => {
        const isActive = route.name === btn.screen;

        return (
          <TouchableOpacity
            key={btn.screen}
            style={styles.iconButton}
            onPress={() => {
              if (!isActive) navigation.navigate(btn.screen);
            }}
          >
            {btn.type === "MaterialIcons" ? (
              <MaterialIcons
                name={btn.icon}
                size={26}
                color={isActive ? "#b30000" : "#555"}
              />
            ) : btn.type === "FontAwesome5" ? (
              <FontAwesome5
                name={btn.icon}
                size={24}
                color={isActive ? "#b30000" : "#555"}
              />
            ) : (
              <Ionicons
                name={btn.icon}
                size={26}
                color={isActive ? "#b30000" : "#555"}
              />
            )}
            <Text style={[styles.iconText, { color: isActive ? "#b30000" : "#333" }]}>
              {btn.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
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

export default BottomNavBar;
