import { z } from "zod";
import parseStringToDate from "@utils/parseStringToDate";
import { USER_RANK_LIST } from "@utils/userRanks";
import { validateCPF } from "@utils/validateCpf";
import validateDate from "@utils/validateDate";

export const accountFormSchema = z
  .object({
    user: z.object({
      name: z
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(255, "Máxima 255 caracteres")
        .trim()
        .nonempty("Campo obrigatório"),
      gender: z.enum(["m", "f"]),
      cpf: z
        .string()
        .nonempty("Campo obrigatório")
        .refine(validateCPF, {
          message: "CPF inválido",
        })
        .transform((cpf: string) => cpf.replace(/\D/g, "")),
      rg: z
        .string()
        .nonempty("Campo obrigatório")
        .transform((rg: string) => rg.replace(/\D/g, "")),
      user_rank: z.enum(USER_RANK_LIST, {
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
      birthdate: z
        .string()
        .transform((date: string) => parseStringToDate(date))
        .refine(validateDate, {
          message: "Data inválida",
        }),
      password: z.string().min(8, "Mínimo 8 caracteres").optional(),
      confirm_password: z.string().min(8, "Mínimo 8 caracteres").optional(),
    }),
    contact: z.object({
      email: z.string().email("E-mail inválido").nonempty("Campo obrigatório"),
      phone: z.string().nonempty("Campo obrigatório"),
    }),
    role_id: z
      .string({
        errorMap: (issue) => {
          switch (issue.code) {
          case "invalid_type":
            return { message: "Opção inválida" };
          case "invalid_enum_value":
            return { message: "Opção inválida" };
          default:
            return { message: "Opção inválida" };
          }
        },
      })
      .nonempty("Campo obrigatório")
      .uuid("Valor inválido"),
  })
  .refine(
    (data) => {
      if (data.user.password && data.user.confirm_password) {
        return data.user.password === data.user.confirm_password;
      }
      return true;
    },
    {
      message: "As senhas não coincidem",
      path: ["user", "confirm_password"],
    }
  );

export type AccountFormType = z.infer<typeof accountFormSchema>;
