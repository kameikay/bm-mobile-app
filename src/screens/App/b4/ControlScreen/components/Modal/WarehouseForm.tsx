import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import {
  ShelvesContainer,
  WarehouseButtonContainer,
  WarehouseDataContainer,
} from "./styles";
import { Input } from "@components/Input";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import ShelfCard from "../ShelfCard";
import useWarehouseForm from "../../hooks/useWarehouseForm";
import { Controller } from "react-hook-form";
import { Button } from "@components/Button";
import Toast from "react-native-toast-message";

export default function WarehouseForm() {
  const {
    data,
    warehouseId,
    isLoading,
    control,
    errors,
    getValues,
    handleSubmit,
    submitWarehouse,
    addShelf,
  } = useWarehouseForm();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </View>
    );
  }

  return (
    <>
      <Text
        weight="600"
        size={20}
        style={{ textTransform: "uppercase" }}
        color={theme.colors.primary[900]}
      >
        {warehouseId ? "Edição" : "Cadastro"} de almoxarifado
      </Text>

      <WarehouseDataContainer>
        <Text weight="600">Dados do almoxarifado</Text>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Nome do almoxarifado"
              placeholder="Ex.: Almoxarifado 1"
              onChangeText={onChange}
              error={errors.name?.message}
              value={getValues("name")}
            />
          )}
        />

        <Controller
          name="local"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Localização"
              placeholder="Ex.: Rampa 1"
              onChangeText={onChange}
              error={errors.local?.message}
              value={getValues("local")}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Descrição"
              placeholder="Ex.: Materiais eletrônicos"
              onChangeText={onChange}
              error={errors.description?.message}
              value={getValues("description")}
            />
          )}
        />
      </WarehouseDataContainer>

      {warehouseId && (
        <ShelvesContainer>
          <Text weight="600">Disposição interna do almoxarifado</Text>

          <TouchableOpacity onPress={() => addShelf()}>
            <Text
              size={14}
              color={theme.colors.primary[300]}
              style={{
                alignSelf: "flex-end",
              }}
            >
              Adicionar prateleira
            </Text>
          </TouchableOpacity>

          <FlatList
            data={data?.data.data.shelves}
            keyExtractor={(shelf) => shelf.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              rowGap: 16,
              paddingBottom: 32,
            }}
            renderItem={({ item: shelf }) => (
              <ShelfCard
                id={shelf.id}
                shelf_number={shelf.shelf_number}
                row_count={shelf.row_count}
                column_count={shelf.column_count}
              />
            )}
          />
        </ShelvesContainer>
      )}

      <WarehouseButtonContainer>
        <Button onPress={handleSubmit(submitWarehouse)}>Salvar</Button>
      </WarehouseButtonContainer>
      <Toast />
    </>
  );
}
