import { z } from 'zod';

export const BillboardFormValidator = z.object({
  label: z.string().min(2).max(256),
  imageUrl: z.string().url().nullable(),
});
export type BillboardRequest = z.infer<typeof BillboardFormValidator>;
