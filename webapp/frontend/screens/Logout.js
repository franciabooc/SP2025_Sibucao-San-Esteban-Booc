import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Logout = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout(); // clear session
    navigation.replace("Login"); // go back to login screen
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Logout;
