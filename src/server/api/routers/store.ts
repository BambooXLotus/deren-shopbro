import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { StoreCreateValidator } from "@/lib/validators/store-validators";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stores } from "@/server/db/schema";

export const storeRouter = createTRPCRouter({
  getFirst: protectedProcedure.query(({ ctx }) => {
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
      const returnValue = ctx.db.query.stores.findFirst({
        where: (stores, { eq }) => eq(stores.id, input.storeId),
      });

      return returnValue;
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
  edit: protectedProcedure
    .input(
      z.object({
        storeId: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .update(stores)
        .set({
          name: input.name,
          userId: ctx.auth.userId,
          // updatedAt:
        })
        .where(
          and(eq(stores.id, input.storeId), eq(stores.userId, ctx.auth.userId)),
        )
        .returning();

      return returnValue;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        storeId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .delete(stores)
        .where(
          and(eq(stores.id, input.storeId), eq(stores.userId, ctx.auth.userId)),
        )
        .returning();

      return returnValue;
    }),
});
