export type ItemClassification = {
  id: string;
  name: string;
  item_subclassifications: ItemSubclassification[];
};

export type ItemSubclassification = {
  id: string;
  name: string;
  item_classification_id: string;
};

export type GetItemClassificationsResponse = {
  data: {
    item_classifications: ItemClassification[];
  };
};

export type GetItemClassificationByIdResponse = {
  data: ItemClassificationByIdResponse;
};

export type ItemClassificationByIdResponse = {
  item_classification_id: string;
  item_classification_name: string;
  item_subclassifications: ItemSubclassificationById[];
};

export type ItemClassificationById = {
  id: string;
  name: string;
};

export type ItemSubclassificationById = {
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
