import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import AppLoading from "expo-app-loading";
import useFonts from "./useFonts";

function AppText({
  children,
  style,
  font = "normal",
  fontSize = 18,
  ...otherProps
}) {
  const [IsReady, SetIsReady] = useState(false);

  const FontLoading = async () => {
    await useFonts(); // Font is being loaded here
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={FontLoading}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Text
      style={[{ color: "white", fontFamily: font, fontSize: fontSize }, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export default AppText;
