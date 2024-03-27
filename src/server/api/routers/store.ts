import { z } from "zod";

import { StoreCreateValidator } from "@/lib/validators/store-validators";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stores } from "@/server/db/schema";

export const storeRouter = createTRPCRouter({
  getFirst: protectedProcedure.query(({ ctx, input }) => {
    return ctx.db.query.stores.findFirst({
      where: (stores, { eq }) => eq(stores.userId, ctx.auth.userId),
    });
  }),
  getById: protectedProcedure
    .input(
      z.object({
        storeId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.stores.findFirst({
        where: (stores, { eq }) => eq(stores.id, input.storeId),
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.stores.findMany({
      where: (stores, { eq }) => eq(stores.userId, ctx.auth.userId),
    });
  }),
  create: protectedProcedure
    .input(StoreCreateValidator)
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .insert(stores)
        .values({
          name: input.name,
          userId: ctx.auth.userId,
        })
        .returning();

      return returnValue;
    }),
});
