import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import ControlScreen from "@screens/App/b4/ControlScreen";
import ItemsScreen from "@screens/App/b4/ItemsScreen";
import { theme } from "@styles/theme/default";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const B4MenuTopNavigator = createMaterialTopTabNavigator();

type B4MenuTopParamList = {
  ControlScreen: undefined;
};

export type B4MenuTopTypes = MaterialTopTabNavigationProp<B4MenuTopParamList>;

const menu = [
  {
    name: "Controle",
    component: ControlScreen,
  },
  {
    name: "Itens",
    component: ItemsScreen,
  },
  {
    name: "Entrada",
    component: ControlScreen,
  },
  {
    name: "Saída",
    component: ControlScreen,
  },
];

export default function B4Stack() {
  const insets = useSafeAreaInsets();

  return (
    <B4MenuTopNavigator.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: theme.colors.gray[50],
          paddingTop: insets.top,
        },
      }}
    >
      {menu.map((item) => (
        <B4MenuTopNavigator.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: item.name,
          }}
        />
      ))}
    </B4MenuTopNavigator.Navigator>
  );
}
