import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Picker,
} from "react-native";
import SidebarHeader from "../components/SidebarHeader";

const Notifications = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // ---------------------------
  // FETCH FEEDBACK AS NOTIFICATIONS
  // ---------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:5000/feedback") // same endpoint as Feedback.js
      .then((res) => res.json())
      .then((data) => {
        // Add 'seen' flag for notification purposes
        const processed = (Array.isArray(data) ? data : []).map((f) => ({
          ...f,
          seen: false,
        }));
        setFeedback(processed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, []);

  // ---------------------------
  // UNIQUE CATEGORIES FOR FILTER
  // ---------------------------
  const uniqueCategories = [...new Set(feedback.map((f) => f.category).filter(Boolean))];

  // ---------------------------
  // FILTERED NOTIFICATIONS
  // ---------------------------
  const filteredNotifications = feedback.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      item.email?.toLowerCase().includes(q) ||
      item.message?.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // ---------------------------
  // MARK ALL AS SEEN
  // ---------------------------
  const markAllAsSeen = () => {
    setFeedback((prev) => prev.map((f) => ({ ...f, seen: true })));
  };

  useEffect(() => {
    markAllAsSeen();
  }, [feedback.length]); // mark as seen once notifications load

  // ---------------------------
  // RENDER ITEM
  // ---------------------------
  const renderItem = ({ item }) => (
    <View style={[styles.notificationItem, !item.seen && styles.unseen]}>
      <Text style={[styles.emailText]}>{item.email}</Text>
      <Text style={[styles.categoryText]}>{item.category}</Text>
      <Text style={[styles.messageText]}>{item.message}</Text>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text>Loading notifications...</Text>
      </View>
    );
  }

  // ---------------------------
  // MAIN RENDER
  // ---------------------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <SidebarHeader notifications={feedback.length} />

      <View style={styles.container}>
        {/* SEARCH & FILTER */}
        <View style={styles.filtersContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by email or message..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Picker
            selectedValue={categoryFilter}
            style={styles.picker}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <Picker.Item label="All Categories" value="" />
            {uniqueCategories.map((c, i) => (
              <Picker.Item key={i} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.feedback_id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No new feedback</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },

  /* SEARCH & FILTER */
  filtersContainer: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  searchInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    color: "#333",
  },
  picker: { flex: 1, height: 40 },

  /* NOTIFICATION ITEM */
  notificationItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  unseen: { backgroundColor: "#e6f0ff" },
  emailText: { fontWeight: "600", fontSize: 14, color: "#333" },
  categoryText: { fontSize: 12, color: "#b30000", marginBottom: 4 },
  messageText: { fontSize: 13, color: "#555" },
  timestampText: { fontSize: 11, color: "#999", marginTop: 4 },

  emptyText: { fontSize: 16, color: "#aaa", textAlign: "center", marginTop: 20 },

  /* CENTER LOADING */
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Notifications;
