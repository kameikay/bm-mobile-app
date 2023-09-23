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
import { InboxStackIcon } from "@assets/icons/InboxStackIcon";
import { Input } from "@components/Input";
import { MagnifyingClassIcon } from "@assets/icons/MagnifyingClassIcon";
import { theme } from "@styles/theme/default";
import WarehouseCard from "./components/WarehouseCard";
import WarehouseModal from "./components/Modal";
import WarehouseService from "@services/WarehouseService";
import dayjs from "@utils/dayjs";
import { useWarehouse } from "@store/useWarehouse";

export default function ControlScreen() {
  const { isModalOpen, setIsModalOpen, setWarehouses } = useWarehouse();
  //  TODO: add infinite scroll
  const { data, isLoading } = useQuery(
    "warehouses",
    () => WarehouseService.getWarehouses(),
    {
      onSuccess: ({ data }) => {
        setWarehouses(data.data);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados dos almoxarifados",
        });
      },
    }
  );
  const [search, setSearch] = useState("");

  const filteredWarehouses = useMemo(() => {
    if (!data) return [];

    return data.data.data.filter((warehouse) => {
      return warehouse.name.toLowerCase().includes(search.toLowerCase());
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
          <InboxStackIcon />
          <Text weight="600" size={20}>
            Almoxarifados
          </Text>
        </HeaderContainer>

        <SearchContainer>
          <Input
            label="Buscar almoxarifado"
            placeholder="Ex.: Almoxarifado 1"
            icon={MagnifyingClassIcon}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            onPress={() => setIsModalOpen(true)}
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
          data={filteredWarehouses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 16,
            paddingBottom: Platform.OS === "android" ? 64 : 32,
          }}
          renderItem={({ item }) => (
            <WarehouseCard
              id={item.id}
              name={item.name}
              location={item.local}
              updatedAt={dayjs(item.updated_at).format("DD/MM/YYYY")}
            />
          )}
        />
      </ControlContainer>

      <WarehouseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
}
