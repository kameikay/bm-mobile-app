import { ActivityIndicator, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { Controller } from "react-hook-form";

import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import { ItemButtonContainer, ItemDataContainer } from "./styles";
import { Input } from "@components/Input";

import useItemForm from "../../hooks/useItemForm";
import { Button } from "@components/Button";
import { Select } from "@components/Select";
import { ITEM_TYPE_OPTIONS, UNIT_TYPE_OPTIONS } from "@utils/itemTypes";

export default function ItemForm() {
  const {
    handleSubmit,
    submitItem,
    errors,
    itemClassificationsOptions,
    itemSubclassificationsOptions,
    warehousesOptions,
    shelvesOptions,
    rowsOptions,
    columnsOptions,
    control,
    isLoading,
    itemId,
    getValues,
  } = useItemForm();

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        weight="600"
        style={{ textTransform: "uppercase" }}
        color={theme.colors.primary[900]}
      >
        {itemId ? "Edição" : "Cadastro"} de item
      </Text>

      <ItemDataContainer>
        <Text weight="600">Dados do item</Text>

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Nome do item*"
              placeholder="Ex.: Capacete Gallet"
              onChangeText={onChange}
              error={errors.name?.message}
              value={getValues("name")}
            />
          )}
        />

        <Controller
          name="item_type"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Tipo de material"
              options={ITEM_TYPE_OPTIONS}
              onChangeSelect={onChange}
              error={errors.item_type?.message}
              value={getValues("item_type")}
            />
          )}
        />

        <Controller
          name="unit"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Unidade de medida"
              options={UNIT_TYPE_OPTIONS}
              onChangeSelect={onChange}
              error={errors.unit?.message}
              value={getValues("unit")}
            />
          )}
        />

        <Controller
          name="item_classification_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Classificação"
              options={itemClassificationsOptions}
              onChangeSelect={onChange}
              error={errors.item_classification_id?.message}
              value={getValues("item_classification_id")}
            />
          )}
        />

        <Controller
          name="item_subclassification_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Sub-classificação"
              options={itemSubclassificationsOptions}
              onChangeSelect={onChange}
              error={errors.item_subclassification_id?.message}
              value={getValues("item_subclassification_id")}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Descrição do item"
              placeholder="Ex.: Gallet branco"
              onChangeText={onChange}
              error={errors.description?.message}
              value={getValues("description")}
            />
          )}
        />
      </ItemDataContainer>

      <ItemDataContainer>
        <Text weight="600">Localização</Text>

        <Controller
          name="warehouse_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Almoxarifado"
              options={warehousesOptions}
              onChangeSelect={onChange}
              error={errors.warehouse_id?.message}
              value={getValues("warehouse_id")}
            />
          )}
        />

        <Controller
          name="shelf_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Estante"
              options={shelvesOptions}
              onChangeSelect={onChange}
              error={errors.shelf_id?.message}
              value={getValues("shelf_id")}
            />
          )}
        />

        <Controller
          name="shelf_row_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Fileira"
              options={rowsOptions}
              onChangeSelect={onChange}
              error={errors.shelf_row_id?.message}
              value={getValues("shelf_row_id")}
            />
          )}
        />

        <Controller
          name="shelf_column_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Coluna"
              options={columnsOptions}
              onChangeSelect={onChange}
              error={errors.shelf_column_id?.message}
              value={getValues("shelf_column_id")}
            />
          )}
        />
      </ItemDataContainer>

      <ItemButtonContainer>
        <Button onPress={handleSubmit(submitItem)}>Salvar</Button>
      </ItemButtonContainer>
      <Toast />
    </ScrollView>
  );
}
