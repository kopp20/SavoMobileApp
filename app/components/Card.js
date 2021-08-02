import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";

const icons = {
  vegetarian: require("../assets/Rezepte/vegetarian.png"),
  vegan: require("../assets/Rezepte/vegan.png"),
};

function Card({
  title,
  subTitle,
  image,
  icon,
  style,
  onPress,
  vegetarian,
  vegan,
}) {
  let iconImage;
  if (vegetarian)
    iconImage = <Image style={styles.iconImage} source={icons.vegetarian} />;
  else if (vegan)
    iconImage = <Image style={styles.iconImage} source={icons.vegan} />;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={[styles.image, style]} source={image} />
        <View style={styles.titleContainer}>
          <AppText font="bold" style={styles.title}>
            {title}
          </AppText>
          {iconImage}
        </View>
        <AppText style={styles.subTitle}></AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    overflow: "hidden",
  },

  image: {
    borderRadius: 15,
    height: 250,
    marginBottom: 3,
  },
  iconImage: {
    width: 15,
    height: 15,
  },
  title: {
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    fontSize: 14,
  },
});

export default Card;
