import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import Toast from "react-native-toast-message";

import { Text } from "@components/Text";
import {
  Container,
  ControlContainer,
  HeaderContainer,
  SearchContainer,
} from "./styles";
import { Input } from "@components/Input";
import { MagnifyingClassIcon } from "@assets/icons/MagnifyingClassIcon";
import { theme } from "@styles/theme/default";
import { ArrowUpCircle } from "@assets/icons/ArrowUpCircleIcon";
import ItemInputService from "@services/ItemInputService";
import { useItemInput } from "@store/useItemInput";
import ItemInputCard from "./components/ItemInputCard";
import ItemInputsModal from "./components/Modal";

export default function ItemInputsScreen() {
  //  TODO: add infinite scroll
  const { data, isLoading } = useQuery(
    "item-inputs",
    () => ItemInputService.getItemInputs(),
    {
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados das entradas",
        });
      },
    }
  );
  const { isItemInputModalOpen, setIsItemInputModalOpen } = useItemInput();
  const [search, setSearch] = useState("");

  const filteredItemInputs = useMemo(() => {
    if (!data || !data.data) return [];

    return data.data.data.item_inputs?.filter((inputs) => {
      return inputs.item_name.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary[300]} />
      </Container>
    );
  }

  return (
    <Container>
      <ControlContainer
        behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <HeaderContainer>
          <ArrowUpCircle />
          <Text
            weight="500"
            color={theme.colors.primary[900]}
            style={{ textTransform: "uppercase" }}
          >
            Entrada de itens
          </Text>
        </HeaderContainer>

        <SearchContainer>
          <Input
            label="Buscar item"
            placeholder="Ex.: Gallet"
            icon={MagnifyingClassIcon}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            onPress={() => setIsItemInputModalOpen(true)}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Text size={14} color={theme.colors.primary[300]}>
              Adicionar
            </Text>
          </TouchableOpacity>
        </SearchContainer>

        <FlatList
          data={filteredItemInputs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 16,
            paddingBottom: Platform.OS === "android" ? 64 : 32,
          }}
          renderItem={({ item }) => (
            <ItemInputCard
              id={item.id}
              item_name={item.item_name}
              warehouse_name={item.warehouse_name}
              quantity={item.quantity}
              unit={item.unit}
              updated_at={item.updated_at}
            />
          )}
        />
      </ControlContainer>

      <ItemInputsModal
        isModalOpen={isItemInputModalOpen}
        setIsModalOpen={setIsItemInputModalOpen}
      />
    </Container>
  );
}
