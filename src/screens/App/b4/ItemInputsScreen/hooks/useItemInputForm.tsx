import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import Toast from "react-native-toast-message";
import { zodResolver } from "@hookform/resolvers/zod";

import { Option } from "@customTypes/Option";
import { useItemInput } from "@store/useItemInput";
import ItemInputService from "@services/ItemInputService";
import {
  ItemInputFormType,
  itemInputFormSchema,
} from "@schemas/b4/item_inputs";
import { useSupplier } from "@store/useSupplier";
import ItemService from "@services/ItemService";
import { ItemByNameResponse } from "@services/ItemService/types";
import useDebounce from "@hooks/useDebounce";
import SupplierService from "@services/SupplierService";

export default function useItemInputForm() {
  const [, startTransition] = useTransition();
  const { itemInputId, handleCloseItemInputModal } = useItemInput();
  const { suppliers, setSupplierId, setSuppliers } = useSupplier();

  const [items, setItems] = useState<ItemByNameResponse[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ItemInputFormType>({
    resolver: zodResolver(itemInputFormSchema),
  });

  const debouncedItemName = useDebounce(itemName, 500);

  const itemsOptions: Option[] = useMemo(() => {
    if (!items) return [];

    return items?.map((itemClassification) => ({
      label: itemClassification.name,
      value: itemClassification.id,
    }));
  }, [items]);

  const suppliersOptions: Option[] = useMemo(() => {
    if (!suppliers) return [];

    return suppliers?.map((supplier) => {
      if (!!supplier.business_name || !!supplier.fantasy_name) {
        return {
          label: supplier.business_name || supplier.fantasy_name,
          value: supplier.supplier_entity_id,
        };
      }

      return {
        label: supplier.name,
        value: supplier.supplier_entity_id,
      };
    });
  }, [suppliers]);

  const query = useQueryClient();

  const { isLoading: isLoadingItemInputData } = useQuery(
    ["item-input", itemInputId],
    () => ItemInputService.getItemInputById(itemInputId!),
    {
      enabled: !!itemInputId,
      onSuccess: ({ data }) => {
        setItems([
          {
            id: data.data.item.id,
            description: "",
            name: data.data.item.name,
            unit: data.data.item.unit,
            item_type: "" as unknown as never,
          },
        ]);

        setValue("item_id", data.data.item.id);
        setItemName(data.data.item.name);
        setValue("source", data.data.source_type);
        setValue("number_plate", data.data.number_plate);
        setValue("supplier_id", data.data.supplier.id);
        setSupplierId(data.data.supplier.id);
        setValue("unit_price", data.data.unit_price);
        setUnitPrice(data.data.unit_price.toString().replace(".", ","));
        setValue("quantity", data.data.quantity);
        setQuantity(data.data.quantity.toString().replace(".", ","));
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados da entrada",
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

  const { isLoading: isLoadingSuppliersData } = useQuery(
    "suppliers",
    () => SupplierService.getSuppliers(),
    {
      onSuccess: ({ data }) => {
        setSuppliers(data.data.suppliers);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados do fornecedor",
        });
      },
    }
  );

  async function submitItem(formData: ItemInputFormType) {
    if (!itemInputId) {
      try {
        await ItemInputService.createItemInput(formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Entrada registrada com sucesso",
        });
        query.invalidateQueries("item-inputs");
        startTransition(() => {
          handleCloseItemInputModal();
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao registrar entrada",
        });
      }
    } else {
      try {
        await ItemInputService.editItemInput(itemInputId, formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Entrada atualizada com sucesso",
        });
        query.invalidateQueries("item-inputs");
        startTransition(() => {
          handleCloseItemInputModal();
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao atualizar entrada",
        });
      }
    }
  }

  const isLoading = useMemo(() => {
    return isLoadingItemInputData || isLoadingSuppliersData;
  }, [isLoadingItemInputData, isLoadingSuppliersData]);

  return {
    handleSubmit,
    submitItem,
    getValues,
    errors,
    setValue,
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
  };
}
