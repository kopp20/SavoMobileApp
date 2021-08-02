import React from "react";
import { View, StyleSheet, Modal, Dimensions } from "react-native";
import AppText from "../components/AppText";
import * as Progress from "react-native-progress";
import Screen from "../components/Screen";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

function UploadScreen({ progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <Screen>
        <View style={styles.container}>
          <LottieView
            speed={2}
            style={{
              width: width / 2,
            }}
            autoPlay
            loop={false}
            source={require("../assets/animations/972-done.json")}
          />
        </View>
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default UploadScreen;
