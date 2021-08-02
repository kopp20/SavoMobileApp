// @refresh reset
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import TabBarProvider from "../SavoMobileApp/app/components/contexts/TabBarProvider";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "../SavoMobileApp/app/config/config";

import AuthNavigator from "./app/navigation/AuthNavigator";
import RezepteNavigator from "./app/navigation/RezepteNavigator";

import { createStackNavigator } from "@react-navigation/stack";
import ApfelScreen from "./app/screens/ApfelScreen";
import BaumScreen from "./app/screens/BaumScreen";
import UserProvider from "./app/components/contexts/UserProvider";
import { auth } from "../SavoMobileApp/firebase";

export default function App(props) {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <TabBarProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </TabBarProvider>

      /*  <NavigationContainer>
        <TestNavigator />
      </NavigationContainer> */
    );
  }
  return (
    <TabBarProvider>
      <NavigationContainer>
        <RezepteNavigator />
      </NavigationContainer>
    </TabBarProvider>
  );
}
