import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ConfirmationCode from "@screens/Auth/ConfirmationCodeScreen";
import LoginScreen from "@screens/Auth/LoginScreen";
import SignUpScreen from "@screens/Auth/SignUpScreen";
import { theme } from "@styles/theme/default";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ConfirmationCode: {
    email: string | null;
  };
};

export type AuthStackTypes = NativeStackNavigationProp<AuthStackParamList>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.gray[50],
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="ConfirmationCode"
        component={ConfirmationCode}
        initialParams={{
          email: "",
        }}
        navigationKey="ConfirmationCode"
      />
    </Stack.Navigator>
  );
}
