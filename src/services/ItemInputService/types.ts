import { UNIT_TYPE } from "@utils/itemTypes";
import { SOURCE_TYPE } from "@utils/sourceType";

export type GetItemInputsResponse = {
  success: boolean;
  message: string;
  data: {
    item_inputs: ItemInput[];
    total: number;
    page: number;
  };
};

export type ItemInput = {
  id: string;
  item_name: string;
  quantity: number;
  unit: string;
  warehouse_name: string;
  updated_at: Date;
};

export type GetItemInputByIdResponse = {
  data: ItemInputByIdResponse;
};

export type ItemInputByIdResponse = {
  id: string;
  source_type: SOURCE_TYPE;
  number_plate: string;
  unit_price: number;
  quantity: number;
  item: Item;
  supplier: Supplier;
};

type Item = {
  id: string;
  name: string;
  unit: UNIT_TYPE;
};

type Supplier = {
  id: string;
  name: string;
};
