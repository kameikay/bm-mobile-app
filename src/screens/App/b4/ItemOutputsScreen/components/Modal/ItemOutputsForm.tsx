import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Switch,
  View,
} from "react-native";
import { Controller } from "react-hook-form";

import { Text } from "@components/Text";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import QRCodeModal from "@components/QRCodeModal";
import useItemOutputForm from "../../hooks/useItemOutputForm";
import currencyMask from "@utils/currencyMask";
import { ModalSearchBar } from "@components/ModalSearchBar";
import { theme } from "@styles/theme/default";
import { ItemButtonContainer, ItemDataContainer } from "./styles";

export default function ItemOutputsForm() {
  const {
    handleSubmit,
    submitItem,
    errors,
    itemsOptions,
    control,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    itemOutputId,
    itemType,
    watchSelfCaution,
    isLoadingItemInputData,
    isLoadingItemsByNameData,
    isLoadingItemByIdData,
    getValues,
    isQRCodeModalOpen,
    setIsQRCodeModalOpen,
    handleScanQRCode,
  } = useItemOutputForm();

  if (isLoadingItemInputData || isLoadingItemByIdData) {
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
        {itemOutputId ? "Edição" : "Cadastro"} de{" "}
        <Text
          color={theme.colors.red[400]}
          weight="600"
          style={{ textTransform: "uppercase" }}
        >
          retirada
        </Text>{" "}
        de item
      </Text>

      <ItemDataContainer>
        <Text weight="600">Dados do item</Text>

        {itemOutputId ? (
          <Input label="Item" value={itemName} disabled />
        ) : (
          <View>
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
                  disabled={!!itemOutputId}
                  error={errors.item_id?.message}
                  value={itemName}
                  isLoading={isLoadingItemsByNameData}
                />
              )}
            />
            <Pressable
              style={{ alignSelf: "flex-end" }}
              onPress={() => setIsQRCodeModalOpen(true)}
            >
              <Text color={theme.colors.primary[500]} size={12}>
                Escanear código
              </Text>
            </Pressable>
          </View>
        )}

        <Controller
          name="item_type"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Tipo"
              disabled
              value={itemType}
              onChange={onChange}
              error={errors.item_type?.message}
            />
          )}
        />
      </ItemDataContainer>

      {itemType === "Permanente" && (
        <ItemDataContainer>
          <View
            style={{
              backgroundColor: theme.colors.primary[400],
              padding: 4,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
            <Text
              weight="600"
              color="#fff"
              style={{ textTransform: "uppercase", textAlign: "center" }}
            >
              Termo de cautela
            </Text>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ textAlign: "justify" }}>
              Ao retirar o presente item permanente, você estará responsável
              pela devolução em{" "}
              <Text weight="600">até 15 (quinze) dias úteis</Text>, sob
              responsabilidade administrativa. Ao prosseguir, você estará de
              acordo com os termos.
            </Text>
          </View>
        </ItemDataContainer>
      )}

      <ItemDataContainer style={{ marginVertical: 16 }}>
        <Text weight="600">Quantidade</Text>

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

        <Controller
          name="motivation"
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              label="Motivo"
              onChangeText={onChange}
              error={errors.motivation?.message}
              value={getValues("motivation")}
            />
          )}
        />
      </ItemDataContainer>

      <ItemDataContainer>
        <Text weight="600">Responsável</Text>

        <Controller
          name="self_caution"
          control={control}
          render={({ field: { onChange } }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                color={
                  errors.self_caution
                    ? theme.colors.red[500]
                    : theme.colors.gray[900]
                }
              >
                Cautela própria
              </Text>
              <Switch
                onValueChange={onChange}
                value={getValues("self_caution")}
                trackColor={{
                  false: theme.colors.gray[200],
                  true: theme.colors.primary[500],
                }}
                thumbColor="#fff"
                disabled={!!itemOutputId}
              />
            </View>
          )}
        />

        {!watchSelfCaution && (
          <Controller
            name="responsible_name"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                label="Responsável pela cautela"
                onChangeText={onChange}
                error={errors.responsible_name?.message}
                value={getValues("responsible_name")}
              />
            )}
          />
        )}
      </ItemDataContainer>

      <ItemButtonContainer>
        <Button onPress={handleSubmit(submitItem)}>Salvar</Button>
      </ItemButtonContainer>

      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        onScan={handleScanQRCode}
      />
    </ScrollView>
  );
}
