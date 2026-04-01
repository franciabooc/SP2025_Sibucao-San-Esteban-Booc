import React, { useEffect, useState, createContext } from "react";
import { View, ActivityIndicator, Text, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { AppProvider as OriginalAppProvider } from "./context/AppContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProfileProvider } from "./context/ProfileContext";

// Screens
import Login from "./screens/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import Feedback from "./screens/Feedback";
import Announcement from "./screens/Announcement";
import EmergencyLight from "./screens/EmergencyLight";
import FireExitSignages from "./screens/FireExitSignages";
import FireExtinguisher from "./screens/FireExtinguisher";
import Users from "./screens/Users";
import Landmark from "./screens/Landmark";
import Building from "./screens/Building";
import Rooms from "./screens/Rooms";
import Pathway from "./screens/Pathway";
import Renovation from "./screens/Renovation";
import Relocation from "./screens/Relocation";
import Logs from "./screens/Logs";
import Settings from "./screens/Settings";
import Logout from "./screens/Logout";

// Icons
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

/* =========================
   DYNAMIC BACKEND URL
========================= */
export const getBackendURL = () => {
  if (Platform.OS === "android") return "http://10.0.2.2:5000/feedback";
  if (Platform.OS === "ios") return "http://localhost:5000/feedback";
  const ip = Constants.manifest?.debuggerHost?.split(":")[0] || "192.168.1.100";
  return `http://${ip}:5000/feedback`;
};

/* =========================
   APP CONTEXT
========================= */
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const backendURL = getBackendURL();
  return (
    <AppContext.Provider value={{ backendURL }}>
      <OriginalAppProvider>{children}</OriginalAppProvider>
    </AppContext.Provider>
  );
};

/* =========================
   DRAWER SCREENS
========================= */
function DrawerScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        swipeEnabled: false,
        overlayColor: "rgba(0,0,0,0.4)",
        drawerStyle: { width: 250, backgroundColor: "#fff" },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerLabel: "Notifications",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          drawerLabel: "Feedback",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="feedback" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen name="Building" component={Building} />
      <Drawer.Screen name="Rooms" component={Rooms} />
      <Drawer.Screen name="Pathway" component={Pathway} />
      <Drawer.Screen name="Landmark" component={Landmark} />
      <Drawer.Screen name="Logs" component={Logs} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Announcement" component={Announcement} />
      <Drawer.Screen
        name="EmergencyLight"
        component={EmergencyLight}
        options={{
          drawerLabel: "Emergency Light",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="emergency" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FireExitSignages"
        component={FireExitSignages}
        options={{
          drawerLabel: "Fire Exit Signages",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="exit-to-app" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FireExtinguisher"
        component={FireExtinguisher}
        options={{
          drawerLabel: "Fire Extinguisher",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="fire-extinguisher" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Renovation"
        component={Renovation}
        options={{
          drawerLabel: "Renovation",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="build" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Relocation"
        component={Relocation}
        options={{
          drawerLabel: "Relocation",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="location-on" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

/* =========================
   MAIN APP
========================= */
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login");
  const [initialNavState, setInitialNavState] = useState();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("adminData");
        const savedNavState = await AsyncStorage.getItem("NAVIGATION_STATE");

        setInitialRoute(storedSession ? "Main" : "Login");
        if (savedNavState) setInitialNavState(JSON.parse(savedNavState));
      } catch (error) {
        console.error("Error restoring state:", error);
      } finally {
        setIsReady(true);
      }
    };
    restoreSession();
  }, []);

  const handleNavStateChange = async (state) => {
    try {
      await AsyncStorage.setItem("NAVIGATION_STATE", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving navigation state:", error);
    }
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text style={{ marginTop: 10 }}>Restoring session...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <ProfileProvider>
            <NavigationContainer
              initialState={initialNavState}
              onStateChange={handleNavStateChange}
            >
              <Stack.Navigator
                initialRouteName={initialRoute}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={DrawerScreens} />
              </Stack.Navigator>
            </NavigationContainer>
          </ProfileProvider>
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
  );
}
