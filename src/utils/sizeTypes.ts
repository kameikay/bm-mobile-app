export interface Option<T> {
  value: T;
  label: string;
}
export enum SIZE_TYPE {
  PP = "pp",
  P = "p",
  M = "m",
  G = "g",
  GG = "gg",
  XG = "xg",
}

export const SIZE_TYPE_OPTIONS: Option<SIZE_TYPE>[] = [
  { value: SIZE_TYPE.PP, label: "PP" },
  { value: SIZE_TYPE.P, label: "P" },
  { value: SIZE_TYPE.M, label: "M" },
  { value: SIZE_TYPE.G, label: "G" },
  { value: SIZE_TYPE.GG, label: "GG" },
  { value: SIZE_TYPE.XG, label: "XG" },
];

export const NUMBER_SIZE_TYPE_OPTIONS: Option<number>[] = [
  { value: 34, label: "34" },
  { value: 35, label: "35" },
  { value: 36, label: "36" },
  { value: 37, label: "37" },
  { value: 38, label: "38" },
  { value: 39, label: "39" },
  { value: 40, label: "40" },
  { value: 41, label: "41" },
  { value: 42, label: "42" },
  { value: 43, label: "43" },
  { value: 44, label: "44" },
  { value: 45, label: "45" },
];

export const SIZE_TYPE_LIST = [
  SIZE_TYPE.PP,
  SIZE_TYPE.P,
  SIZE_TYPE.M,
  SIZE_TYPE.G,
  SIZE_TYPE.GG,
  SIZE_TYPE.XG,
] as const;

export const NUMBER_SIZE_TYPE_LIST = [
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
] as const;
