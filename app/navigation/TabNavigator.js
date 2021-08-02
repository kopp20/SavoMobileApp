import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RezepteScreen from "../screens/RezepteScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import SonstigesScreen from "../screens/SonstigesScreen";
import TabBar from "../components/TabBar";

const Tab = createBottomTabNavigator();

function TabNavigator(props) {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ icon: "home", title: "Home" }}
      />
      <Tab.Screen
        name="Rezepte"
        component={RezepteScreen}
        initialParams={{ icon: "chef-hat", title: "Rezepte" }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ icon: "chat", title: "Rezepte" }}
      />
      <Tab.Screen
        name="Sonstiges"
        component={SonstigesScreen}
        initialParams={{ icon: "settings", title: "Rezepte" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TabNavigator;
