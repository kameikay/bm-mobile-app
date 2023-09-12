import { Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthStackTypes } from "@navigation/AuthStack";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@components/Text";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { theme } from "@styles/theme/default";
import {
  ButtonsContainer,
  Container,
  FormContainer,
  HeaderContainer,
  SignUpContainer,
} from "./styles";
import { useContext, useState } from "react";
import AuthService from "@services/AuthService";
import { AxiosError } from "axios";
import {
  ValidadeAccountType,
  validadeAccountFormSchema,
} from "@schemas/auth/validadeAccount";
import { AuthContext } from "@contexts/AuthContext";

export default function SignUpScreen() {
  const navigation = useNavigation<AuthStackTypes>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidadeAccountType>({
    resolver: zodResolver(validadeAccountFormSchema),
  });

  async function validate(data: ValidadeAccountType) {
    setIsSubmitting(true);
    try {
      if (!email) {
        toast({
          text: "E-mail não encontrado",
          type: TOAST_TYPE.ERROR,
        });
        return;
      }

      const response = await AuthService.confirmAccount(
        data.code_confirmation,
        email
      );

      if (response.data.success) {
        toast({
          text: "Conta ativada com sucesso",
          type: TOAST_TYPE.SUCCESS,
        });
        router.push("/signup/success");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.message === "wrong code provided") {
          toast({
            text: "Código inválido",
            type: TOAST_TYPE.ERROR,
          });
          return;
        }

        toast({
          text: error.response.data.message,
          type: TOAST_TYPE.ERROR,
        });
      } else {
        console.log("Erro desconhecido", error);
        toast({
          text: "Erro desconhecido",
          type: TOAST_TYPE.ERROR,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendEmail() {
    try {
      if (!email) {
        toast({
          text: "E-mail não encontrado",
          type: TOAST_TYPE.ERROR,
        });
        return;
      }

      await AuthService.resendEmail(email);

      // toast({
      //   text: "E-mail de confirmação enviado",
      //   type: TOAST_TYPE.INFO,
      // });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // toast({
        //   text: error.response.data.message,
        //   type: TOAST_TYPE.ERROR,
        // });
      } else {
        console.log("Erro desconhecido", error);
      }
    }
  }

  return (
    <Container>
      <SignUpContainer
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
                  value={value}
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
            <Button
              onPress={handleSubmit(validate)}
              disabled={isLoading || isSubmitting}
            >
              Cadastrar
            </Button>
          </ButtonsContainer>
        </ScrollView>
      </SignUpContainer>
    </Container>
  );
}
