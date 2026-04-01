// /screens/Announcement.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import SidebarHeader from "../components/SidebarHeader";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // ---------------------------
  // FETCH ANNOUNCEMENTS
  // ---------------------------
  const fetchAnnouncements = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/announcements")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching announcements:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ---------------------------
  // POST ANNOUNCEMENT
  // ---------------------------
  const postAnnouncement = () => {
    if (!newMessage.trim()) {
      Alert.alert("Error", "Message cannot be empty.");
      return;
    }

    const payload = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
    };

    fetch("http://127.0.0.1:5000/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        Alert.alert("Success", "Announcement posted.");
        setNewTitle("");
        setNewMessage("");
        fetchAnnouncements();
      })
      .catch(() => {
        Alert.alert("Error", "Failed to post announcement.");
      });
  };

  // ---------------------------
  // RENDER ANNOUNCEMENT CARD
  // ---------------------------
  const renderAnnouncement = ({ item }) => (
    <View style={styles.card}>
      {item.title ? <Text style={styles.cardTitle}>{item.title}</Text> : null}
      <Text style={styles.cardMessage}>{item.message}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading announcements...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SidebarHeader title="Announcements" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* CREATE ANNOUNCEMENT */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Create Announcement</Text>

          <TextInput
            style={styles.input}
            placeholder="Title (optional)"
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your announcement..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={postAnnouncement}>
            <Text style={styles.buttonText}>Post Announcement</Text>
          </TouchableOpacity>
        </View>

        {/* SENT ANNOUNCEMENTS */}
        <Text style={styles.sectionTitle}>Sent Announcements</Text>

        <FlatList
          data={announcements}
          renderItem={renderAnnouncement}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No announcements yet.</Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  /* FORM */
  formCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#b30000",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* ANNOUNCEMENT CARD */
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  cardMessage: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 11,
    color: "#999",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
  },
});

export default Announcement;
