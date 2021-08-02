import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import AppText from "../components/AppText";
import CardFood from "../components/CardFood";
import Screen from "../components/Screen";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

const { width, height } = Dimensions.get("window");

function ListFoodScreen(props) {
  let getData = props.route.params.title;

  const [data, setData] = useState([]);
  const load = async () => {
    try {
      let value = await AsyncStorage.getItem(getData);

      if (value) setData(JSON.parse(value));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      load();
    });

    return willFocusSubscription;
  }, []);

  if (!data) return null;

  const handleDelete = async (element) => {
    const dataArray = JSON.parse(JSON.stringify(data));
    const removeIndex = dataArray.findIndex(
      (item) => item.newId === element.newId
    );
    // remove object
    dataArray.splice(removeIndex, 1);
    setData(dataArray);

    try {
      await AsyncStorage.setItem(getData, JSON.stringify(dataArray));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Screen style={{ paddingVertical: 8 }}>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <AppButton
          onPress={() => {
            props.navigation.navigate("AddFood", {
              title: getData,
            });
          }}
          title="Mehr hinzufügen"
          style={{ backgroundColor: "#976DF6", padding: 10 }}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          {data.map((item) => (
            <Swipeable
              key={item.newId}
              renderRightActions={() => (
                <TouchableWithoutFeedback onPress={() => handleDelete(item)}>
                  <View
                    style={{
                      backgroundColor: "red",
                      width: 70,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="trash-o" size={24} color="white" />
                  </View>
                </TouchableWithoutFeedback>
              )}
            >
              <TouchableWithoutFeedback>
                <View style={styles.card}>
                  <View>
                    <AppText
                      font="normal"
                      style={styles.title}
                      numberOfLines={1}
                    >
                      {item.title}
                    </AppText>
                    <AppText font="light" style={styles.subTitle}>
                      {item.typeAmount
                        ? item.amount + " Einheit/en"
                        : item.amount + " gramm"}
                    </AppText>
                  </View>
                  <View>
                    <AppText style={{ fontSize: 15 }} font="light">
                      {item.typeAmount
                        ? parseInt((item.kcal / 100) * item.amount * 52)
                        : parseInt((item.kcal * item.amount) / 100)}{" "}
                      kcal
                    </AppText>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Swipeable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E1E2A",
  },
  title: {
    fontSize: 16,
    width: width * 0.6,
  },
  subTitle: {
    fontSize: 15,
  },
});

export default ListFoodScreen;
