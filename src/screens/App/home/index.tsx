import { ActivityIndicator, Image, Platform } from "react-native";

import { Text } from "@components/Text";
import { Container, HeaderContainer, LoginContainer } from "./styles";
import { useQuery } from "react-query";
import UserService from "@services/UserService";
import { theme } from "@styles/theme/default";
import { useEffect } from "react";
import { useSelfDataStore } from "src/store/useSelfData";

export default function HomeScreen() {
  const { data, isLoading } = useQuery("selfData", () =>
    UserService.getPersonalData()
  );
  const { setMe } = useSelfDataStore();

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary[400]} />;
      </Container>
    );
  }

  useEffect(() => {
    if (data) {
      setMe(data.data.data);
    }
  }, [data]);

  return (
    <Container>
      <LoginContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Image source={require("../../../assets/images/brasao.png")} />

        <HeaderContainer>
          <Text weight="600" size={24}>
            Home
          </Text>
        </HeaderContainer>
      </LoginContainer>
    </Container>
  );
}
