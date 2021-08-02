import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LandingScreen from "../screens/LandingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
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
      name="Landing"
      component={LandingScreen}
      options={({ route }) => ({
        title: "SavoApp",
        headerShown: false,
      })}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: "Registrieren",
      })}
      name="Register"
      component={RegisterScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: "Login",
      })}
      name="Login"
      component={LoginScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
