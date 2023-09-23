import { ActivityIndicator, ScrollView, View } from "react-native";
import { Controller } from "react-hook-form";

import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import { ItemButtonContainer, ItemDataContainer } from "./styles";
import { Input } from "@components/Input";

import { Button } from "@components/Button";
import { Select } from "@components/Select";
import useItemInputForm from "../../hooks/useItemInputForm";
import { SOURCE_TYPE_OPTIONS } from "@utils/sourceType";
import currencyMask from "@utils/currencyMask";
import formatCurrency from "@utils/formatCurrency";
import { ModalSearchBar } from "@components/ModalSearchBar";

export default function ItemInputsForm() {
  const {
    handleSubmit,
    submitItem,
    getValues,
    errors,
    itemsOptions,
    suppliersOptions,
    unitPrice,
    setUnitPrice,
    control,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    itemInputId,
    isLoading,
    isLoadingItemsByNameData,
  } = useItemInputForm();

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
        size={20}
        style={{ textTransform: "uppercase" }}
        color={theme.colors.primary[900]}
      >
        {itemInputId ? "Edição" : "Cadastro"} de{" "}
        <Text
          color={theme.colors.green[400]}
          weight="600"
          size={20}
          style={{ textTransform: "uppercase" }}
        >
          entrada
        </Text>{" "}
        de item
      </Text>

      <ItemDataContainer>
        <Text weight="600">Dados do item</Text>

        {itemInputId ? (
          <Input label="Item" value={itemName} disabled />
        ) : (
          <Controller
            name="item_id"
            control={control}
            render={({ field: { onChange } }) => (
              <ModalSearchBar
                label="Item"
                onChangeSelect={onChange}
                searchText={itemName}
                setSearchText={setItemName}
                options={itemsOptions}
                disabled={!!itemInputId}
                error={errors.item_id?.message}
                value={itemName}
                isLoading={isLoadingItemsByNameData}
              />
            )}
          />
        )}

        <Controller
          name="source"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Fonte"
              options={SOURCE_TYPE_OPTIONS}
              onChangeSelect={onChange}
              error={errors.source?.message}
              value={getValues("source")}
            />
          )}
        />

        <Controller
          name="number_plate"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Plaqueta"
              placeholder="Ex.: ABC123456"
              onChangeText={onChange}
              error={errors.number_plate?.message}
              value={getValues("number_plate")}
            />
          )}
        />

        <Controller
          name="supplier_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              label="Fornecedor"
              options={suppliersOptions}
              onChangeSelect={onChange}
              error={errors.supplier_id?.message}
              value={getValues("supplier_id")}
            />
          )}
        />
      </ItemDataContainer>

      <ItemDataContainer>
        <Text weight="600">Valores e quantidades</Text>

        <Controller
          name="unit_price"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Valor unitário (R$)"
              placeholder="Ex.: 19,90"
              keyboardType="decimal-pad"
              onChangeText={(value: string) => {
                const currencyValue = currencyMask(value).replaceAll(",", ".");
                setUnitPrice(currencyValue);
                onChange(Number(currencyValue));
              }}
              error={errors.unit_price?.message}
              value={currencyMask(unitPrice)}
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Quantidade"
              placeholder="Ex.: 10"
              onChangeText={(value: string) => {
                const formattedValue = currencyMask(value).replaceAll(",", ".");
                setQuantity(formattedValue);
                onChange(Number(formattedValue));
              }}
              error={errors.quantity?.message}
              value={currencyMask(quantity)}
              keyboardType="decimal-pad"
            />
          )}
        />

        <Input
          label="Valor total (R$)"
          placeholder="0,00"
          value={formatCurrency(
            Number(unitPrice.replace(",", ".")) *
              Number(quantity.replace(",", "."))
          )}
          disabled
        />
      </ItemDataContainer>

      <ItemButtonContainer>
        <Button onPress={handleSubmit(submitItem)}>Salvar</Button>
      </ItemButtonContainer>
    </ScrollView>
  );
}
