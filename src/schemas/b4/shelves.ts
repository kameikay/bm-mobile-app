import { z } from "zod";

export const shelfFormSchema = z.object({
  shelf: z.object({
    shelf_number: z.number().int().positive(),
    rows: z
      .object({
        name: z.string().optional(),
        row_number: z.number().int().positive(),
      })
      .array(),
    columns: z
      .object({
        name: z.string().optional(),
        column_number: z.number().int().positive(),
      })
      .array(),
  }),
});

export type ShelfFormType = z.infer<typeof shelfFormSchema>;
