import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { useState } from "react/cjs/react.development";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function ApfelScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Screen>
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
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default ApfelScreen;
