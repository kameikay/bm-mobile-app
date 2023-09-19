import { ITEM_TYPE, UNIT_TYPE } from "@utils/itemTypes";

export type ListItemsResponse = {
  data: {
    items: Item[];
    total: number;
    page: number;
  };
};

export type Item = {
  id: string;
  item_name: string;
  warehouse_name: string;
  shelf_number: number;
  row_number: number;
  row_name: string;
  column_number: number;
  column_name: string;
  quantity_available: number;
  unit: UNIT_TYPE;
};

export type GetItemByIdResponse = {
  data: ItemByIdResponse;
};

export type ItemByIdResponse = {
  id: string;
  name: string;
  item_type: ITEM_TYPE;
  unit: UNIT_TYPE;
  item_classification: ItemClassification;
  item_subclassification: ItemSubclassification;
  description: string;
  location: Location;
};

export type ItemClassification = {
  id: string;
  name: string;
};

export type ItemSubclassification = {
  id: string;
  name: string;
};

export type Location = {
  warehouse_id: string;
  warehouse_name: string;
  shelf: Shelf;
};

export type Shelf = {
  id: string;
  shelf_number: number;
  shelf_row: ShelfRow;
  shelf_column: ShelfColumn;
};

export type ShelfRow = {
  id: string;
  row_number: number;
  row_name: string;
};

export type ShelfColumn = {
  id: string;
  column_number: number;
  column_name: string;
};

export type GetItemByNameResponse = {
  data: ItemByNameResponse[];
};

export type ItemByNameResponse = {
  id: string;
  name: string;
  unit: UNIT_TYPE;
  description: string;
  item_type: ITEM_TYPE;
};
