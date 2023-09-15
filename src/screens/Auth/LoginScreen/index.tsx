import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LockClosedIcon } from "@assets/icons/LockClosedIcon";
import { UserIcon } from "@assets/icons/UserIcon";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import { LoginFormType, loginFormSchema } from "@schemas/auth/login";
import AuthService from "@services/AuthService";
import { storage } from "@services/utils/storage";
import { theme } from "@styles/theme/default";
import { cpfMask } from "@utils/cpfMask";
import {
  ButtonsContainer,
  Container,
  FormContainer,
  HeaderContainer,
  LoginContainer,
} from "./styles";
import { AuthContext } from "@contexts/AuthContext";
import { AuthStackParamList } from "@navigation/AuthStack";

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  async function login(credentials: LoginFormType) {
    setIsLoading(true);
    try {
      const { data } = await AuthService.login(
        credentials.cpf.replace(/\D/g, ""),
        credentials.password
      );

      if (data.success) {
        storage.set("9sgbi.access_token", data.data.access_token);
        storage.set("9sgbi.refresh_token", data.data.refresh_token);
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
        Toast.show({
          type: "success",
          text1: "Bem-vindo(a)!",
          text2: "9º SGBI - Sistema.",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (
          error.response.data.message === "Unauthorized" ||
          error.response.data.message === "user not found" ||
          error.response.data.message === "wrong credentials"
        ) {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "Usuário ou senha incorretos.",
          });
        }

        if (error.response.data.message === "user not authorized by admin") {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "Usuário não autorizado pelo administrador.",
          });
        }

        if (error.response.data.message === "e-mail not validated") {
          const { data } = error.response.data;
          navigation.navigate("ConfirmationCode", {
            email: data.email,
          });

          Toast.show({
            type: "info",
            text1: "Oops!",
            text2: "E-mail não validado.",
          });
        }
      } else {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro desconhecido.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

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
    <Container>
      <LoginContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Image source={require("../../../assets/images/brasao.png")} />

        <HeaderContainer>
          <Text weight="600" size={24}>
            Bem-vindo(a)
          </Text>
          <Text style={{ textAlign: "center" }}>
            Por favor, preencha seus dados de acesso
          </Text>
        </HeaderContainer>

        <FormContainer>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                label="Usuário"
                placeholder="Digite seu usuário"
                keyboardType="number-pad"
                icon={UserIcon}
                onChangeText={(text) => {
                  setCpf(cpfMask(text));
                  onChange(cpfMask(text));
                }}
                value={cpf}
                error={errors.cpf?.message}
              />
            )}
          />

          <View style={{ width: "100%", gap: 2 }}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Senha"
                  placeholder="********"
                  icon={LockClosedIcon}
                  secureTextEntry
                  onChangeText={(text) => {
                    setPassword(text);
                    onChange(text);
                  }}
                  value={password}
                  error={errors.password?.message}
                />
              )}
            />
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
          <Button
            onPress={handleSubmit(login)}
            disabled={isLoading || !!errors.cpf || !!errors.password}
          >
            Entrar
          </Button>
          <Button type="outlined" onPress={() => navigation.navigate("SignUp")}>
            Criar conta
          </Button>
        </ButtonsContainer>
      </LoginContainer>
    </Container>
  );
}
