import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import SidebarHeader from "../components/SidebarHeader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [users, setUsers] = useState([]);
  const [fireExitSignages, setFireExitSignages] = useState([]);
  const [fireExtinguishers, setFireExtinguishers] = useState([]);
  const [emergencyLights, setEmergencyLights] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [renovations, setRenovations] = useState([]);
  const [relocations, setRelocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:5000/rooms").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/buildings").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/users").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/fire_exit_signages").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/fire_extinguishers").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/emergency_lights").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/landmarks").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/pathway").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/renovation").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/relocation").then((res) => res.json()),
    ])
      .then(
        ([
          roomsData,
          buildingsData,
          usersData,
          signagesData,
          extinguishersData,
          lightsData,
          landmarksData,
          pathwaysData,
          renovationsData,
          relocationsData,
        ]) => {
          setRooms(Array.isArray(roomsData) ? roomsData : []);
          setBuildings(Array.isArray(buildingsData) ? buildingsData : []);
          setUsers(Array.isArray(usersData) ? usersData : []);
          setFireExitSignages(Array.isArray(signagesData) ? signagesData : []);
          setFireExtinguishers(Array.isArray(extinguishersData) ? extinguishersData : []);
          setEmergencyLights(Array.isArray(lightsData) ? lightsData : []);
          setLandmarks(Array.isArray(landmarksData) ? landmarksData : []);
          setPathways(Array.isArray(pathwaysData) ? pathwaysData : []);
          setRenovations(Array.isArray(renovationsData) ? renovationsData : []);
          setRelocations(Array.isArray(relocationsData) ? relocationsData : []);
          setLoading(false);
        }
      )
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  // =========================
  // Rooms Chart
  // =========================
  const roomsPerBuilding = rooms.reduce((acc, room) => {
    const building = room.building || "Unknown";
    acc[building] = (acc[building] || 0) + 1;
    return acc;
  }, {});
  const roomsChartData = Object.entries(roomsPerBuilding).map(([name, value]) => ({
    name,
    value,
  }));

  // =========================
  // Pathways Chart
  // =========================
  const pathwaysPerType = pathways.reduce((acc, p) => {
    const type = p.type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const pathwaysChartData = Object.entries(pathwaysPerType).map(([name, value]) => ({
    name,
    value,
  }));

  // =========================
  // KPI Calculations
  // =========================
  const totalBuildings = buildings.length;
  const totalRooms = rooms.length;
  const totalUsers = users.length;
  const totalFireExitSignages = fireExitSignages.length;
  const totalFireExtinguishers = fireExtinguishers.length;
  const totalEmergencyLights = emergencyLights.length;
  const totalLandmarks = landmarks.length;
  const totalPathways = pathways.length;
  const totalRenovations = renovations.length;
  const totalRelocations = relocations.length;

  const functionalSignages = fireExitSignages.filter((s) => s.functional).length;
  const nonFunctionalSignages = totalFireExitSignages - functionalSignages;

  const functionalExtinguishers = fireExtinguishers.filter((f) => f.functional).length;
  const expiredExtinguishers = fireExtinguishers.filter((f) => {
    if (!f.expiration) return false;
    return new Date(f.expiration) < new Date();
  }).length;

  const functionalLights = emergencyLights.filter((l) => l.functional).length;
  const nonFunctionalLights = totalEmergencyLights - functionalLights;

  const monuments = landmarks.filter((l) => l.type === "MONUMENT").length;
  const foodstalls = landmarks.filter((l) => l.type === "FOODSTALL").length;
  const evacuationSites = landmarks.filter((l) => l.type.startsWith("EVACUATION")).length;

  // =========================
  // Fix Renovation KPI counts
  // =========================
  const ongoingRenovations = renovations.filter((r) => r.status?.toLowerCase() === "ongoing").length;
  const completedRenovations = renovations.filter((r) => r.status?.toLowerCase() === "completed").length;
  const pendingRenovations = renovations.filter((r) => r.status?.toLowerCase() === "pending").length;

  const ongoingRelocations = relocations.filter((r) => r.status?.toLowerCase() === "ongoing").length;
  const completedRelocations = relocations.filter((r) => r.status?.toLowerCase() === "completed").length;
  const pendingRelocations = relocations.filter((r) => r.status?.toLowerCase() === "pending").length;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SidebarHeader />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Rooms per Building Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Rooms per Building</Text>
          <Text style={styles.chartDescription}>
            Total number of rooms in each building.
          </Text>
          {roomsChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roomsChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#b30000" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No room data available.</Text>
          )}
        </View>

        {/* Pathways per Type Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Pathways per Type</Text>
          <Text style={styles.chartDescription}>
            Number of pathways categorized by type (Room-to-Room, Room-to-Building, Building-to-Building).
          </Text>
          {pathwaysChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pathwaysChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF5722" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No pathway data available.</Text>
          )}
        </View>

        {/* KPI Cards */}
        <View style={styles.row}>
          <Card label="Buildings" value={totalBuildings} description="Total number of buildings." color="#4CAF50" />
          <Card label="Rooms" value={totalRooms} description="Total number of rooms." color="#2196F3" />
          <Card label="Users" value={totalUsers} description="Total number of users." color="#FF9800" />
           <Card label="Pathways" value={totalPathways} description="Total pathways defined." color="#FF9800" />
          <Card
            label="Fire Exit Signages"
            value={`${totalFireExitSignages} (${functionalSignages} functional / ${nonFunctionalSignages} non-functional)`}
            description="Fire exit signages and their status."
            color="#F44336"
          />
          <Card
            label="Fire Extinguishers"
            value={`${totalFireExtinguishers} (${functionalExtinguishers} functional / ${expiredExtinguishers} expired)`}
            description="Fire extinguishers and their status."
            color="#9C27B0"
          />
          <Card
            label="Emergency Lights"
            value={`${totalEmergencyLights} (${functionalLights} functional / ${nonFunctionalLights} non-functional)`}
            description="Emergency lights status."
            color="#FF5722"
          />
          <Card
            label="Landmarks"
            value={`${totalLandmarks} (Monuments: ${monuments}, Foodstalls: ${foodstalls}, Evacuation: ${evacuationSites})`}
            description="Landmarks by type."
            color="#3F51B5"
          />
          
          <Card
            label="Renovations"
            value={`${totalRenovations} (Ongoing: ${ongoingRenovations}, Completed: ${completedRenovations}, Pending: ${pendingRenovations})`}
            description="Renovations and their status."
            color="#009688"
          />
          <Card
            label="Relocations"
            value={`${totalRelocations} (Ongoing: ${ongoingRelocations}, Completed: ${completedRelocations}, Pending: ${pendingRelocations})`}
            description="Relocations and their status."
            color="#607D8B"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Card = ({ label, value, color, description }) => (
  <View style={[styles.card, { backgroundColor: color + "20" }]}>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
    {description && <Text style={styles.cardDescription}>{description}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { paddingVertical: 20, paddingHorizontal: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 25 },
  card: {
    width: 180,
    minHeight: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 6,
    padding: 10,
  },
  value: { fontSize: 16, fontWeight: "bold" },
  label: { fontSize: 12, marginTop: 5, textAlign: "center" },
  cardDescription: { fontSize: 10, color: "#555", textAlign: "center", marginTop: 3 },
  chartContainer: { backgroundColor: "#f0f2f5", borderRadius: 10, padding: 10, marginBottom: 20 },
  chartTitle: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  chartDescription: { fontSize: 12, color: "#555", textAlign: "center", marginBottom: 10 },
});

export default Dashboard;
