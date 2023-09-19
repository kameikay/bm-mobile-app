import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ItemFormType, itemFormSchema } from "@schemas/b4/items";
import ItemService from "@services/ItemService";
import { useItem } from "@store/useItem";
import { useWarehouse } from "@store/useWarehouse";
import WarehouseService from "@services/WarehouseService";
import { Column, Row } from "@services/WarehouseService/types";
import { Option } from "@customTypes/Option";
import ItemClassificationService from "@services/ItemClassificationService";

export default function useItemForm() {
  const { itemId, handleCloseItemModal } = useItem();
  const { warehouses } = useWarehouse();
  const [shelvesOptions, setShelvesOptions] = useState<Option[]>([]);
  const [rowsOptions, setRowsOptions] = useState<Option[]>([]);
  const [columnsOptions, setColumnsOptions] = useState<Option[]>([]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
  } = useForm<ItemFormType>({
    resolver: zodResolver(itemFormSchema),
  });

  const watchItemClassificationId = watch("item_classification_id");
  const watchWarehouseId = watch("warehouse_id");
  const watchShelfId = watch("shelf_id");

  const query = useQueryClient();
  const {
    data: itemClassificationData,
    isLoading: isLoadingItemClassificationData,
  } = useQuery(
    ["item-classification"],
    () => ItemClassificationService.getItemClassifications(),
    {
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar classificações",
        });
      },
    }
  );
  const { data: itemData, isLoading: isLoadingItemData } = useQuery(
    ["item", itemId],
    () => ItemService.getItemById(itemId!),
    {
      enabled: !!itemId,
      onSuccess: ({ data }) => {
        setValue("name", data.data.name);
        setValue("item_type", data.data.item_type);
        setValue("unit", data.data.unit);
        setValue("item_classification_id", data.data.item_classification.id);
        setValue(
          "item_subclassification_id",
          data.data.item_subclassification.id
        );
        setValue("description", data.data.description);
        setValue("warehouse_id", data.data.location.warehouse_id);
        setValue("shelf_id", data.data.location.shelf.id);
        setValue("shelf_row_id", data.data.location.shelf.shelf_row.id);
        setValue("shelf_column_id", data.data.location.shelf.shelf_column.id);
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
  const { data: warehouseData, isLoading: isLoadingWarehouseData } = useQuery(
    ["warehouse", watchWarehouseId],
    () => WarehouseService.getWarehouseById(watchWarehouseId!),
    {
      enabled: !!watchWarehouseId,
      onSuccess: ({ data }) => {
        const shelvesOptions = data.data.shelves.map((shelf) => ({
          label: String(shelf.shelf_number),
          value: shelf.id,
        }));

        setShelvesOptions(shelvesOptions);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados do almoxarifado",
        });
      },
    }
  );
  const { data: shelfData, isLoading: isLoadingShelfData } = useQuery(
    ["shelf", watchShelfId],
    () => WarehouseService.getShelfById(watchShelfId!),
    {
      enabled: !!watchShelfId,
      onSuccess: ({ data }) => {
        const rows = data.data.rows.map((row: Row) => ({
          label:
            row.row_name !== ""
              ? `${row.row_number} (${row.row_name})`
              : String(row.row_number),
          value: row.id,
        }));

        const columns = data.data.columns.map((column: Column) => ({
          label:
            column.column_name !== ""
              ? `${column.column_number} (${column.column_name})`
              : String(column.column_number),
          value: column.id,
        }));

        setRowsOptions(rows);
        setColumnsOptions(columns);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados da estante",
        });
      },
    }
  );

  async function submitItem(formData: ItemFormType) {
    if (!itemId) {
      try {
        await ItemService.createItem(formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Item criado com sucesso",
        });
        query.invalidateQueries(["items"]);
        handleCloseItemModal();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao criar item",
        });
      }
    } else {
      try {
        await ItemService.editItem(itemId, formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Item atualizado com sucesso",
        });
        query.invalidateQueries(["items"]);
        handleCloseItemModal();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao atualizar item",
        });
      }
    }
  }

  const itemClassificationsOptions = useMemo(() => {
    if (!itemClassificationData) return [];

    return itemClassificationData.data.data.item_classifications.map(
      (itemClassification) => ({
        label: itemClassification.name,
        value: itemClassification.id,
      })
    );
  }, [itemClassificationData]);

  const itemSubclassificationsOptions = useMemo(() => {
    if (!watchItemClassificationId || !itemClassificationData) return [];

    const itemClassifications = itemClassificationData.data.data;

    const itemClassification = itemClassifications.item_classifications.find(
      (itemClassification) =>
        itemClassification.item_subclassifications.find(
          (subclassification) =>
            subclassification.item_classification_id ===
            watchItemClassificationId
        )
    );

    if (!itemClassification) return [];

    return itemClassification?.item_subclassifications.map(
      (itemSubclassification) => ({
        label: itemSubclassification.name,
        value: itemSubclassification.id,
      })
    );
  }, [watchItemClassificationId]);

  const warehousesOptions = useMemo(() => {
    if (!warehouses) return [];

    return warehouses.map((warehouse) => ({
      label: warehouse.name,
      value: warehouse.id,
    }));
  }, [warehouses]);

  const isLoading: boolean = useMemo(() => {
    if (
      isLoadingItemData ||
      isLoadingWarehouseData ||
      isLoadingShelfData ||
      isLoadingItemClassificationData
    )
      return true;

    return false;
  }, [
    isLoadingItemData,
    isLoadingWarehouseData,
    isLoadingShelfData,
    isLoadingItemClassificationData,
  ]);

  return {
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
    itemData,
    warehouseData,
    shelfData,
    isLoading,
    itemId,
    getValues,
  };
}
