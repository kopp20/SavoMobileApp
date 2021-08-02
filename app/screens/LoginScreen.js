import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { auth } from "../../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Screen>
      <TouchableWithoutFeedback
        style={{ zIndex: 0 }}
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          extraHeight={200}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <AppText>Einloggen</AppText>

            <TextInput
              keyboardAppearance="dark"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.input}
              value={email}
              placeholder="Email"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              secureTextEntry
              keyboardAppearance="dark"
              autoCorrect={false}
              style={styles.input}
              value={password}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setPassword(text);
              }}
            />

            <AppButton
              backgroundColor="#976DF6"
              style={{ padding: 10, paddingHorizontal: 20, marginTop: 30 }}
              title="Einloggen"
              onPress={() => {
                onSignIn();
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "60%",
    height: 40,
    backgroundColor: "#252634",
    marginTop: 20,
    paddingLeft: 15,
    borderRadius: 5,
    color: "white",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: height / 6,
  },
});

export default LoginScreen;
