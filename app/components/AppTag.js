import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../components/AppText";

function AppTag({ children, style, key }) {
  return (
    <AppText style={[styles.container, style]} key={key}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#976DF6",
    marginBottom: 10,
    marginRight: 10,
    fontSize: 12,
    borderRadius: 5,
    overflow: "hidden",
  },
});

export default AppTag;
