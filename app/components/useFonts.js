import * as Font from "expo-font";
import {
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from "@expo-google-fonts/lato";

export default useFonts = async () => {
  await Font.loadAsync({
    light: Lato_300Light,
    normal: Lato_400Regular,
    bold: Lato_700Bold,
    extraBold: Lato_900Black,
  });
};
