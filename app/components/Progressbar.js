import React from "react";
import { View, StyleSheet } from "react-native";

function Progressbar({ width, ...otherProps }) {
  if (parseInt(width) > 100) {
    width = "100%";
  }
  return (
    <View style={styles.container}>
      <View style={styles.progressBackground} />
      <View {...otherProps} style={[styles.progressBar, { width }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    position: "absolute",
    height: 6,
    borderRadius: 100,
    backgroundColor: "white",
    width: "30%",
    alignSelf: "flex-start",
  },
  progressBackground: {
    width: "100%",
    height: 5,
    backgroundColor: "#ab8feb",
    borderRadius: 3,
    marginVertical: 3,
  },
});

export default Progressbar;
