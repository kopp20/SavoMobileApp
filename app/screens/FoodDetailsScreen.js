import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { color } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

function FoodDetailsScreen(props) {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const [dataStore, setDataStore] = useState([]);
  const [counter, setCounter] = useState(0);

  const item = props.route.params;
  let color = { color: "gray" };
  let type = "Sonstiges";

  let storeTitle = props.route.params.newTitle;

  const load = async () => {
    try {
      let [jsonValue, counterValue] = await Promise.all([
        AsyncStorage.getItem(storeTitle),
        AsyncStorage.getItem("counter"),
      ]);

      if (jsonValue) setDataStore(JSON.parse(jsonValue));

      if (counterValue) setCounter(JSON.parse(counterValue));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  let stateNow = [];
  let counterNow = 0;

  const saveFood = async (item) => {
    if (query.length < 1) {
      alert("Bitte Menge eingeben");
      return;
    }
    setCounter(counter + 1);
    setDataStore((result) => [
      ...result,
      { ...item, amount: query, typeAmount: active, newId: counter },
    ]);

    stateNow = JSON.parse(JSON.stringify(dataStore));
    stateNow.push({
      ...item,
      amount: query,
      typeAmount: active,
      newId: counter,
    });
    counterNow = JSON.parse(JSON.stringify(counter));
    counterNow = counterNow + 1;
    try {
      await AsyncStorage.setItem(storeTitle, JSON.stringify(stateNow));
      await AsyncStorage.setItem("counter", JSON.stringify(counterNow));
    } catch (error) {
      alert(error);
    }

    props.navigation.navigate("AddFood");
  };

  if (item.category) {
    let category = item.category.toLowerCase();

    const protein = ["fleisch", "wurst", "fett", "fisch"];
    const kohlen = ["gemüse", "frücht", "getrei", "brot"];
    const fett = ["milch", "fett", "nüsse", "öl"];

    const proteinTest = protein.some((el) => category.includes(el));
    const kohlenTest = kohlen.some((el) => category.includes(el));
    const fettTest = fett.some((el) => category.includes(el));

    if (proteinTest) color.color = "red";
    if (kohlenTest) color.color = "#17B521";
    if (fettTest) color.color = "#C8CC0E";

    switch (color.color) {
      case "red":
        type = "Protein";
        break;
      case "#17B521":
        type = "Kohlenhydrate";
        break;
      case "#C8CC0E":
        type = "Fett";
        break;

      default:
        break;
    }
  }

  let tips;
  if (item.description) {
    tips = (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#191A23",
          paddingVertical: 10,
        }}
      >
        <Feather
          name="info"
          size={15}
          color="white"
          style={{ marginRight: 10 }}
        />
        <AppText fontSize={14} style={{ color: "#8F8F8F" }}>
          {item.description}
        </AppText>
      </View>
    );
  }

  return (
    <Screen>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={200}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1 }}>
            <View style={styles.upperContainer}>
              <View style={styles.containerTitle}>
                <AppText font="bold" style={styles.title}>
                  {item.title}
                </AppText>
                <AppText style={[styles.tag, { backgroundColor: color.color }]}>
                  {type}
                </AppText>
              </View>
              <View style={styles.subtitleContainer}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AppText
                    style={{ marginBottom: 2 }}
                    font="bold"
                    fontSize={14}
                  >
                    {item.kcal} kcal
                  </AppText>
                  <AppText font="light" fontSize={13}>
                    Kalorien
                  </AppText>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AppText
                    style={{ marginBottom: 2 }}
                    font="bold"
                    fontSize={14}
                  >
                    {item.carbohydrates} g
                  </AppText>
                  <AppText font="light" fontSize={13}>
                    Kohlenhydrate
                  </AppText>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AppText
                    style={{ marginBottom: 2 }}
                    font="bold"
                    fontSize={14}
                  >
                    {item.protein} g
                  </AppText>
                  <AppText font="light" fontSize={13}>
                    Eweiss
                  </AppText>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AppText
                    style={{ marginBottom: 2 }}
                    font="bold"
                    fontSize={14}
                  >
                    {item.fat} g
                  </AppText>
                  <AppText font="light" fontSize={13}>
                    Fett
                  </AppText>
                </View>
              </View>
              {tips}
            </View>
            <View style={styles.underContainer}>
              <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback
                  active={active}
                  onPress={() => {
                    setActive(true);
                  }}
                >
                  <AppText
                    style={[
                      styles.switchButtonGramm,
                      {
                        backgroundColor: active ? "#343549" : "#1E1E2A",
                      },
                    ]}
                  >
                    Einheit
                  </AppText>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  active={active}
                  onPress={() => {
                    setActive(false);
                    setActive((state) => {
                      // "React is awesome!"

                      return state;
                    });
                  }}
                >
                  <AppText
                    style={[
                      styles.switchButtonGramm,
                      {
                        backgroundColor: active ? "#1E1E2A" : "#343549",
                      },
                    ]}
                  >
                    Gramm
                  </AppText>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#1E1E2A",
                  borderRadius: 5,
                  padding: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <AppText
                  fontSize={14}
                  style={{ marginRight: 25, marginLeft: 5 }}
                >
                  Menge
                </AppText>

                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="white"
                  style={styles.input}
                  placeholder=""
                  onChangeText={(text) => setQuery(text)}
                ></TextInput>
              </View>
              <AppButton
                onPress={() => {
                  saveFood(item);
                }}
                title="Hinzufügen"
                backgroundColor="#976DF6"
                width={width * 0.4}
                height={width * 0.1}
                fontSize={16}
                borderRadius={4}
                style={{ marginTop: 20, marginBottom: 20 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  containerAvoid: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#1E1E2A",
    padding: 4,
    borderRadius: 5,
    marginTop: height * 0.02,
  },

  upperContainer: {
    alignItems: "center",
    paddingTop: 35,
  },
  containerTitle: {
    backgroundColor: "#252634",
    height: height * 0.2,
    width: width * 0.7,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#252634",
    height: height * 0.04,
    width: width * 0.15,
    color: "white",
    textAlign: "center",
    borderRadius: 4,
  },

  switchButtonEinheit: {
    width: width * 0.3,
    height: height * 0.04,
    borderRadius: 4,
    fontSize: 15,
  },
  switchButtonGramm: {
    fontSize: 15,
    borderRadius: 4,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tag: {
    position: "absolute",
    right: -10,
    top: -5,
    borderRadius: 4,
    overflow: "hidden",
    padding: 5,
    fontSize: 12,
  },
  text: { color: "white" },
  title: { fontSize: 22, textAlign: "center" },
  subtitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: height * 0.09,
  },
  underContainer: {
    width: "100%",
    backgroundColor: "#252634",
    alignItems: "center",
  },
});

export default FoodDetailsScreen;
