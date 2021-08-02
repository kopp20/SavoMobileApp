import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { auth } from "../../firebase";

function SonstigesScreen(props) {
  const handleLogOut = () => {
    auth
      .signOut()
      .then(function (result) {
        // Sign-out successful.
        console.log(result);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() =>
            props.navigation.navigate("myData", { title: "Meine Daten" })
          }
        >
          <View
            style={{
              height: 50,
              width: "100%",
              borderRadius: 8,
              backgroundColor: "#262736",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <AntDesign name="database" size={15} color="white" />
            <AppText fontSize={15}> Meine Daten</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "100%", marginTop: 20 }}
          onPress={() => handleLogOut()}
        >
          <View
            style={{
              height: 50,
              width: "100%",
              borderRadius: 8,
              backgroundColor: "#262736",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="logout" size={15} color="white" />
            <AppText fontSize={15}> Ausloggen</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default SonstigesScreen;
