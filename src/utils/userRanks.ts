export interface Option<T> {
  value: T;
  label: string;
}

export enum USER_RANK {
  CORONEL = "cel",
  TENENTE_CORONEL = "tc",
  MAJOR = "maj",
  CAPITAO = "cap",
  PRIMEIRO_TENENTE = "1ten",
  SEGUNDO_TENENTE = "2ten",
  ASPIRANTE = "asp",
  SUBTENENTE = "subten",
  PRIMEIRO_SARGENTO = "1sgt",
  SEGUNDO_SARGENTO = "2sgt",
  TERCEIRO_SARGENTO = "3sgt",
  CABO = "cb",
  SOLDADO = "sd",
  GUARDA_VIDA_CIVIL = "gvc",
}

export const USER_RANK_OPTIONS: Option<USER_RANK>[] = [
  { value: USER_RANK.CORONEL, label: "Coronel" },
  { value: USER_RANK.TENENTE_CORONEL, label: "Ten.-Cel." },
  { value: USER_RANK.MAJOR, label: "Major" },
  { value: USER_RANK.CAPITAO, label: "Capitão" },
  { value: USER_RANK.PRIMEIRO_TENENTE, label: "1º Ten." },
  { value: USER_RANK.SEGUNDO_TENENTE, label: "2º Ten." },
  { value: USER_RANK.ASPIRANTE, label: "Aspirante" },
  { value: USER_RANK.SUBTENENTE, label: "Subtenente" },
  { value: USER_RANK.PRIMEIRO_SARGENTO, label: "1º Sgt." },
  { value: USER_RANK.SEGUNDO_SARGENTO, label: "2º Sgt." },
  { value: USER_RANK.TERCEIRO_SARGENTO, label: "3º Sgt." },
  { value: USER_RANK.CABO, label: "Cabo" },
  { value: USER_RANK.SOLDADO, label: "Soldado" },
  { value: USER_RANK.GUARDA_VIDA_CIVIL, label: "GVC" },
];

export const USER_RANK_LIST = [
  USER_RANK.CORONEL,
  USER_RANK.TENENTE_CORONEL,
  USER_RANK.MAJOR,
  USER_RANK.CAPITAO,
  USER_RANK.PRIMEIRO_TENENTE,
  USER_RANK.SEGUNDO_TENENTE,
  USER_RANK.ASPIRANTE,
  USER_RANK.SUBTENENTE,
  USER_RANK.PRIMEIRO_SARGENTO,
  USER_RANK.SEGUNDO_SARGENTO,
  USER_RANK.TERCEIRO_SARGENTO,
  USER_RANK.CABO,
  USER_RANK.SOLDADO,
  USER_RANK.GUARDA_VIDA_CIVIL,
] as const;

export function getUserRankName(userRank: string) {
  switch (userRank) {
  case USER_RANK.CORONEL:
    return "Coronel";
  case USER_RANK.TENENTE_CORONEL:
    return "Tenente-Coronel";
  case USER_RANK.MAJOR:
    return "Major";
  case USER_RANK.CAPITAO:
    return "Capitão";
  case USER_RANK.PRIMEIRO_TENENTE:
    return "1º Tenente";
  case USER_RANK.SEGUNDO_TENENTE:
    return "2º Tenente";
  case USER_RANK.ASPIRANTE:
    return "Aspirante";
  case USER_RANK.SUBTENENTE:
    return "Subtenente";
  case USER_RANK.PRIMEIRO_SARGENTO:
    return "1º Sargento";
  case USER_RANK.SEGUNDO_SARGENTO:
    return "2º Sargento";
  case USER_RANK.TERCEIRO_SARGENTO:
    return "3º Sargento";
  case USER_RANK.CABO:
    return "Cabo";
  case USER_RANK.SOLDADO:
    return "Soldado";
  case USER_RANK.GUARDA_VIDA_CIVIL:
    return "GVC";
  default:
    return "";
  }
}
