import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { userInfo } from "../components/contexts/UserProvider";
import Screen from "../components/Screen";
import * as firebase from "firebase";

import { getUser } from "../config/firebaseFunctions";
import UploadScreen from "./UploadScreen";

const { height, width } = Dimensions.get("window");

function MyDataScreen(props) {
  const [queryKcal, setQueryKcal] = useState("2000");
  const [queryWeight, setQueryWeight] = useState("0");
  const [queryAge, setQueryAge] = useState("0");
  const [queryHeight, setQueryHeight] = useState("0");
  const [queryGen, setQueryGen] = useState("0");
  const [carbs, setCarbs] = useState("50");
  const [protein, setProtein] = useState("30");
  const [fat, setFat] = useState("20");
  const [user, setUser] = useState({});
  const [selectedType, setSelectedType] = useState("-");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    getUser().then((user) => {
      if (mounted) {
        setUser(user);
        console.log(user);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleSaveData = async () => {
    if (parseInt(carbs) + parseInt(protein) + parseInt(fat) != 100) {
      alert("Du kommst nicht auf 100%...");
      return;
    }

    setUploadVisible(true);

    try {
      console.log(carbs);
      await AsyncStorage.setItem("CaloriesGoal", JSON.stringify(queryKcal));
      await AsyncStorage.setItem("MakroCarbs", JSON.stringify(carbs));
      await AsyncStorage.setItem("MakroProtein", JSON.stringify(protein));
      await AsyncStorage.setItem("MakroFett", JSON.stringify(fat));
      await AsyncStorage.setItem("selectedType", JSON.stringify(selectedType));
    } catch (error) {
      alert(error);
    }
    setTimeout(() => {
      setUploadVisible(false);
    }, 1300);
  };

  const load = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("CaloriesGoal");
      let jsonValueCarbs = await AsyncStorage.getItem("MakroCarbs");
      let jsonValueProtein = await AsyncStorage.getItem("MakroProtein");
      let jsonValueFat = await AsyncStorage.getItem("MakroFett");
      let jsonValueType = await AsyncStorage.getItem("selectedType");

      if (jsonValue) setQueryKcal(JSON.parse(jsonValue));
      if (jsonValueCarbs) {
        console.log("CARBS : ", jsonValueCarbs);
        setCarbs(JSON.parse(jsonValueCarbs));
      }
      if (jsonValueProtein) {
        console.log("PROTEIN : ", jsonValueProtein);
        setProtein(JSON.parse(jsonValueProtein));
      }
      if (jsonValueFat) {
        console.log("FETT : ", jsonValueFat);
        setFat(JSON.parse(jsonValueFat));
      }

      if (jsonValueType) {
        setSelectedType(JSON.parse(jsonValueType));
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Screen>
      <UploadScreen progress={progress} visible={uploadVisible} />
      <TouchableWithoutFeedback
        style={{ zIndex: 0 }}
        touchSoundDisabled={true}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              paddingBottom: 20,
            }}
          >
            <AppText fontSize={27} font="extraBold">
              {user && user.name}
            </AppText>
          </View>
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            extraHeight={300}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.containerInput}>
                <AppText>Alter</AppText>
                <TextInput
                  keyboardType="numeric"
                  value={user && user.age}
                  onChangeText={(text) => setQueryAge(text)}
                  style={[styles.input, { paddingRight: 50 }]}
                />
                <View
                  pointerEvents="none"
                  style={{ zIndex: 3, position: "absolute", right: "6%" }}
                >
                  <AppText style={styles.inputText}>Jahre</AppText>
                </View>
              </View>
              <View style={styles.containerInput}>
                <AppText>Gewicht</AppText>
                <TextInput
                  keyboardType="numeric"
                  value={user && user.weight}
                  onChangeText={(text) => setQueryWeight(text)}
                  style={[styles.input, { paddingRight: 30 }]}
                />
                <View
                  pointerEvents="none"
                  style={{ zIndex: 3, position: "absolute", right: "6%" }}
                >
                  <AppText style={styles.inputText}>kg</AppText>
                </View>
              </View>
              <View style={styles.containerInput}>
                <AppText>Grösse</AppText>
                <TextInput
                  keyboardType="numeric"
                  value={user && user.height}
                  onChangeText={(text) =>
                    setUser((user) => ({ ...user, height: text }))
                  }
                  style={[styles.input, { paddingRight: 35 }]}
                />
                <View
                  pointerEvents="none"
                  style={{ zIndex: 3, position: "absolute", right: "6%" }}
                >
                  <AppText style={styles.inputText}>cm</AppText>
                </View>
              </View>
              <View style={[styles.containerInput, { marginBottom: 0 }]}>
                <AppText>Kalorienbedarf</AppText>
                <TextInput
                  keyboardType="numeric"
                  value={queryKcal}
                  onChangeText={(text) => setQueryKcal(text)}
                  style={styles.input}
                />
                <View
                  pointerEvents="none"
                  style={{ zIndex: 3, position: "absolute", right: "6%" }}
                >
                  <AppText style={styles.inputText}>kcal</AppText>
                </View>
              </View>
              <View style={styles.containerMacros}>
                <View style={styles.containerMiniMacros}>
                  <TextInput
                    keyboardType="numeric"
                    value={carbs}
                    onChangeText={(text) => setCarbs(text)}
                    style={styles.inputMacros}
                  />
                  <View
                    pointerEvents="none"
                    style={{
                      position: "absolute",
                      right: 20,
                      top: "29%",
                      zIndex: 4,
                    }}
                  >
                    <AppText fontSize={13}>%</AppText>
                  </View>
                  <AppText numberOfLines={1} fontSize={12}>
                    Kohlenhydrat
                  </AppText>
                </View>
                <View style={styles.containerMiniMacros}>
                  <TextInput
                    keyboardType="numeric"
                    value={protein}
                    onChangeText={(text) => setProtein(text)}
                    style={styles.inputMacros}
                  />
                  <View
                    pointerEvents="none"
                    style={{
                      position: "absolute",
                      right: 20,
                      top: "29%",
                      zIndex: 4,
                    }}
                  >
                    <AppText fontSize={13}>%</AppText>
                  </View>
                  <AppText fontSize={12}>Protein</AppText>
                </View>
                <View style={styles.containerMiniMacros}>
                  <TextInput
                    keyboardType="numeric"
                    value={fat}
                    onChangeText={(text) => setFat(text)}
                    style={styles.inputMacros}
                  />
                  <View
                    pointerEvents="none"
                    style={{
                      position: "absolute",
                      right: 20,
                      top: "29%",
                      zIndex: 4,
                    }}
                  >
                    <AppText fontSize={13}>%</AppText>
                  </View>
                  <AppText fontSize={12}>Fett</AppText>
                </View>
              </View>
              <View style={styles.containerInputPicker}>
                <AppText>Gen-Typ</AppText>
                <Picker
                  style={{
                    width: "50%",
                    color: "white",
                    paddingVertical: Platform.OS === "android" ? 20 : 0,
                    height: Platform.OS === "android" ? 30 : null,
                  }}
                  itemStyle={{ color: "white" }}
                  selectedValue={selectedType}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                  }
                >
                  <Picker.Item label="-" value="-" />
                  <Picker.Item label="Type 1" value="Type1" />
                  <Picker.Item label="Type 2" value="Type2" />
                  <Picker.Item label="Type 3" value="Type3" />
                  <Picker.Item label="Type 4" value="Type4" />
                </Picker>
              </View>
              <AppButton
                style={{ padding: 10 }}
                backgroundColor="#976DF6"
                title="Speichern"
                onPress={() => {
                  handleSaveData();
                }}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#252634",
    borderRadius: 10,
    paddingVertical: 20,
  },
  containerInput: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1E1E2A",
    borderRadius: 5,
    paddingLeft: 15,
    width: "90%",
    marginBottom: 20,
  },
  containerInputPicker: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1E1E2A",
    borderRadius: 7,
    paddingLeft: 15,
    width: "90%",
    marginBottom: 20,
    height: Platform.OS === "android" ? null : height / 10,
    overflow: "hidden",
  },
  containerMacros: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  containerMiniMacros: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2A",
    padding: 6,
    borderRadius: 8,
    marginVertical: 10,
    marginBottom: 15,
  },
  input: {
    zIndex: 2,
    borderRadius: 4,
    padding: 5,
    paddingRight: 38,
    height: 30,
    margin: 6,
    width: "40%",
    backgroundColor: "#252634",
    color: "white",
    textAlign: "right",
  },
  inputMacros: {
    textAlign: "right",
    paddingRight: 24,
    backgroundColor: "#252634",
    color: "white",
    borderRadius: 7,
    zIndex: 2,
    height: 40,
    width: "90%",
    marginBottom: 5,
  },
  inputText: {
    fontSize: 14,
  },
});

export default MyDataScreen;
