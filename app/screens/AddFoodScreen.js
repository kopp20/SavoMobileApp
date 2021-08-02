import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";

import AppText from "../components/AppText";
import CardFood from "../components/CardFood";
import Screen from "../components/Screen";
import colors from "../config/colors";
import foodData from "../config/foodData";

function AddFoodScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [query, setQuery] = useState("");
  const [more, setMore] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [numOfFood, setnumOfFood] = useState(0);

  const newPage = useRef(9);

  const title = route.params.title;

  const load = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem(title);

      if (jsonValue) setnumOfFood(JSON.parse(jsonValue).length);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    load();
    const willFocusSubscription = navigation.addListener("focus", () => {
      load();
    });

    return willFocusSubscription;
  }, []);

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "#3E405A",
        height: 0.4,
        width: "80%",
        alignSelf: "center",
      }}
    />
  );

  const renderFooter = () => {
    if (more)
      return (
        <TouchableOpacity
          onPress={() => {
            setData(
              fullData.slice(0, (newPage.current = newPage.current + 10))
            );
            if (fullData.length < newPage.current) setMore(false);
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingTop: 12,
            }}
          >
            <AppText style={{ color: "#976DF6" }} fontSize={12}>
              Mehr laden..
            </AppText>
          </View>
        </TouchableOpacity>
      );

    if (!more) return null;
  };

  const handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
    if (!text) {
      setData([]);
      setMore(false);
      return;
    }
    if (text.length < 2) return;

    const filteredData = foodData.filter((filteredFood) => {
      return (
        filteredFood.title.toLowerCase().includes(formatQuery) ||
        (filteredFood.synonym &&
          filteredFood.synonym.toLowerCase().includes(formatQuery))
      );
    });
    setFullData(filteredData);
    newPage.current = 9;

    setData(filteredData.slice(0, newPage.current));
    filteredData.length > 9 ? setMore(true) : setMore(false);
  };

  let fluidData;
  if (showLoading) {
    fluidData = (
      <ActivityIndicator style={{ marginTop: 20 }} size="small" color="white" />
    );
  } else {
    fluidData;
  }

  return (
    <Screen>
      <View style={styles.containerSearchBar}>
        <TextInput
          clearButtonMode={"while-editing"}
          autoCorrect={false}
          style={styles.searchInput}
          placeholder="Nahrungsmittel suchen.."
          placeholderTextColor="white"
          onChangeText={(text) => handleSearch(text)}
          onSubmitEditing={(text) => {
            if (query.length < 2) {
              alert("Mindestens 2 Buchstaben schreiben !");
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (numOfFood < 1) return;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("ListFood", { title });
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "#976DF6",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppText fontSize={13}>{numOfFood}</AppText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ padding: 20 }}
          data={data}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(data) => data.id.toString()}
          extraData={data}
          renderItem={({ item }) => {
            return (
              <CardFood
                title={item.title}
                kcal={item.kcal}
                carbohydrates={item.carbohydrates}
                protein={item.protein}
                fat={item.fat}
                style={{
                  width: "100%",
                }}
                onPress={() =>
                  navigation.navigate("FoodDetails", {
                    ...item,
                    newTitle: title,
                  })
                }
              />
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSearchBar: {
    width: "100%",
    height: 70,
    backgroundColor: "#252634",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: "yellow",
    borderRadius: 8,
    backgroundColor: colors.dark,
    color: "white",
    width: "85%",
  },
});

export default AddFoodScreen;
{
  /* <CardFood
                title={item.title}
                kcal={item.kcal}
                carbohydrates={item.carbohydrates}
                protein={item.protein}
                fat={item.fat}
                style={{
                  width: "100%",
                  height: 100,
                }}
                onPress={() =>
                  props.navigation.navigate("FoodDetails", {
                    ...item,
                    newTitle: title,
                  })
                }
              /> */
}
