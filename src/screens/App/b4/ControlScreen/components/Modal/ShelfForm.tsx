import { Platform } from "react-native";
import { Text } from "@components/Text";
import { theme } from "@styles/theme/default";
import ShelfInput from "../ShelfInput";
import useShelfForm from "../../hooks/useShelfForm";
import { useEffect } from "react";
import {
  CreateButton,
  FieldsContainer,
  FieldsOuterContainer,
  ShelfCreateButtons,
} from "./styles";
import { PlusIcon } from "@assets/icons/PlusIcon";

export default function ShelfForm() {
  const {
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
    data,
  } = useShelfForm();

  useEffect(() => {
    return () => {
      setColumnToEdit(null);
      setRowToEdit(null);
    };
  }, []);

  return (
    <>
      <Text
        weight="600"
        style={{ textTransform: "uppercase" }}
        color={theme.colors.gray[900]}
      >
        Estante número {data ? data.data.data.shelf_number : shelfNumber}
      </Text>

      <ShelfCreateButtons>
        <CreateButton onPress={() => addRow()}>
          <PlusIcon color={theme.colors.primary[400]} width={16} height={16} />
          <Text
            weight="600"
            color={theme.colors.primary[400]}
            style={{
              textTransform: "uppercase",
            }}
          >
            fileira
          </Text>
        </CreateButton>

        <CreateButton onPress={() => addColumn()}>
          <PlusIcon color={theme.colors.primary[400]} width={16} height={16} />
          <Text
            weight="600"
            color={theme.colors.primary[400]}
            style={{
              textTransform: "uppercase",
            }}
          >
            coluna
          </Text>
        </CreateButton>
      </ShelfCreateButtons>

      <Text weight="600">Disposição da estante</Text>
      <FieldsOuterContainer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 64 : 32,
        }}
      >
        <FieldsContainer>
          <Text
            weight="600"
            color={theme.colors.primary[400]}
            style={{ textTransform: "uppercase" }}
          >
            Colunas
          </Text>

          {columns.map((column) => (
            <ShelfInput
              key={column.id}
              type="column"
              field={column}
              fieldToEdit={columnToEdit}
              setFieldToEdit={setColumnToEdit}
              onEdit={editColumn}
              onDelete={deleteColumn}
            />
          ))}
        </FieldsContainer>

        <FieldsContainer style={{ marginTop: 24 }}>
          <Text
            weight="600"
            color={theme.colors.primary[400]}
            style={{ textTransform: "uppercase" }}
          >
            Fileiras
          </Text>

          {rows.map((row) => (
            <ShelfInput
              key={row.id}
              type="row"
              field={row}
              fieldToEdit={rowToEdit}
              setFieldToEdit={setRowToEdit}
              onEdit={editRow}
              onDelete={deleteRow}
            />
          ))}
        </FieldsContainer>
      </FieldsOuterContainer>
    </>
  );
}
