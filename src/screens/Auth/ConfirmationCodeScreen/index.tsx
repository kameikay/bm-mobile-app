import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthStackParamList } from "@navigation/AuthStack";
import { Text } from "@components/Text";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { theme } from "@styles/theme/default";
import {
  ButtonsContainer,
  ConfirmationCodeContainer,
  Container,
  FormContainer,
  HeaderContainer,
} from "./styles";
import AuthService from "@services/AuthService";
import {
  ValidadeAccountType,
  validadeAccountFormSchema,
} from "@schemas/auth/validadeAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export default function ConfirmationCode({
  navigation,
  route,
}: NativeStackScreenProps<AuthStackParamList, "ConfirmationCode">) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidadeAccountType>({
    resolver: zodResolver(validadeAccountFormSchema),
    defaultValues: {
      code_confirmation: "" as unknown as never,
    },
  });

  async function validate(data: ValidadeAccountType) {
    setIsSubmitting(true);
    try {
      if (!route.params?.email) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "E-mail não encontrado.",
        });
        return;
      }

      const response = await AuthService.confirmAccount(
        data.code_confirmation,
        route.params?.email
      );

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Conta ativada com sucesso.",
        });

        navigation.navigate("Login");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.message === "wrong code provided") {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "Código inválido.",
          });
          return;
        }
      } else {
        console.log("Erro desconhecido", error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro desconhecido.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendEmail() {
    setIsSubmitting(true);
    try {
      if (!route.params?.email) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "E-mail não encontrado.",
        });
        return;
      }

      await AuthService.resendEmail(route.params?.email);

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "E-mail de confirmação enviado.",
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: error.response.data.message,
        });
      } else {
        console.log("Erro desconhecido", error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro desconhecido.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container>
      <ConfirmationCodeContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
          }}
        >
          <HeaderContainer>
            <Text weight="600" size={24}>
              Cadastro
            </Text>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Preencha seus dados para cadatro. Já tem conta? Clique{" "}
              <Text
                color={theme.colors.primary[400]}
                onPress={() => navigation.navigate("Login")}
              >
                aqui
              </Text>
              <Text>.</Text>
            </Text>
          </HeaderContainer>

          <FormContainer>
            <Text
              weight="600"
              style={{
                marginBottom: 8,
              }}
            >
              Confira seu e-mail
            </Text>

            {/* Código */}
            <Controller
              control={control}
              name="code_confirmation"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Código de confirmação"
                  placeholder="Digite o código de confirmação"
                  onChangeText={onChange}
                  error={errors.code_confirmation?.message}
                  keyboardType="number-pad"
                  value={String(value) || ""}
                />
              )}
            />
            <Text size={14}>
              Não recebeu o código? Clique{" "}
              <Text
                color={theme.colors.primary[400]}
                onPress={() => resendEmail()}
                size={14}
              >
                aqui
              </Text>
              <Text size={14}> para reenviar.</Text>
            </Text>
          </FormContainer>

          <ButtonsContainer>
            <Button onPress={handleSubmit(validate)} disabled={isSubmitting}>
              Validar
            </Button>
          </ButtonsContainer>
        </ScrollView>
      </ConfirmationCodeContainer>
    </Container>
  );
}
