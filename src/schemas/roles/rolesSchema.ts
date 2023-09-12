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
  permissions: Permissions;
};

export type Permissions = {
  edit_users: boolean;
  edit_roles: boolean;
};
