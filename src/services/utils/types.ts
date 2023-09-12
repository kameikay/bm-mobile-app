export type JwtType = {
  sub: string;
  exp: number;
  role: string;
  permissions: string[];
};

export type CustomResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};
