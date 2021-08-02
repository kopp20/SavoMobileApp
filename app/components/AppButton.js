import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

function AppButton({
  title,
  onPress,
  width,
  height,
  marginVertical = 10,
  borderRadius = 4,
  fontSize = 18,

  backgroundColor,
  style,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          width,
          height,
          marginVertical,
          borderRadius,
        },
        style,
      ]}
      onPress={onPress}
    >
      <AppText style={[styles.text, { fontSize }]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
  },
});

export default AppButton;
