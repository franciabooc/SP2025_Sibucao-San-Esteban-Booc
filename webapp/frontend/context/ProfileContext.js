import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profilePic, setProfilePicState] = useState("");

  // Load saved profile picture on mount
  useEffect(() => {
    const loadProfilePic = async () => {
      try {
        const storedAdmin = await AsyncStorage.getItem("adminData");
        if (storedAdmin) {
          const admin = JSON.parse(storedAdmin);
          if (admin.profilePic) setProfilePicState(admin.profilePic);
        }
      } catch (err) {
        console.error("Failed to load profilePic:", err);
      }
    };
    loadProfilePic();
  }, []);

  // Wrapped setter to persist to AsyncStorage
  const setProfilePic = async (uri) => {
    try {
      setProfilePicState(uri);
      const storedAdmin = await AsyncStorage.getItem("adminData");
      if (storedAdmin) {
        const admin = JSON.parse(storedAdmin);
        admin.profilePic = uri;
        await AsyncStorage.setItem("adminData", JSON.stringify(admin));
      }
    } catch (err) {
      console.error("Failed to save profilePic:", err);
    }
  };

  return (
    <ProfileContext.Provider value={{ profilePic, setProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};
