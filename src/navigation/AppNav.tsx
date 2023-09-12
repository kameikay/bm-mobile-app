import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { theme } from "@styles/theme/default";
import AppStack from "./AppStack";

export default function AppNav() {
  const { isLoading, accessToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary[400]} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {accessToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
