import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";

import { Text } from "@components/Text";
import {
  ButtonsContainer,
  ChangePasswordContainer,
  Container,
  FormContainer,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@components/Input";
import UserService from "@services/UserService";
import {
  ChangePasswordFormType,
  changePasswordFormSchema,
} from "@schemas/configs/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/Button";

export default function PersonalDataScreen() {
  const mutation = useMutation({
    mutationFn: (data: ChangePasswordFormType) =>
      UserService.changePassword(data),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  async function changePassword(data: ChangePasswordFormType) {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(data);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Senha alterada com sucesso.",
      });
    } catch (error) {
      console.log("Erro desconhecido", error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro desconhecido.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container>
      <ChangePasswordContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            width: "100%",
          }}
        >
          <FormContainer>
            <Text
              weight="600"
              style={{
                marginBottom: 8,
              }}
            >
              Alterar senha
            </Text>

            {/* Senha atual */}
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Senha atual"
                  placeholder="********"
                  onChangeText={onChange}
                  error={errors.old_password?.message}
                  secureTextEntry
                />
              )}
            />

            {/* Senha nova */}
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Nova senha"
                  placeholder="********"
                  onChangeText={onChange}
                  error={errors.old_password?.message}
                  secureTextEntry
                />
              )}
            />

            {/* Confirmação de senha */}
            <Controller
              control={control}
              name="confirm_new_password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Confirmar senha"
                  placeholder="********"
                  onChangeText={onChange}
                  error={errors.old_password?.message}
                  secureTextEntry
                />
              )}
            />
          </FormContainer>

          <ButtonsContainer>
            <Button
              onPress={handleSubmit(changePassword)}
              disabled={isSubmitting}
            >
              Atualizar senha
            </Button>
          </ButtonsContainer>
        </ScrollView>
      </ChangePasswordContainer>
    </Container>
  );
}
