import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "@contexts/AuthContext";
import { theme } from "@styles/theme/default";
import AppStack from "./AppStack";

export default function AppNav() {
  const { isLoading, accessToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {accessToken ? (
        isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary[400]} />
          </View>
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
