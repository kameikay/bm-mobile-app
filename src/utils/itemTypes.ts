export interface Option<T> {
  value: T;
  label: string;
}
export enum ITEM_TYPE {
  CONSUMPTION = "consumption",
  PERMANENT = "permanent",
}

export const ITEM_TYPE_OPTIONS: Option<ITEM_TYPE>[] = [
  { value: ITEM_TYPE.CONSUMPTION, label: "Consumo" },
  { value: ITEM_TYPE.PERMANENT, label: "Permanente" },
];

export const ITEM_TYPE_LIST = [
  ITEM_TYPE.CONSUMPTION,
  ITEM_TYPE.PERMANENT,
] as const;

export enum UNIT_TYPE {
  PCT = "pct",
  UND = "und",
  MG = "mg",
  G = "g",
  KG = "kg",
  ML = "ml",
  L = "l",
  MM = "mm",
  CM = "cm",
  M = "m",
  MM2 = "mm2",
  CM2 = "cm2",
  M2 = "m2",
  MM3 = "mm3",
  CM3 = "cm3",
  M3 = "m3",
}

export const UNIT_TYPE_OPTIONS: Option<UNIT_TYPE>[] = [
  { value: UNIT_TYPE.PCT, label: "pct." },
  { value: UNIT_TYPE.UND, label: "und." },
  { value: UNIT_TYPE.MG, label: "mg" },
  { value: UNIT_TYPE.G, label: "g" },
  { value: UNIT_TYPE.KG, label: "kg" },
  { value: UNIT_TYPE.ML, label: "ml" },
  { value: UNIT_TYPE.L, label: "l" },
  { value: UNIT_TYPE.MM, label: "mm" },
  { value: UNIT_TYPE.CM, label: "cm" },
  { value: UNIT_TYPE.M, label: "m" },
  { value: UNIT_TYPE.MM2, label: "mm²" },
  { value: UNIT_TYPE.CM2, label: "cm²" },
  { value: UNIT_TYPE.M2, label: "m²" },
  { value: UNIT_TYPE.MM3, label: "mm³" },
  { value: UNIT_TYPE.CM3, label: "cm³" },
  { value: UNIT_TYPE.M3, label: "m³" },
];

export const UNIT_TYPE_LIST = [
  UNIT_TYPE.PCT,
  UNIT_TYPE.UND,
  UNIT_TYPE.MG,
  UNIT_TYPE.G,
  UNIT_TYPE.KG,
  UNIT_TYPE.ML,
  UNIT_TYPE.L,
  UNIT_TYPE.MM,
  UNIT_TYPE.CM,
  UNIT_TYPE.M,
  UNIT_TYPE.MM2,
  UNIT_TYPE.CM2,
  UNIT_TYPE.M2,
  UNIT_TYPE.MM3,
  UNIT_TYPE.CM3,
  UNIT_TYPE.M3,
] as const;
