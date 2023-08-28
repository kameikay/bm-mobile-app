export interface Option<T> {
  value: T;
  label: string;
}
export enum SOURCE_TYPE {
  STATE = "state",
  REVOLVING_FUND = "revolving_fund",
  FUNREBOM = "funrebom",
  DONATION = "donation",
  OTHER = "other",
}

export const SOURCE_TYPE_OPTIONS: Option<SOURCE_TYPE>[] = [
  { value: SOURCE_TYPE.STATE, label: "Estado" },
  { value: SOURCE_TYPE.REVOLVING_FUND, label: "Fundo Rotativo" },
  { value: SOURCE_TYPE.FUNREBOM, label: "FUNREBOM" },
  { value: SOURCE_TYPE.DONATION, label: "Doação" },
  { value: SOURCE_TYPE.OTHER, label: "Outro" },
];

export const SOURCE_TYPE_LIST = [
  SOURCE_TYPE.STATE,
  SOURCE_TYPE.REVOLVING_FUND,
  SOURCE_TYPE.FUNREBOM,
  SOURCE_TYPE.DONATION,
  SOURCE_TYPE.OTHER,
] as const;
