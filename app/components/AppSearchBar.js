import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native";

import colors from "../config/colors";

function AppSearchBar({ data }) {
  return (
    <View style={styles.containerSearchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rezept suchen.."
        placeholderTextColor="white"
        onChangeText={(text) => data.map((entity) => console.log(entity))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearchBar: {
    width: "100%",
    height: 70,
    backgroundColor: "#252634",

    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: "yellow",
    borderRadius: 8,
    backgroundColor: colors.dark,
    color: "white",
  },
});

export default AppSearchBar;
