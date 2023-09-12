export type MeResponse = {
  data: Me;
};

export type Me = {
  id: string;
  name: string;
  role_id: string | null;
  rg: string;
  cpf: string;
  user_rank: string;
  birthdate: Date;
  gender: string;
  is_active: boolean;
  is_authorized: boolean;
  created_at: Date;
  updated_at: Date;
  contact: Contact;
  address: Address;
  role?: Role;
};

export type Contact = {
  id: string;
  user_id: string;
  email: string;
  phone: string;
};

export type Address = {
  id: string;
  user_id: string;
  cep: string;
  city: string;
  uf: string;
  street: string;
  number: string;
  district: string;
  complement: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: {
    edit_users: boolean;
    edit_roles: boolean;
  };
};
