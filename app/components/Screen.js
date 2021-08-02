import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Dimensions } from "react-native";

import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <View style={[style, styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    /*  paddingTop: Constants.statusBarHeight, */
    flex: 1,
    backgroundColor: colors.dark,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
