import { Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthStackTypes } from "@navigation/AuthStack";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
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
import { SignUpFormType, signupFormSchema } from "@schemas/auth/signup";
import { useState } from "react";
import AuthService from "@services/AuthService";
import { AxiosError } from "axios";
import { UF, UF_LIST_OPTIONS } from "@utils/ufList";
import { Select } from "@components/Select";
import { USER_RANK_OPTIONS } from "@utils/userRanks";
import { MagnifyingClassIcon } from "@assets/icons/MagnifyingClassIcon";
import { cpfMask } from "@utils/cpfMask";
import rgMask from "@utils/rgMask";
import dateMask from "@utils/dateMask";
import { cepMask } from "@utils/cepMask";
import { phoneMask } from "@utils/phoneMask";

export default function SignUpScreen() {
  const navigation = useNavigation<AuthStackTypes>();

  const [cpf, setCpf] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signupFormSchema),
  });

  async function signUp(data: SignUpFormType) {
    setIsSubmitting(true);
    try {
      const response = await AuthService.register(data);

      if (response.status === 201) {
        // navigation.navigate(`/signup/confirm?email=${data.contact.email}`);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.message === "cpf already used") {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "CPF já cadastrado.",
          });
          setError("user.cpf", {
            type: "manual",
            message: "CPF já cadastrado.",
          });
          return;
        }

        if (error.response.data.message === "e-mail already used") {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "E-mail já cadastrado.",
          });
          setError("contact.email", {
            type: "manual",
            message: "E-mail já cadastrado.",
          });
          return;
        }

        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro desconhecido.",
        });
      } else {
        console.log("Erro desconhecido", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCepSearch() {
    const cepInput = getValues("address.cep");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${cepInput}`
      );
      const data = await response.json();
      console.log(data);
      setValue("address.street", data.street, {
        shouldValidate: true,
      });
      setValue("address.district", data.neighborhood, {
        shouldValidate: true,
      });
      setValue("address.city", data.city, {
        shouldValidate: true,
      });
      setValue("address.uf", data.state as UF, {
        shouldValidate: true,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "CEP não encontrado.",
      });
    } finally {
      setIsLoading(false);
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
              Dados pessoais
            </Text>

            {/* Nome completo */}
            <Controller
              control={control}
              name="user.name"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Nome completo"
                  placeholder="Seu nome completo (sem abreviações)"
                  onChangeText={onChange}
                  error={errors.user?.name?.message}
                  value={value}
                />
              )}
            />

            {/* Sexo */}
            <Controller
              control={control}
              name="user.gender"
              render={({ field: { onChange } }) => (
                <Select
                  label="Sexo"
                  options={[
                    { label: "Masc.", value: "m" },
                    { label: "Fem.", value: "f" },
                  ]}
                  onChangeSelect={onChange}
                  error={errors.user?.gender?.message}
                />
              )}
            />

            {/* CPF */}
            <Controller
              control={control}
              name="user.cpf"
              render={() => (
                <Input
                  label="CPF*"
                  placeholder="Ex.: 123.456.789-00"
                  onChangeText={(text) => {
                    setCpf(cpfMask(text));
                    setValue("user.cpf", text, {
                      shouldValidate: true,
                    });
                  }}
                  value={cpf}
                  keyboardType="numeric"
                  error={errors.user?.cpf?.message}
                />
              )}
            />

            {/* RG */}
            <Controller
              control={control}
              name="user.rg"
              render={() => (
                <Input
                  label="RG"
                  placeholder="Ex.: 12.345.678-9"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setRg(rgMask(text));
                    setValue("user.rg", text, {
                      shouldValidate: true,
                    });
                  }}
                  value={rg}
                  error={errors.user?.rg?.message}
                />
              )}
            />

            {/* Posto/Graduação */}
            <Controller
              control={control}
              name="user.user_rank"
              render={({ field: { onChange } }) => (
                <Select
                  label="Posto/Graduação"
                  options={USER_RANK_OPTIONS}
                  onChangeSelect={onChange}
                  error={errors.user?.user_rank?.message}
                />
              )}
            />

            {/* Data de nascimento */}
            <Controller
              control={control}
              name="user.birthdate"
              render={() => (
                <Input
                  label="Data de nascimento"
                  placeholder="Ex.: 01/01/1990"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setBirthdate(dateMask(text));
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setValue("user.birthdate", text as any, {
                      shouldValidate: true,
                    });
                  }}
                  value={birthdate}
                  error={errors.user?.birthdate?.message}
                />
              )}
            />
          </FormContainer>

          <FormContainer>
            <Text
              weight="600"
              style={{
                marginBottom: 8,
              }}
            >
              Endereço de residência
            </Text>

            {/* CEP */}
            <Controller
              control={control}
              name="address.cep"
              render={() => (
                <Input
                  label="CEP"
                  placeholder="Ex.: 87705-370"
                  onChangeText={(text) => {
                    setCep(cepMask(text));
                    setValue("address.cep", text, {
                      shouldValidate: true,
                    });
                  }}
                  value={cep}
                  icon={MagnifyingClassIcon}
                  iconButtonFunction={handleCepSearch}
                  error={errors.address?.cep?.message}
                  keyboardType="number-pad"
                />
              )}
            />

            {/* Cidade */}
            <Controller
              control={control}
              name="address.cep"
              render={({ field: { onChange } }) => (
                <Input
                  label="Cidade"
                  placeholder="Ex.: Paranavaí"
                  onChange={onChange}
                  error={errors.address?.city?.message}
                  disabled={isLoading}
                  value={getValues("address.city")}
                />
              )}
            />

            {/* UF */}
            <Controller
              control={control}
              name="address.uf"
              render={({ field: { onChange } }) => (
                <Select
                  label="UF"
                  options={UF_LIST_OPTIONS}
                  onChangeSelect={onChange}
                  error={errors.address?.uf?.message}
                  disabled={isLoading}
                  value={getValues("address.uf")}
                />
              )}
            />

            {/* Logradouro */}
            <Controller
              control={control}
              name="address.street"
              render={({ field: { onChange } }) => (
                <Input
                  label="Logradouro"
                  placeholder="Ex.: Av. John Kennedy"
                  onChangeText={onChange}
                  error={errors.address?.street?.message}
                  disabled={isLoading}
                  value={getValues("address.street")}
                />
              )}
            />

            {/* Número */}
            <Controller
              control={control}
              name="address.number"
              render={({ field: { onChange } }) => (
                <Input
                  label="Número"
                  placeholder="Ex.: 565"
                  onChangeText={onChange}
                  error={errors.address?.number?.message}
                />
              )}
            />

            {/* Bairro */}
            <Controller
              control={control}
              name="address.district"
              render={({ field: { onChange } }) => (
                <Input
                  label="Bairro"
                  placeholder="Ex.: Jardim Iguaçu"
                  onChangeText={onChange}
                  error={errors.address?.district?.message}
                  value={getValues("address.district")}
                />
              )}
            />

            {/* Complemento */}
            <Controller
              control={control}
              name="address.complement"
              render={({ field: { onChange } }) => (
                <Input
                  label="Complemento"
                  placeholder="Ex.: Quartel do Bombeiro"
                  onChangeText={onChange}
                  error={errors.address?.complement?.message}
                />
              )}
            />
          </FormContainer>

          <FormContainer>
            <Text
              weight="600"
              style={{
                marginBottom: 8,
              }}
            >
              Contato
            </Text>

            {/* E-mail */}
            <Controller
              control={control}
              name="contact.email"
              render={({ field: { onChange } }) => (
                <Input
                  label="E-mail"
                  placeholder="Ex.: fulano@email.com"
                  onChangeText={onChange}
                  keyboardType="email-address"
                  error={errors.contact?.email?.message}
                />
              )}
            />

            {/* Telefone celular */}
            <Controller
              control={control}
              name="contact.phone"
              render={() => (
                <Input
                  label="Telefone celular"
                  placeholder="Pref. com WhatsApp"
                  onChangeText={(text) => {
                    setPhone(phoneMask(text));
                    setValue("contact.phone", text, {
                      shouldValidate: true,
                    });
                  }}
                  value={phone}
                  error={errors.contact?.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />
          </FormContainer>

          <FormContainer>
            <Text
              weight="600"
              style={{
                marginBottom: 8,
              }}
            >
              Senha (mínimo 8 caracteres)
            </Text>

            {/* Senha */}
            <Controller
              control={control}
              name="user.password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Senha"
                  placeholder="********"
                  secureTextEntry
                  onChangeText={onChange}
                  error={errors.user?.password?.message}
                />
              )}
            />

            {/* Telefone celular */}
            <Controller
              control={control}
              name="user.confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Confirmar senha"
                  placeholder="********"
                  secureTextEntry
                  onChangeText={onChange}
                  error={errors.user?.confirm_password?.message}
                />
              )}
            />
          </FormContainer>
          <ButtonsContainer>
            <Button
              onPress={handleSubmit(signUp)}
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
