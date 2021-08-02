import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

function Tab({ color, tab, onPress, icon, size }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon == "home" && <FontAwesome name="home" size={25} color={color} />}
      {icon == "chef-hat" && (
        <MaterialCommunityIcons name="chef-hat" size={25} color={color} />
      )}
      {icon == "chat" && <Entypo name="chat" size={25} color={color} />}
      {icon == "settings" && (
        <Ionicons name="settings" size={25} color={color} />
      )}

      {/*  <Text style={[{ color }, styles.text]}>{tab.name}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default Tab;
