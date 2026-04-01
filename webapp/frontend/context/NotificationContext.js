import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unseenCount, setUnseenCount] = useState(0);

  const markAllAsSeen = () => {
    setUnseenCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{ unseenCount, setUnseenCount, markAllAsSeen }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
