import { useState } from "react";
import Toast from "react-native-toast-message";

import WarehouseService from "@services/WarehouseService";
import { Column, Row } from "@services/WarehouseService/types";
import { useWarehouse } from "@store/useWarehouse";
import { useQuery, useQueryClient } from "react-query";

export default function useShelfForm() {
  const { setShelfNumber, shelfNumber, shelfId } = useWarehouse();
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [rowToEdit, setRowToEdit] = useState<number | null>(null);
  const [columnToEdit, setColumnToEdit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = useQueryClient();
  const { data } = useQuery(
    ["shelf", shelfId],
    async () => WarehouseService.getShelfById(shelfId!),
    {
      onSuccess: ({ data }) => {
        setRows(data.data.rows);
        setColumns(data.data.columns);
        setShelfNumber(data.data.shelf_number);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: "Erro ao buscar dados da estante",
        });
      },
      enabled: !!shelfId,
    }
  );

  async function addColumn() {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao adicionar coluna",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.createColumn(shelfId, "");
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Coluna adicionada com sucesso",
      });
      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao adicionar coluna",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function addRow() {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao adicionar fileira",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.createRow(shelfId, "");
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Fileira adicionada com sucesso",
      });

      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao adicionar fileira",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function editColumn(columnId: string, name: string) {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao editar coluna",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.editColumn(shelfId, columnId, name);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Coluna editada com sucesso",
      });
      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao editar coluna",
      });
    } finally {
      setIsLoading(false);
      setColumnToEdit(null);
    }
  }

  async function editRow(rowId: string, name: string) {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao editar fileira",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.editRow(shelfId, rowId, name);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Fileira editada com sucesso",
      });
      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao editar fileira",
      });
    } finally {
      setIsLoading(false);
      setRowToEdit(null);
    }
  }

  async function deleteRow(rowId: string) {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao deletar fileira",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.deleteRow(shelfId, rowId);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Fileira deletada com sucesso",
      });
      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao deletar fileira",
      });
    } finally {
      setIsLoading(false);
      setRowToEdit(null);
    }
  }

  async function deleteColumn(columnId: string) {
    if (!shelfId) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao deletar coluna",
      });
      return;
    }
    setIsLoading(true);
    try {
      await WarehouseService.deleteColumn(shelfId, columnId);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Coluna deletada com sucesso",
      });
      query.invalidateQueries(["shelf", shelfId]);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Erro ao deletar coluna",
      });
    } finally {
      setIsLoading(false);
      setColumnToEdit(null);
    }
  }

  return {
    shelfNumber,
    addRow,
    addColumn,
    columns,
    editColumn,
    columnToEdit,
    setColumnToEdit,
    rows,
    editRow,
    rowToEdit,
    setRowToEdit,
    deleteRow,
    deleteColumn,
    isLoading,
    data,
  };
}
