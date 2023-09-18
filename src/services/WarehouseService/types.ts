export type GetWarehouseByIdResposne = {
  data: WarehouseByIdResponse;
};

export type WarehouseByIdResponse = {
  id: string;
  name: string;
  local?: string;
  description?: string;
  shelves: {
    id: string;
    shelf_number: number;
    row_count: number;
    column_count: number;
  }[];
};

export type CreateWarehouseResponse = {
  data: {
    id: string;
  };
};

export type CreateShelfResponse = {
  data: {
    id: string;
  };
};

export type ShelfResponse = {
  data: {
    id: string;
    shelf_number: number;
    warehouse_id: string;
    rows: Row[];
    columns: Column[];
  };
};

export type Row = {
  id: string;
  row_number: number;
  row_name: string;
};

export type Column = {
  id: string;
  column_number: number;
  column_name: string;
};
