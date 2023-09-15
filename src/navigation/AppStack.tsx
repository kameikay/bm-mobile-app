import { HomeIcon } from "@assets/icons/HomeIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@screens/App/home";
import PeopleScreen from "@screens/App/people";
import B4Screen from "@screens/App/b4";
import { UsersIcon } from "@assets/icons/UsersIcon";
import { InboxStackIcon } from "@assets/icons/InboxStackIcon";
import { Cog6ToothIcon } from "@assets/icons/Cog6ToothIcon";
import { theme } from "@styles/theme/default";
import ConfigStack from "./ConfigsStack";
import { useQuery } from "react-query";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import UserService from "@services/UserService";
import { useSelfDataStore } from "src/store/useSelfData";

const Tab = createBottomTabNavigator();

const menu = [
  {
    name: "Home",
    icon: HomeIcon,
    component: HomeScreen,
  },
  {
    name: "Pessoal",
    icon: UsersIcon,
    component: PeopleScreen,
  },
  {
    name: "Logística",
    icon: InboxStackIcon,
    component: B4Screen,
  },
  {
    name: "Configurações",
    icon: Cog6ToothIcon,
    component: ConfigStack,
  },
];

export default function AppStack() {
  const { data, isLoading } = useQuery("selfData", () =>
    UserService.getPersonalData()
  );
  const { setMe } = useSelfDataStore();

  useEffect(() => {
    if (data && data.data) {
      setMe(data.data.data);
    }

    return () => {
      setMe(null);
    };
  }, [data]);

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {menu.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ color }) => <item.icon color={color} />,
            tabBarActiveTintColor: theme.colors.primary[900],
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
