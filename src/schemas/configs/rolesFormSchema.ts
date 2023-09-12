import { z } from "zod";

export const rolesFormSchema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
  permissions: z.object({
    edit_users: z.boolean().optional(),
    edit_roles: z.boolean().optional(),
  }).optional(),
});

export type RolesFormType = z.infer<typeof rolesFormSchema>;
