import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import ConfirmationCodeScreen from "@screens/Auth/ConfirmationCodeScreen";
import LoginScreen from "@screens/Auth/LoginScreen";
import SignUpScreen from "@screens/Auth/SignUpScreen";
import { theme } from "@styles/theme/default";

const Stack = createNativeStackNavigator();

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ConfirmationCode: {
    email: string;
  };
};

export type AuthStackTypes = NativeStackNavigationProp<AuthStackParamList>;

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.gray[50],
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="ConfirmationCode"
        component={ConfirmationCodeScreen}
      />
    </Stack.Navigator>
  );
}
