import { Image, Platform } from "react-native";

import { Text } from "@components/Text";
import { Container, HeaderContainer, LoginContainer } from "./styles";

export default function HomeScreen() {
  return (
    <Container>
      <LoginContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Image source={require("../../../assets/images/brasao.png")} />

        <HeaderContainer>
          <Text weight="600" size={24}>
            B1
          </Text>
        </HeaderContainer>
      </LoginContainer>
    </Container>
  );
}
