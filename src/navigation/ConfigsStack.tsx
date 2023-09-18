import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import MyAccountScreen from "@screens/App/configs/my-account";
import ConfigsScreen from "@screens/App/configs/ConfigsScreen";
import { theme } from "@styles/theme/default";
import { ChevronLeftIcon } from "@assets/icons/ChevronLeftIcon";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ConfigStackNavigator = createNativeStackNavigator();

type ConfigStackParamList = {
  ConfigsScreen: undefined;
  MyAccountScreen: undefined;
};

export type ConfigStackTypes = NativeStackNavigationProp<ConfigStackParamList>;

export default function ConfigStack() {
  const navigation = useNavigation<ConfigStackTypes>();

  return (
    <ConfigStackNavigator.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.gray[50],
        },
      }}
    >
      <ConfigStackNavigator.Screen
        name="ConfigsScreen"
        component={ConfigsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ConfigStackNavigator.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          headerTitle: "Minha conta",
          headerTitleStyle: {
            color: theme.colors.primary[900],
          },
          headerStyle: {
            backgroundColor: theme.colors.gray[50],
          },
          headerTintColor: theme.colors.primary[400],
          headerBackTitleStyle: {
            fontSize: 16,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ConfigsScreen")}
            >
              <ChevronLeftIcon width={14} height={14} />
            </TouchableOpacity>
          ),
        }}
      />
    </ConfigStackNavigator.Navigator>
  );
}
