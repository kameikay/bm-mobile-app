import { ITEM_TYPE, UNIT_TYPE } from "@utils/itemTypes";

export type GetItemOutputsResponse = {
  success: boolean;
  message: string;
  data: ListItemOutputsResponse;
};

export type ItemOutput = {
  id: string;
  item_name: string;
  quantity: number;
  unit: string;
  warehouse_name: string;
  updated_at: Date;
};

export type ListItemOutputsResponse = {
  item_outputs: ItemOutput[];
  total: number;
  page: number;
};

export type GetItemOutputByIdResponse = {
  data: ItemOutputByIdResponse;
};

export type ItemOutputByIdResponse = {
  id: string;
  item: Item;
  quantity: number;
  motivation: string;
  self_caution: boolean;
  responsible_name: string;
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: string;
  name: string;
  unit: UNIT_TYPE;
  item_type: ITEM_TYPE;
};
