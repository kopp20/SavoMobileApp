import React, { createContext, useContext, useState } from "react";
import { StyleSheet } from "react-native";

const TabBarContext = createContext();

function TabBarProvider({ children }) {
  const [showTabBar, setShowTabBar] = useState(true);
  return (
    <TabBarContext.Provider value={{ showTabBar, setShowTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
}

export const useTabBar = () => useContext(TabBarContext);

export default TabBarProvider;
