import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigationState } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";  
import logo from "../assets/LogoNav.png";

const Sidebar = (props) => {
  const { navigation } = props;

  const state = useNavigationState((state) => state);
  const currentRoute = state?.routeNames[state.index];

  const menuItems = [

    { name: "Dashboard", icon: "grid-outline" },
    { name: "Building", icon: "business-outline" },
    { name: "Rooms", icon: "school-outline" },
    { name: "Landmark", icon: "location-outline" },
    { name: "Pathway", icon: "map-outline" },
    { name: "Feedback", icon: "chatbubble-ellipses-outline" },
    { name: "Users", icon: "people-outline" },
    { name: "Logs", icon: "time-outline" },
    { name: "Settings", icon: "settings-outline" },
    { name: "Logout", icon: "log-out-outline" },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        {menuItems.map((item) => {
          const isActive = currentRoute === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => navigation.navigate(item.name)}
              style={styles.menuItem}
            >
              <View style={styles.menuItemContent}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isActive ? "red" : "black"}
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={[
                    styles.menuText,
                    isActive && { color: "red", fontWeight: "bold" },
                  ]}
                >
                  {item.name}
                </Text>

            
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  menuItem: {
    marginVertical: 10,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
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

export default Sidebar;
