import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option } from "@customTypes/Option";

import { useItemOutput } from "@store/useItemOutput";
import ItemOutputService from "@services/ItemOutputService";
import {
  ItemOutputFormType,
  itemOutputFormSchema,
} from "@schemas/b4/item_outputs";
import { ITEM_TYPE, UNIT_TYPE } from "@utils/itemTypes";
import ItemService from "@services/ItemService";
import { ItemByNameResponse } from "@services/ItemService/types";
import useDebounce from "@hooks/useDebounce";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useQuery, useQueryClient } from "react-query";

export default function useItemOutputForm() {
  const { itemOutputId, handleCloseItemOutputModal } = useItemOutput();

  const [items, setItems] = useState<ItemByNameResponse[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [unit, setUnit] = useState<UNIT_TYPE | string>("");
  const [quantity, setQuantity] = useState<string>("");

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
    setError,
  } = useForm<ItemOutputFormType>({
    resolver: zodResolver(itemOutputFormSchema),
  });

  const debouncedItemName = useDebounce(itemName, 500);

  const watchItemId = watch("item_id");
  const watchSelfCaution = watch("self_caution");

  const itemsOptions: Option[] = useMemo(() => {
    if (!items) return [];

    return items?.map((itemClassification) => ({
      label: itemClassification.name,
      value: itemClassification.id,
    }));
  }, [items]);

  const query = useQueryClient();
  const { isLoading: isLoadingItemInputData } = useQuery(
    ["item-output", itemOutputId],
    () => ItemOutputService.getItemOutputById(itemOutputId!),
    {
      enabled: !!itemOutputId,
      onSuccess: ({ data }) => {
        setItems([
          {
            id: data.data.item.id,
            description: "",
            name: data.data.item.name,
            unit: data.data.item.unit,
            item_type: data.data.item.item_type,
          },
        ]);

        setValue("item_id", data.data.item.id);
        setItemName(data.data.item.name);
        setUnit(data.data.item.unit);
        setValue("item_type", data.data.item.item_type);
        setItemType(
          data.data.item.item_type === ITEM_TYPE.PERMANENT
            ? "Permanente"
            : "Consumo"
        );
        setValue("quantity", data.data.quantity);
        setQuantity(data.data.quantity.toString().replace(".", ","));
        setValue("motivation", data.data.motivation);
        setValue("self_caution", data.data.self_caution);
        setValue("responsible_name", data.data.responsible_name);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados do item",
        });
      },
    }
  );

  const { isLoading: isLoadingItemsByNameData } = useQuery(
    ["items", debouncedItemName],
    () => ItemService.getItemsByName(debouncedItemName),
    {
      onSuccess: ({ data }) => {
        setItems(data.data);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados do item",
        });
      },
    }
  );

  async function submitItem(formData: ItemOutputFormType) {
    if (!itemOutputId) {
      try {
        await ItemOutputService.createItemOutput(formData);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Saída registrada com sucesso",
        });
        query.invalidateQueries("item-outputs");
        handleCloseItemOutputModal();
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
          if (
            error.response.data.message ===
            "quantity greater than total item input quantity"
          ) {
            setError("quantity", {
              message: "Quantidade disponível insuficiente",
            });
            return;
          }
        }
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao registrar saída",
        });
      }
    } else {
      try {
        await ItemOutputService.editItemOutput(itemOutputId, formData);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Saída atualizada com sucesso",
        });
        query.invalidateQueries("item-outputs");
        handleCloseItemOutputModal();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Sucesso",
          text2: "Erro ao atualizar saída",
        });
      }
    }
  }

  useEffect(() => {
    if (watchItemId) {
      const selectedItem = items?.find((item) => item.id === watchItemId);
      setUnit(selectedItem?.unit as UNIT_TYPE);
      setValue("item_type", selectedItem?.item_type as ITEM_TYPE);
      setItemType(
        selectedItem?.item_type === ITEM_TYPE.PERMANENT
          ? "Permanente"
          : "Consumo"
      );
    }
  }, [watchItemId]);

  return {
    handleSubmit,
    submitItem,
    errors,
    setValue,
    itemsOptions,
    unit,
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
    getValues,
  };
}
