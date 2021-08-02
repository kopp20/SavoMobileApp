import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { useTabBar } from "../components/contexts/TabBarProvider";
import Progressbar from "../components/Progressbar";

const { width, height } = Dimensions.get("window");

function HomeScreen(props) {
  const [breakfast, setBreakFast] = useState(0);
  const [lunch, setLunch] = useState(0);
  const [dinner, setDinner] = useState(0);
  const [snack, setSnack] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [protein, setProteinTotal] = useState(0);
  const [fat, setFatTotal] = useState(0);
  const [carbohydrates, setCarbohydratesTotal] = useState(0);
  const [macroCarbs, setMacroCarbs] = useState(0);
  const [macroProtein, setMacroProtein] = useState(0);
  const [macroFat, setMacroFat] = useState(0);
  const myProtein = useRef(0);
  const myCarbs = useRef(0);
  const myFat = useRef(0);
  const carbsGoal = useRef(0);
  const proteinGoal = useRef(0);
  const fatGoal = useRef(0);
  const load = async () => {
    myProtein.current = 0;
    myCarbs.current = 0;
    myFat.current = 0;

    try {
      let [
        valueMakroCarbs,
        valueMakroProtein,
        valueMakroFett,
        valueBreakFast,
        valueLunch,
        valueDinner,
        valueSnack,
        valueCaloriesGoal,
      ] = await Promise.all([
        AsyncStorage.getItem("MakroCarbs"),
        AsyncStorage.getItem("MakroProtein"),
        AsyncStorage.getItem("MakroFett"),
        AsyncStorage.getItem("Frühstück"),
        AsyncStorage.getItem("Mittag"),
        AsyncStorage.getItem("Abend"),
        AsyncStorage.getItem("Snack"),
        AsyncStorage.getItem("CaloriesGoal"),
      ]);
      if (!valueCaloriesGoal || !valueMakroCarbs) {
        valueCaloriesGoal = "2000";
        valueMakroCarbs = "50";
        valueMakroProtein = "30";
        valueMakroFett = "20";
        console.log("temporary values");
      }

      if (valueBreakFast) {
        let calTotal = JSON.parse(valueBreakFast).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.kcal * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.kcal / 100) * cur.amount * 52);
          }
        }, 0);
        let proteinTotal = JSON.parse(valueBreakFast).reduce(function (
          prev,
          cur
        ) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.protein * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.protein / 100) * cur.amount * 52);
          }
        },
        0);
        let carbsTotal = JSON.parse(valueBreakFast).reduce(function (
          prev,
          cur
        ) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.carbohydrates * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.carbohydrates / 100) * cur.amount * 52);
          }
        },
        0);
        let fatTotal = JSON.parse(valueBreakFast).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.fat * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.fat / 100) * cur.amount * 52);
          }
        }, 0);
        myProtein.current += proteinTotal;
        myCarbs.current += carbsTotal;
        myFat.current += fatTotal;
        setBreakFast(calTotal);
      }
      if (valueLunch) {
        let calTotal = JSON.parse(valueLunch).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.kcal * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.kcal / 100) * cur.amount * 52);
          }
        }, 0);
        let proteinTotal = JSON.parse(valueLunch).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.protein * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.protein / 100) * cur.amount * 52);
          }
        }, 0);
        let carbsTotal = JSON.parse(valueLunch).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.carbohydrates * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.carbohydrates / 100) * cur.amount * 52);
          }
        }, 0);
        let fatTotal = JSON.parse(valueLunch).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.fat * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.fat / 100) * cur.amount * 52);
          }
        }, 0);

        myProtein.current += proteinTotal;
        myCarbs.current += carbsTotal;
        myFat.current += fatTotal;
        setLunch(calTotal);
      }
      if (valueDinner) {
        let calTotal = JSON.parse(valueDinner).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.kcal * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.kcal / 100) * cur.amount * 52);
          }
        }, 0);
        let proteinTotal = JSON.parse(valueDinner).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.protein * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.protein / 100) * cur.amount * 52);
          }
        }, 0);
        let carbsTotal = JSON.parse(valueDinner).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.carbohydrates * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.carbohydrates / 100) * cur.amount * 52);
          }
        }, 0);
        let fatTotal = JSON.parse(valueDinner).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.fat * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.fat / 100) * cur.amount * 52);
          }
        }, 0);

        myProtein.current += proteinTotal;
        myCarbs.current += carbsTotal;
        myFat.current += fatTotal;

        setDinner(calTotal);
      }
      if (valueSnack) {
        let calTotal = JSON.parse(valueSnack).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.kcal * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.kcal / 100) * cur.amount * 52);
          }
        }, 0);
        let proteinTotal = JSON.parse(valueSnack).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.protein * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.protein / 100) * cur.amount * 52);
          }
        }, 0);
        let carbsTotal = JSON.parse(valueSnack).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.carbohydrates * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.carbohydrates / 100) * cur.amount * 52);
          }
        }, 0);
        let fatTotal = JSON.parse(valueSnack).reduce(function (prev, cur) {
          if (!cur.typeAmount) {
            return prev + parseInt((cur.fat * cur.amount) / 100);
          } else {
            return prev + parseInt((cur.fat / 100) * cur.amount * 52);
          }
        }, 0);

        myProtein.current += proteinTotal;
        myCarbs.current += carbsTotal;
        myFat.current += fatTotal;

        setSnack(calTotal);
      }

      if (valueCaloriesGoal) {
        setCaloriesGoal(JSON.parse(valueCaloriesGoal));
      }

      if (valueMakroCarbs && valueCaloriesGoal) {
        let num = JSON.parse(valueMakroCarbs);

        let caloriesToWork = (JSON.parse(valueCaloriesGoal) * num) / 100;

        let finalNum = caloriesToWork / 4;
        carbsGoal.current = finalNum;
        setMacroCarbs(finalNum);
      }
      if (valueMakroProtein && valueCaloriesGoal) {
        let num = JSON.parse(valueMakroProtein);
        let caloriesToWork = (JSON.parse(valueCaloriesGoal) * num) / 100;
        let finalNum = caloriesToWork / 4;
        proteinGoal.current = finalNum;
        setMacroProtein(finalNum);
      }
      if (valueMakroFett && valueCaloriesGoal) {
        let num = JSON.parse(valueMakroFett);
        let caloriesToWork = (JSON.parse(valueCaloriesGoal) * num) / 100;
        let finalNum = caloriesToWork / 9;
        fatGoal.current = finalNum;
        setMacroFat(finalNum);
      }

      setProteinTotal(myProtein.current);
      setCarbohydratesTotal(myCarbs.current);
      setFatTotal(myFat.current);
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

  const { setShowTabBar } = useTabBar();

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset <= 0) return setShowTabBar(true);
    return setShowTabBar(false);
  };

  return (
    <Screen>
      <ScrollView onScroll={(e) => onScroll(e)} scrollEventThrottle={16}>
        <View style={styles.container}>
          <AppText font="bold" style={{ fontSize: 22 }}>
            Zusammenfassung
          </AppText>
          <View style={styles.summaryContainer}>
            <View
              style={{
                width: "100%",
                flex: 1,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></View>

            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}
              colors={["#976DF6", "#6236c8"]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "65%",
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "baseline",
                      marginBottom: 3,
                    }}
                  >
                    <AppText>{breakfast + lunch + dinner + snack} </AppText>
                    <AppText font="light" style={{ fontSize: 11 }}></AppText>
                  </View>
                  <AppText font="light" style={{ fontSize: 14 }}>
                    Gegessen
                  </AppText>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "baseline",
                      marginBottom: 3,
                      justifyContent: "center",
                      width: width / 5,
                    }}
                  >
                    <AnimatedCircularProgress
                      style={{ position: "absolute", top: -30, left: -26 }}
                      backgroundWidth={5}
                      lineCap="round"
                      arcSweepAngle={252}
                      rotation={-125}
                      size={130}
                      width={8}
                      fill={
                        ((breakfast + lunch + dinner + snack) * 100) /
                        caloriesGoal
                      }
                      tintColor="white"
                      backgroundColor="#ab8feb"
                    />
                    <AppText style={{ fontSize: 25, fontWeight: "bold" }}>
                      {caloriesGoal - (breakfast + lunch + dinner + snack)}
                    </AppText>
                    <AppText font="light" style={{ fontSize: 11 }}></AppText>
                  </View>
                  <View>
                    <AppText font="light" style={{ fontSize: 14 }}>
                      Übrig
                    </AppText>
                  </View>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "baseline",
                      marginBottom: 3,
                    }}
                  >
                    <AppText>0 </AppText>
                    <AppText font="light" style={{ fontSize: 11 }}></AppText>
                  </View>
                  <AppText font="light" style={{ fontSize: 14 }}>
                    Verbrannt
                  </AppText>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(255,255,255,.05)",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <AppText
                    font="light"
                    style={{
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    Kohlenhydrate
                  </AppText>
                  <Progressbar
                    width={
                      ((myCarbs.current * 100) / carbsGoal.current).toString() +
                      "%"
                    }
                  />
                  <AppText font="light" style={{ fontSize: 11 }}>
                    {myCarbs.current} g / {carbsGoal.current} g
                  </AppText>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <AppText
                    font="light"
                    style={{ fontSize: 14, marginBottom: 2 }}
                  >
                    Protein
                  </AppText>
                  <Progressbar
                    width={
                      (
                        (myProtein.current * 100) /
                        proteinGoal.current
                      ).toString() + "%"
                    }
                  />
                  <AppText font="light" style={{ fontSize: 11 }}>
                    {myProtein.current} g / {proteinGoal.current} g
                  </AppText>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <AppText
                    font="light"
                    style={{ fontSize: 14, marginBottom: 2 }}
                  >
                    Fett
                  </AppText>
                  <Progressbar
                    width={
                      ((myFat.current * 100) / fatGoal.current).toString() + "%"
                    }
                  />
                  <AppText font="light" style={{ fontSize: 11 }}>
                    {myFat.current} g / {parseInt(fatGoal.current)} g
                  </AppText>
                </View>
              </View>
            </LinearGradient>
          </View>
          <AppText font="bold" style={{ marginBottom: 10 }}>
            Ernährung
          </AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (breakfast) {
                    props.navigation.navigate("ListFood", {
                      title: "Frühstück",
                    });
                  } else {
                    props.navigation.navigate("AddFood", {
                      title: "Frühstück",
                    });
                  }

                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={styles.calContainer}>
                  <AppText style={styles.tag}>Frühstück</AppText>
                  <AppText style={styles.tagCal}>{breakfast} kcal</AppText>
                  <View style={{ alignItems: "center" }}>
                    {breakfast != 0 && (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../assets/icons/breakfast.png")}
                      />
                    )}
                    {breakfast == 0 && (
                      <>
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={24}
                          color="white"
                        />
                        <Text
                          font="light"
                          style={{ fontSize: 12, color: "white" }}
                        >
                          Hinzufügen
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (lunch) {
                    props.navigation.navigate("ListFood", {
                      title: "Mittag",
                    });
                  } else {
                    props.navigation.navigate("AddFood", {
                      title: "Mittag",
                    });
                  }
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={styles.calContainer}>
                  <AppText style={styles.tag}>Mittag</AppText>
                  <AppText style={styles.tagCal}>{lunch} kcal</AppText>
                  <View style={{ alignItems: "center" }}>
                    {lunch != 0 && (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../assets/icons/fried-rice.png")}
                      />
                    )}
                    {lunch == 0 && (
                      <>
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={24}
                          color="white"
                        />
                        <Text
                          font="light"
                          style={{ fontSize: 12, color: "white" }}
                        >
                          Hinzufügen
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (dinner) {
                    props.navigation.navigate("ListFood", {
                      title: "Abend",
                    });
                  } else {
                    props.navigation.navigate("AddFood", {
                      title: "Abend",
                    });
                  }
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={styles.calContainer}>
                  <AppText style={styles.tag}>Abend</AppText>
                  <AppText style={styles.tagCal}>{dinner} kcal</AppText>
                  <View style={{ alignItems: "center" }}>
                    {dinner != 0 && (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../assets/icons/rice.png")}
                      />
                    )}
                    {dinner == 0 && (
                      <>
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={24}
                          color="white"
                        />
                        <Text
                          font="light"
                          style={{ fontSize: 12, color: "white" }}
                        >
                          Hinzufügen
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (snack) {
                    props.navigation.navigate("ListFood", {
                      title: "Snack",
                    });
                  } else {
                    props.navigation.navigate("AddFood", {
                      title: "Snack",
                    });
                  }
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={styles.calContainer}>
                  <AppText style={styles.tag}>Snack</AppText>
                  <AppText style={styles.tagCal}>{snack} kcal</AppText>
                  <View style={{ alignItems: "center" }}>
                    {snack != 0 && (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require("../assets/icons/apple.png")}
                      />
                    )}
                    {snack == 0 && (
                      <>
                        <Ionicons
                          name="ios-add-circle-outline"
                          size={24}
                          color="white"
                        />
                        <Text
                          font="light"
                          style={{ fontSize: 12, color: "white" }}
                        >
                          Hinzufügen
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  calContainer: {
    backgroundColor: "#262736",
    width: width / 2.4,
    height: height / 5,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    paddingBottom: 100,
  },
  summaryContainer: {
    backgroundColor: "#7149ce",
    width: "100%",
    height: height / 3.5,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  tag: {
    position: "absolute",
    right: 0,
    top: 15,
    width: "100%",
    backgroundColor: "#1E1E2A",
    paddingVertical: 3,
    paddingHorizontal: 6,

    fontSize: 13,
    overflow: "hidden",
  },
  tagCal: {
    zIndex: 1,
    fontSize: 15,
    position: "absolute",
    right: 0,
    top: 15,
    width: "100%",
    paddingVertical: 3,
    paddingHorizontal: 6,
    textAlign: "right",
    fontSize: 13,
    overflow: "hidden",
  },
});

export default HomeScreen;
