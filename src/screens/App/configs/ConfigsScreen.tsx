import { FlatList, View } from "react-native";
import { Container, HeaderContainer, TextListContainer } from "./styles";
import { Text } from "@components/Text";
import { ConfigStackTypes } from "@navigation/ConfigsStack";
import { useNavigation } from "@react-navigation/native";
import { Separator } from "@components/Separator";
import { theme } from "@styles/theme/default";
import { ChevronRightIcon } from "@assets/icons/ChevronRightIcon";
import { Cog6ToothIcon } from "@assets/icons/Cog6ToothIcon";

export default function ConfigsScreen() {
  const navigation = useNavigation<ConfigStackTypes>();

  return (
    <Container>
      <HeaderContainer>
        <Cog6ToothIcon />
        <Text weight="600" size={20}>
          Configurações
        </Text>
      </HeaderContainer>
      <FlatList
        data={[
          {
            title: "Minha conta",
            description: "Gerencie seus dados",
            screen: "MyAccountScreen",
            permissions: ["user"],
          },
          {
            title: "Administrador",
            description: "Gerencie os usuários",
            screen: "AdminScreen",
            permissions: ["admin"],
          },
        ]}
        contentContainerStyle={{ padding: 16 }}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <TextListContainer
            onPress={() => {
              navigation.navigate(item.screen as unknown as never);
            }}
          >
            <View>
              <Text>{item.title}</Text>
              <Text
                color={theme.colors.gray[400]}
                size={14}
                style={{ marginTop: 4 }}
              >
                {item.description}
              </Text>
            </View>
            <View>
              <ChevronRightIcon height={12} width={12} />
            </View>
          </TextListContainer>
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
