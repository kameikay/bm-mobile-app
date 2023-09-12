import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";
import AuthProvider from "@contexts/AuthContext";
import { theme } from "@styles/theme/default";
import AppNav from "@navigation/AppNav";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppNav />
        </AuthProvider>

        <StatusBar style="auto" />
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
