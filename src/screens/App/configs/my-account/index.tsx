import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalDataScreen from "./PersonalDataScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import { theme } from "@styles/theme/default";
import ExitScreen from "./Exit";

const Tab = createMaterialTopTabNavigator();

export default function MyAccountScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.gray[50],
        },
      }}
    >
      <Tab.Screen name="Dados pessoais" component={PersonalDataScreen} />
      <Tab.Screen name="Alterar senha" component={ChangePasswordScreen} />
      <Tab.Screen name="Sair" component={ExitScreen} />
    </Tab.Navigator>
  );
}
