import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
} from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/app";
import { auth } from "../../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height, width } = Dimensions.get("window");

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("männlich");

  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: name,
          photoURL:
            "https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
        });
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            age,
            weight,
            height,
          });
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
            <AppText>Konto erstellen</AppText>
            <TextInput
              keyboardAppearance="dark"
              style={styles.input}
              value={name}
              placeholder="Vor- und Nachname"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <View
              style={{
                flex: 1,
                width: "60%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#262736",
                marginTop: 20,
                paddingLeft: 15,
                height: Platform.OS === "android" ? null : 80,
                overflow: "hidden",
                borderRadius: 6,
              }}
            >
              <AppText fontSize={14}>Geschlecht</AppText>
              <Picker
                style={{
                  width: "60%",
                  color: "white",
                  paddingVertical: Platform.OS === "android" ? 20 : 0,
                  height: Platform.OS === "android" ? 30 : null,
                  fontSize: 12,
                }}
                itemStyle={{ color: "white" }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item label="Männlich" value="männlich" />
                <Picker.Item label="Weiblich" value="weiblich" />
              </Picker>
            </View>
            <TextInput
              keyboardAppearance="dark"
              keyboardType="numeric"
              style={styles.input}
              value={age}
              placeholder="Alter"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setAge(text);
              }}
            />
            <TextInput
              keyboardAppearance="dark"
              keyboardType="numeric"
              style={styles.input}
              value={weight}
              placeholder="Gewicht in kg"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setWeight(text);
              }}
            />
            <TextInput
              keyboardAppearance="dark"
              keyboardType="numeric"
              style={styles.input}
              value={height}
              placeholder="Grösse in cm"
              placeholderTextColor="white"
              onChangeText={(text) => {
                setHeight(text);
              }}
            />
            <TextInput
              keyboardType="email-address"
              keyboardAppearance="dark"
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
              secureTextEntry
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
              title="Konto erstellen"
              onPress={() => onSignUp()}
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
    marginTop: height / 10,
  },
});

export default RegisterScreen;
