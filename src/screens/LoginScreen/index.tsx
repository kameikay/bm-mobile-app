import { Image, Platform, TouchableOpacity, View } from "react-native";
import { Text } from "@components/Text";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { theme } from "@styles/theme/default";
import {
  ButtonsContainer,
  Container,
  FormContainer,
  HeaderContainer,
  LoginContainer,
} from "./styles";

export default function LoginScreen() {
  return (
    <Container>
      <LoginContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Image source={require("../../assets/images/brasao.png")} />

        <HeaderContainer>
          <Text weight="600" size={24}>
            Bem-vindo(a)
          </Text>
          <Text style={{ textAlign: "center" }}>
            Por favor, preencha seus dados de acesso
          </Text>
        </HeaderContainer>

        <FormContainer>
          <Input
            label="Usuário"
            placeholder="Digite seu usuário"
            keyboardType="number-pad"
          />

          <View style={{ width: "100%", gap: 2 }}>
            <Input label="Senha" placeholder="********" />
            <TouchableOpacity>
              <Text
                size={12}
                color={theme.colors.primary[900]}
                style={{
                  textAlign: "right",
                }}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
        </FormContainer>

        <ButtonsContainer>
          <Button onPress={() => alert("Enter")}>Entrar</Button>
          <Button type="outlined" onPress={() => alert("Signup")}>
            Criar conta
          </Button>
        </ButtonsContainer>
      </LoginContainer>
    </Container>
  );
}
