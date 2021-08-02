import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";

import AddFoodScreen from "../screens/AddFoodScreen";
import FoodDetailsScreen from "../screens/FoodDetailsScreen";
import ListFoodScreen from "../screens/ListFoodScreen";
import MyDataScreen from "../screens/MyDataScreen";
import CommunityChatScreen from "../screens/CommunityChatScreen";

import RezepteDetailsScreen from "../screens/RezepteDetailsScreen";
import TabNavigator from "../navigation/TabNavigator";

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Rezepte":
      return "Rezepte";
    case "Chat":
      return "Chat";
    case "Sonstiges":
      return "Sonstiges";
  }
}

const RezepteNavigator = () => (
  <Stack.Navigator
    mode="card"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#252634",
        shadowColor: "transparent",
        elevation: 0,
      },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="Rezepte"
      component={TabNavigator}
      options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })}
    />
    <Stack.Screen name="RezepteDetails" component={RezepteDetailsScreen} />
    <Stack.Screen name="CommunityChat" component={CommunityChatScreen} />
    <Stack.Screen
      name="AddFood"
      component={AddFoodScreen}
      options={({ route }) => ({
        title: "Nahrungsmittel",
      })}
    />
    <Stack.Screen
      name="FoodDetails"
      component={FoodDetailsScreen}
      options={({ route }) => ({
        title: route.params.newTitle,
      })}
    />
    <Stack.Screen
      name="ListFood"
      component={ListFoodScreen}
      options={({ route }) => ({
        title: route.params.title,
      })}
    />
    <Stack.Screen
      name="myData"
      component={MyDataScreen}
      options={({ route }) => ({
        title: route.params.title,
      })}
    />
  </Stack.Navigator>
);

export default RezepteNavigator;
