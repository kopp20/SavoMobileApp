import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
const logo = require("../assets/SAVO_LOGO.png");

function LandingScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.background}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <AppText style={styles.text}>Anmelden</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Register");
            }}
            style={[
              styles.button,
              { backgroundColor: "#753df3", paddingVertical: 50 },
            ]}
          >
            <AppText style={styles.text}>Konto erstellen</AppText>
          </TouchableOpacity>
        </View>
        <Image style={styles.logo} resizeMethod="scale" source={logo} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1 },
  button: {
    backgroundColor: "#976DF6",
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
    alignItems: "center",
  },

  background: {
    justifyContent: "flex-end",
    flex: 1,
    width: "100%",
  },
  logo: {
    zIndex: 1,
    position: "absolute",
    top: 170,
    width: 200,
    height: 80,
  },
});

export default LandingScreen;
