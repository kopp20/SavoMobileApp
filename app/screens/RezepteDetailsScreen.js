import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  SectionList,
  Dimensions,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { useEffect } from "react";

const Ingredients = ({ item, style }) => {
  let listZutaten = <AppText></AppText>;
  if (item.zutaten) {
    const zutaten = item.zutaten
      .split(",")
      .map((line) => line.trim().split("-"));

    listZutaten = zutaten.map((zutat, index) => {
      if (zutat.length > 1) {
        return (
          <View style={style} key={index}>
            <AppText style={{ width: 55 }}>{zutat[0]}</AppText>
            <AppText font="light">{zutat[1]}</AppText>
          </View>
        );
      } else {
        return (
          <View style={style} key={index}>
            <AppText style={{ width: 55 }}></AppText>
            <AppText>{zutat[0]}</AppText>
          </View>
        );
      }
    });
  }
  return listZutaten;
};

function RezepteDetailsScreen({ route, navigation }) {
  const item = route.params;

  let tags = <AppText></AppText>;
  if (item.tags) {
    tags = item.tags.split(",").map((tag, index) => (
      <AppText style={styles.tags} key={index}>
        {tag.trim()}
      </AppText>
    ));
  }

  const [selectedLanguage, setSelectedLanguage] = useState("Frühstück");
  const [query, setQuery] = useState("");
  const [dataBreakfast, setdataBreakfast] = useState([]);
  const [dataLunch, setdataLunch] = useState([]);
  const [dataDinner, setdataDinner] = useState([]);
  const [dataSnack, setdataSnack] = useState([]);
  const [counter, setCounter] = useState(0);

  const load = async () => {
    try {
      let [breakfast, lunch, dinner, snack, counterValue] = await Promise.all([
        AsyncStorage.getItem("Frühstück"),
        AsyncStorage.getItem("Mittag"),
        AsyncStorage.getItem("Abend"),
        AsyncStorage.getItem("Snack"),

        AsyncStorage.getItem("counter"),
      ]);

      if (breakfast) setdataBreakfast(JSON.parse(breakfast));
      if (lunch) setdataLunch(JSON.parse(lunch));
      if (dinner) setdataDinner(JSON.parse(dinner));
      if (snack) setdataSnack(JSON.parse(snack));

      if (counterValue) setCounter(JSON.parse(counterValue));
    } catch (error) {
      alert(error);
    }
  };

  let stateNow = [];
  let counterNow = 0;

  useEffect(() => {
    load();
  }, []);

  const saveFood = async (item) => {
    if (query.length < 1) {
      alert("Bitte Menge eingeben");
      return;
    }
    setCounter(counter + 1);

    switch (selectedLanguage) {
      case "Frühstück":
        setdataBreakfast((result) => [
          ...result,
          { ...item, amount: query, typeAmount: true, newId: counter },
        ]);

        stateNow = JSON.parse(JSON.stringify(dataBreakfast));
        break;
      case "Mittag":
        setdataLunch((result) => [
          ...result,
          { ...item, amount: query, typeAmount: true, newId: counter },
        ]);
        stateNow = JSON.parse(JSON.stringify(dataLunch));
        break;
      case "Abend":
        setdataDinner((result) => [
          ...result,
          { ...item, amount: query, typeAmount: true, newId: counter },
        ]);
        stateNow = JSON.parse(JSON.stringify(dataDinner));
        break;
      case "Snack":
        setdataSnack((result) => [
          ...result,
          { ...item, amount: query, typeAmount: true, newId: counter },
        ]);
        stateNow = JSON.parse(JSON.stringify(dataSnack));
        break;
    }

    stateNow.push({
      ...item,
      amount: query,
      typeAmount: true,
      newId: counter,
    });
    counterNow = JSON.parse(JSON.stringify(counter));
    counterNow = counterNow + 1;
    try {
      await AsyncStorage.setItem(selectedLanguage, JSON.stringify(stateNow));
      await AsyncStorage.setItem("counter", JSON.stringify(counterNow));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={item.image} />

          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{item.title}</AppText>

            <AppText style={styles.description}>{item.description}</AppText>
            <View style={styles.tagsContainer}>{tags}</View>
          </View>
          <View style={styles.containerFood}>
            <View style={styles.ingredientsHeader}>
              <View>
                <AppText style={{ fontWeight: "bold", fontSize: 23 }}>
                  Zutaten
                </AppText>
                <AppText style={{ fontSize: 15 }}>Für 1 Einheit</AppText>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1E1E2A",
                    borderRadius: 8,
                  }}
                >
                  <AppText style={{ paddingHorizontal: 10, fontSize: 16 }}>
                    Einheiten
                  </AppText>
                  <TextInput
                    onChangeText={(text) => setQuery(text)}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <Ingredients style={styles.ingredient} item={item} />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Picker
                style={{
                  width: "50%",
                  color: "white",
                  paddingVertical: Platform.OS === "android" ? 50 : 0,
                  height: Platform.OS === "android" ? 30 : null,
                }}
                itemStyle={{ color: "white" }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Frühstück" value="Frühstück" />
                <Picker.Item label="Mittagessen" value="Mittag" />
                <Picker.Item label="Abendessen" value="Abend" />
                <Picker.Item label="Snack" value="Snack" />
              </Picker>
              <AppButton
                style={{ padding: 8 }}
                backgroundColor="#976DF6"
                width={"40%"}
                title="Hinzufügen"
                onPress={() => {
                  saveFood(item);
                  navigation.navigate("Rezepte");
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  containerFood: {
    alignItems: "flex-start",
    backgroundColor: "#252634",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "justify",
    fontSize: 17,
  },
  iconsContainer: {
    alignItems: "center",
  },
  iconsGlobalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
  },
  iconText: {
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 15,
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  ingredient: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  ingredientsHeader: {
    width: "100%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderRadius: 7,
    padding: 10,
    height: 40,
    margin: 6,
    width: 60,
    backgroundColor: "#252634",
    color: "white",
    textAlign: "center",
  },
  picker: {},
  pickerContainer: {
    backgroundColor: "white",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
  },
  tags: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#976DF6",
    marginBottom: 10,
    marginRight: 10,
    fontSize: 12,
    borderRadius: 5,
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default RezepteDetailsScreen;
