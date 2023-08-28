export interface Option<T> {
  value: T;
  label: string;
}
export enum SUPPLIER_TYPE {
  PJ = "PJ",
  PF = "PF",
}

export const SUPPLIER_TYPE_OPTIONS: Option<SUPPLIER_TYPE>[] = [
  { value: SUPPLIER_TYPE.PJ, label: "Pessoal Jurídica" },
  { value: SUPPLIER_TYPE.PF, label: "Pessoal Física" },
];

export const SUPPLIER_TYPE_LIST = [SUPPLIER_TYPE.PJ, SUPPLIER_TYPE.PF] as const;
