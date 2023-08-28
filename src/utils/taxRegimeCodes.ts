export interface Option<T> {
  value: T;
  label: string;
}
export enum TAX_REGIME_CODE {
  SIMPLES_NACIONAL = "1 - Simples Nacional",
  SIMPLES_NACIONAL_EXCESSO = "2 - Simples Nacional - Excesso de sublimite de receita bruta",
  REGIME_NORMAL = "3 - Regime Normal",
  TRIBUTADA_COM_PERMISSAO_CREDITO = "101 - Tributada com permissão de crédito",
  TRIBUTADA_SEM_PERMISSAO_CREDITO = "102 - Tributada sem permissão de crédito",
  ISENCAO_ICMS_FAIXA_RECEITA_BRUTA = "103 - Isenção do ICMS faixa para faixa de receita bruta",
  TRIBUTADA_COM_PERMISSAO_CREDITO_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA = "201 - Tributada com permissão de crédito e com cobrança do ICMS por substituição tributária",
  TRIBUTADA_SEM_PERMISSAO_CREDITO_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA = "202 - Tributada sem permissão de crédito e com cobrança do ICMS por substituição tributária",
  ISENCAO_ICMS_FAIXA_RECEITA_BRUTA_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA = "203 - Isenção do ICMS faixa para faixa de receita bruta e com cobrança do ICMS por substituição tributária",
  IMUNE = "300 - Imune",
  NAO_TRIBUTADA = "400 - Não tributada",
  ICMS_COBRADO_ANTERIORMENTE_POR_SUBSTITUICAO_TRIBUTARIA = "500 - ICMS cobrado anteriormente por substituição tributária ou por antecipação",
  OUTROS = " 900 - Outros",
}

export const TAX_REGIME_CODE_OPTIONS: Option<TAX_REGIME_CODE>[] = [
  { value: TAX_REGIME_CODE.SIMPLES_NACIONAL, label: "1 - Simples Nacional" },
  {
    value: TAX_REGIME_CODE.SIMPLES_NACIONAL_EXCESSO,
    label: "2 - Simples Nacional - Excesso de sublimite de receita bruta",
  },
  { value: TAX_REGIME_CODE.REGIME_NORMAL, label: "3 - Regime Normal" },
  {
    value: TAX_REGIME_CODE.TRIBUTADA_COM_PERMISSAO_CREDITO,
    label: "101 - Tributada com permissão de crédito",
  },
  {
    value: TAX_REGIME_CODE.TRIBUTADA_SEM_PERMISSAO_CREDITO,
    label: "102 - Tributada sem permissão de crédito",
  },
  {
    value: TAX_REGIME_CODE.ISENCAO_ICMS_FAIXA_RECEITA_BRUTA,
    label: "103 - Isenção do ICMS faixa para faixa de receita bruta",
  },
  {
    value:
      TAX_REGIME_CODE.TRIBUTADA_COM_PERMISSAO_CREDITO_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA,
    label:
      "201 - Tributada com permissão de crédito e com cobrança do ICMS por substituição tributária",
  },
  {
    value:
      TAX_REGIME_CODE.TRIBUTADA_SEM_PERMISSAO_CREDITO_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA,
    label:
      "202 - Tributada sem permissão de crédito e com cobrança do ICMS por substituição tributária",
  },
  {
    value:
      TAX_REGIME_CODE.ISENCAO_ICMS_FAIXA_RECEITA_BRUTA_E_COBRANCA_ICSM_POR_SUBSTITUICAO_TRIBUTARIA,
    label:
      "203 - Isenção do ICMS faixa para faixa de receita bruta e com cobrança do ICMS por substituição tributária",
  },
  { value: TAX_REGIME_CODE.IMUNE, label: "300 - Imune" },
  { value: TAX_REGIME_CODE.NAO_TRIBUTADA, label: "400 - Não tributada" },
  {
    value:
      TAX_REGIME_CODE.ICMS_COBRADO_ANTERIORMENTE_POR_SUBSTITUICAO_TRIBUTARIA,
    label:
      "500 - ICMS cobrado anteriormente por substituição tributária ou por antecipação",
  },
  { value: TAX_REGIME_CODE.OUTROS, label: "900 - Outros" },
];
