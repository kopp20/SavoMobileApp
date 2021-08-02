import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";

function ChatScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => props.navigation.navigate("CommunityChat")}
        >
          <View
            style={{
              backgroundColor: "#252634",
              flexDirection: "row",
              padding: 40,
              alignItems: "center",
              paddingHorizontal: 15,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Ionicons name="people" size={24} color="white" />
            <AppText style={{ marginLeft: 5 }}>Community Chat</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    width: "100%",
  },
});

export default ChatScreen;
