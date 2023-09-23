export type Supplier = {
  supplier_entity_id: string;
  supplier_id: string;
  business_name: string;
  fantasy_name: string;
  cnpj: string;
  cellphone: string;
  comercial_phone: string;
  email: string;
  name: string;
  cpf: string;
};

export type GetSuppliersResponse = {
  success: boolean;
  message: string;
  data: {
    suppliers: Supplier[];
    total: number;
    page: number;
  };
};

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

export type ItemClassificationResponse = {
  success: boolean;
  message: string;
  data: {
    item_classifications: ItemClassification[];
    total: number;
    page: number;
  };
};

export type GetSupplerByIdResponse = {
  data: SupplerByIdResponse;
};

export type SupplerByIdResponse = {
  supplier_entity_id: string;
  supplier_id: string;
  business_name: string;
  fantasy_name: string;
  cnpj: string;
  tax_regime_code: string;
  tax_payer_type: string;
  state_registration: string;
  is_exempt: boolean;
  municipal_registration: string;
  name: string;
  cpf: string;
  rg: string;
  contact: SupplierContact;
  address: SupplierAddress;
};

export type SupplierContact = {
  id: string;
  cellphone: string;
  comercial_phone: string;
  email: string;
  responsible_name: string;
  responsible_role: string;
};

export type SupplierAddress = {
  id: string;
  cep: string;
  city: string;
  uf: string;
  street: string;
  number: string;
  district: string;
  complement: string;
};
