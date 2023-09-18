import { Column, Row } from "@services/WarehouseService/types";

type Field = Row | Column;

export interface IShelfInputProps {
  type: "row" | "column";
  field: Field;
  fieldToEdit: number | null;
  setFieldToEdit: (field: number | null) => void;
  onEdit: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export type DetermineFieldType<T extends "row" | "column"> = T extends "row"
  ? Row
  : Column;
