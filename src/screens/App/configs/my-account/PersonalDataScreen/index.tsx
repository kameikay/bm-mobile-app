import { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import Toast from "react-native-toast-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@components/Text";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import {
  ButtonsContainer,
  Container,
  FormContainer,
  PersonalDataContainer,
} from "./styles";
import {
  editPersonalDataFormSchema,
  EditPersonalDataFormType,
} from "@schemas/configs/editPersonalData";
import { UF, UF_LIST_OPTIONS } from "@utils/ufList";
import { Select } from "@components/Select";
import { USER_RANK, USER_RANK_OPTIONS } from "@utils/userRanks";
import { MagnifyingClassIcon } from "@assets/icons/MagnifyingClassIcon";
import rgMask from "@utils/rgMask";
import dateMask from "@utils/dateMask";
import { cepMask } from "@utils/cepMask";
import { phoneMask } from "@utils/phoneMask";
import UserService from "@services/UserService";
import { storage } from "@services/utils/storage";
import { useSelfDataStore } from "src/store/useSelfData";
import { cpfMask } from "@utils/cpfMask";

export default function SignUpScreen() {
  const queryClient = useQueryClient();
  const { selfData } = useSelfDataStore();
  const mutation = useMutation({
    mutationFn: (data: EditPersonalDataFormType) =>
      UserService.editPersonalData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selfData"] });
    },
  });
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
  } = useForm<EditPersonalDataFormType>({
    resolver: zodResolver(editPersonalDataFormSchema),
  });

  async function editPersonalAccount(data: EditPersonalDataFormType) {
    setIsSubmitting(true);
    try {
      const response = await mutation.mutateAsync(data);
      storage.set("9sgbi.access_token", response.data.data.access_token);
      storage.set("9sgbi.refresh_token", response.data.data.refresh_token);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Dados atualizados.",
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.message === "e-mail already used") {
          setError("contact.email", {
            type: "manual",
            message: "E-mail já cadastrado.",
          });
          Toast.show({
            type: "error",
            text1: "Erro!",
            text2: "E-mail já cadastrado.",
          });
          return;
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro desconhecido.",
        });
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
        text1: "Erro!",
        text2: "CEP não encontrado.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (selfData && !!selfData.id) {
      const birthdateString = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "UTC",
      }).format(new Date(selfData.birthdate));

      setValue("user.name", selfData.name, {
        shouldValidate: true,
      });
      setCpf(cpfMask(selfData.cpf));
      setValue("user.gender", selfData.gender as "m" | "f", {
        shouldValidate: true,
      });
      setValue("user.rg", selfData.rg, { shouldValidate: true });
      setRg(rgMask(selfData.rg));
      setValue("user.user_rank", selfData.user_rank as USER_RANK, {
        shouldValidate: true,
      });
      setValue("user.birthdate", birthdateString as unknown as never);
      setBirthdate(dateMask(birthdateString));
      setValue("address.cep", selfData.address.cep, { shouldValidate: true });
      setCep(cepMask(selfData.address.cep));

      setValue("address.city", selfData.address.city, {
        shouldValidate: true,
      });
      setValue("address.uf", selfData.address.uf as UF, {
        shouldValidate: true,
      });
      setValue("address.street", selfData.address.street, {
        shouldValidate: true,
      });
      setValue("address.number", selfData.address.number, {
        shouldValidate: true,
      });
      setValue("address.district", selfData.address.district, {
        shouldValidate: true,
      });
      setValue("address.complement", selfData.address.complement, {
        shouldValidate: true,
      });
      setValue("contact.email", selfData.contact.email, {
        shouldValidate: true,
      });
      setPhone(phoneMask(selfData.contact.phone));
      setValue("contact.phone", selfData.contact.phone, {
        shouldValidate: true,
      });
    }
  }, [selfData]);

  return (
    <Container>
      <PersonalDataContainer
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
                  value={getValues("user.gender")}
                />
              )}
            />

            {/* CPF */}
            <Input label="CPF*" value={cpf} disabled />

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
                  value={getValues("user.user_rank")}
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
                  value={getValues("address.number")}
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
                  value={getValues("address.complement")}
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
                  value={getValues("contact.email")}
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

          <ButtonsContainer>
            <Button
              onPress={handleSubmit(editPersonalAccount)}
              disabled={isLoading || isSubmitting}
            >
              Atualizar
            </Button>
          </ButtonsContainer>
        </ScrollView>
      </PersonalDataContainer>
    </Container>
  );
}
