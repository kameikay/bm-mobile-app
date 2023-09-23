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
import ItemCard from "./components/ItemCard";
import ItemModal from "./components/Modal";
import { InboxIcon } from "@assets/icons/InboxIcon";
import ItemService from "@services/ItemService";
import { useItem } from "@store/useItem";

export default function ItemsScreen() {
  //  TODO: add infinite scroll
  const { data, isLoading } = useQuery("items", () => ItemService.getItems(), {
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao buscar dados dos itens",
      });
    },
  });
  const { isItemModalOpen, setIsItemModalOpen } = useItem();
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!data || !data.data) return [];

    return data.data.data.items?.filter((item) => {
      return item.item_name.toLowerCase().includes(search.toLowerCase());
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
          <InboxIcon />
          <Text
            weight="500"
            color={theme.colors.primary[900]}
            style={{ textTransform: "uppercase" }}
          >
            Itens
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
            onPress={() => setIsItemModalOpen(true)}
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
          data={filteredItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 16,
            paddingBottom: Platform.OS === "android" ? 64 : 32,
          }}
          renderItem={({ item }) => (
            <ItemCard
              id={item.id}
              item_name={item.item_name}
              warehouse_name={item.warehouse_name}
              shelf_number={item.shelf_number}
              row_number={item.row_number}
              row_name={item.row_name}
              column_number={item.column_number}
              column_name={item.column_name}
              quantity_available={item.quantity_available}
              unit={item.unit}
            />
          )}
        />
      </ControlContainer>

      <ItemModal
        isModalOpen={isItemModalOpen}
        setIsModalOpen={setIsItemModalOpen}
      />
    </Container>
  );
}
