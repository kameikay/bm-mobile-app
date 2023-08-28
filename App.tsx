import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text } from "@components/Text";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@styles/theme/default";

export default function App() {
  const [isFontsLoaded] = useFonts({
    "Inter-300": require("./src/assets/fonts/Inter-Light.ttf"),
    "Inter-400": require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-500": require("./src/assets/fonts/Inter-Medium.ttf"),
    "Inter-600": require("./src/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-700": require("./src/assets/fonts/Inter-Bold.ttf"),
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="light" />
      </View>
    </ThemeProvider>
  );
}
