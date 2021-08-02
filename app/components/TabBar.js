import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { useTabBar } from "./contexts/TabBarProvider";
import Tab from "./Tab";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("screen");

function TabBar({ state, navigation }) {
  const [selected, setSelected] = useState("Home");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? "#976DF6" : "white";

  const { showTabBar } = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };
  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);
  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY: animation }] }]}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => {
              handlePress(route.name, index);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 40,
    width,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(37, 38, 52, 0.9)",
    width: 220,
    justifyContent: "space-between",
    borderRadius: 10,
  },
});

export default TabBar;
