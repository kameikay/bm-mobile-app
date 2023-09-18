import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useQuery, useQueryClient } from "react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  WarehouseFormType,
  warehousesFormSchema,
} from "@schemas/b4/warehouses";
import WarehouseService from "@services/WarehouseService";
import { useWarehouse } from "@store/useWarehouse";

type ShelfToDelete = {
  shelf_id: string;
  shelf_number: number;
};

export default function useWarehouseForm() {
  const {
    setIsShelfModalOpen,
    warehouseId,
    setWarehouseId,
    setShelfNumber,
    setShelfId,
  } = useWarehouse();
  const query = useQueryClient();
  const [shelfToDelete, setShelfToDelete] = useState<ShelfToDelete | null>(
    null
  );

  const {
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<WarehouseFormType>({
    resolver: zodResolver(warehousesFormSchema),
  });

  const { data, isLoading } = useQuery(
    ["warehouse", warehouseId],
    () => WarehouseService.getWarehouseById(warehouseId!),
    {
      enabled: !!warehouseId,
      onSuccess: ({ data }) => {
        setValue("name", data.data.name);
        setValue("local", data.data.local || "");
        setValue("description", data.data.description || "");
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

  async function submitWarehouse(formData: WarehouseFormType) {
    if (!warehouseId) {
      try {
        const { data } = await WarehouseService.createWarehouse(formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Almoxarifado criado com sucesso",
        });
        query.invalidateQueries("warehouses");
        setWarehouseId(data.data.id);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao criar almoxarifado",
        });
      }
    } else {
      try {
        await WarehouseService.editWarehouse(warehouseId, formData);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Almoxarifado atualizado com sucesso",
        });
        query.invalidateQueries({ queryKey: ["warehouses"] });
        query.invalidateQueries({ queryKey: ["warehouse"] });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao atualizar almoxarifado",
        });
      }
    }
  }

  async function addShelf() {
    if (!warehouseId || !data?.data.data) return;

    try {
      const { data: shelf } = await WarehouseService.createShelf(warehouseId);
      setShelfId(shelf.data.id);
      setShelfNumber(data?.data.data?.shelves.length + 1);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Estante criada com sucesso",
      });
      setIsShelfModalOpen(true);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao criar estante",
      });
    }
  }

  async function handleEditShelf(id: string) {
    setShelfId(id);
    setIsShelfModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setShelfToDelete(null);
  }

  async function handleDeleteShelf() {
    if (!shelfToDelete || !warehouseId) return;

    try {
      await WarehouseService.deleteShelf(shelfToDelete.shelf_id);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Estante deletada com sucesso",
      });
      setShelfToDelete(null);

      query.invalidateQueries({ queryKey: ["warehouses"] });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao deletar estante",
      });
    }
  }

  return {
    handleSubmit,
    submitWarehouse,
    register,
    warehouseId,
    errors,
    addShelf,
    handleEditShelf,
    shelfToDelete,
    setShelfToDelete,
    handleCloseDeleteModal,
    handleDeleteShelf,
    data,
    isLoading,
    control,
    getValues,
  };
}
