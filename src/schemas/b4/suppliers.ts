import { SUPPLIER_TYPE, SUPPLIER_TYPE_LIST } from "@utils/supplierTypes";
import { validateCnpj } from "@utils/validateCnpj";
import { validateCPF } from "@utils/validateCpf";
import { z } from "zod";

export const supplierFormSchema = z
  .object({
    supplier_type: z.enum(SUPPLIER_TYPE_LIST, {
      errorMap: (issue) => {
        switch (issue.code) {
        case "invalid_type":
          return { message: "Valor inválido" };
        case "invalid_enum_value":
          return { message: "Valor inválido" };
        default:
          return { message: "Valor inválido" };
        }
      },
    }),
    supplier: z.object({
      id: z.string().optional(),
      business_name: z.string().trim(),
      fantasy_name: z.string().trim().optional(),
      cnpj: z
        .string()
        .transform((cnpj: string) => cnpj.replace(/\D/g, ""))
        .optional(),
      tax_regime_code: z.string().optional(),
      tax_payer_type: z.string().optional(),
      state_registration: z.string().optional(),
      is_exempt: z.boolean().optional(),
      municipal_registration: z.string().optional(),
      address: z.object({
        cep: z.string().optional(),
        city: z.string().optional(),
        uf: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        district: z.string().optional(),
        complement: z.string().optional(),
      }),
      contact: z.object({
        email: z.string().optional(),
        cellphone: z.string().optional(),
        comercial_phone: z.string().trim().optional(),
        responsible_name: z.string().trim().optional(),
        responsible_role: z.string().trim().optional(),
      }),
      name: z.string().optional(),
      rg: z
        .string()
        .transform((rg: string) => rg.replace(/\D/g, ""))
        .optional(),
      cpf: z
        .string()
        .transform((cpf: string) => cpf.replace(/\D/g, ""))
        .optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.supplier_type === SUPPLIER_TYPE.PF) {
      if (!data.supplier.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome é obrigatório",
          path: ["supplier", "name"],
        });
      }
      if (!data.supplier.cpf) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF é obrigatório",
          path: ["supplier", "cpf"],
        });
      }

      if (!validateCPF(data.supplier.cpf || "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CPF inválido",
          path: ["supplier", "cpf"],
        });
      }
    }

    if (data.supplier_type === SUPPLIER_TYPE.PJ) {
      if (!data.supplier.business_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nome empresarial obrigatório",
          path: ["supplier", "business_name"],
        });
      }

      if (!data.supplier.cnpj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CNPJ é obrigatório",
          path: ["supplier", "cnpj"],
        });
      }

      if (!validateCnpj(data.supplier.cnpj || "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CNPJ inválido",
          path: ["supplier", "cnpj"],
        });
      }
    }
  });

export type SupplierFormType = z.infer<typeof supplierFormSchema>;
