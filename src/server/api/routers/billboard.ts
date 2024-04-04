import {
  and,
  eq,
} from 'drizzle-orm';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';
import {
  billboards,
  stores,
} from '@/server/db/schema';
import { TRPCError } from '@trpc/server';

export const billboardRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        billboardId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.billboards.findFirst({
        where: (billboards, { eq }) => eq(billboards.id, input.billboardId),
      });
    }),
  getAllByStoreSlug: protectedProcedure
    .input(
      z.object({
        storeSlug: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const returnValue = ctx.db
        .select()
        .from(billboards)
        .leftJoin(stores, eq(billboards.storeId, stores.id))
        .where(eq(stores.slug, input.storeSlug));

      return returnValue;
    }),
  create: protectedProcedure
    .input(
      z.object({
        storeSlug: z.string(),
        label: z.string(),
        imageUrl: z.string().url().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const store = await ctx.db.query.stores.findFirst({
        where: (stores, { eq }) => eq(stores.slug, input.storeSlug),
      });

      if (!store) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Store not found by slug.",
        });
      }

      const returnValue = await ctx.db
        .insert(billboards)
        .values({
          storeId: store.id,
          label: input.label,
          imageUrl: input.imageUrl,
        })
        .returning();

      return returnValue;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        billboardId: z.string(),
        label: z.string(),
        imageUrl: z.string().url().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .update(billboards)
        .set({
          label: input.label,
          imageUrl: input.imageUrl,
          updatedAt: new Date().toISOString(),
        })
        .where(
          eq(billboards.id, input.billboardId),
          // TODO: Figure out how to let other users to edit
          // eq(stores.clerkId, ctx.auth.userId),
        )
        .returning();

      return returnValue;
    }),
  saveImage: protectedProcedure
    .input(
      z.object({
        storeId: z.number(),
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .update(stores)
        .set({
          imageUrl: input.imageUrl,
          updatedAt: new Date().toISOString(),
        })
        .where(
          and(
            eq(stores.id, input.storeId),
            // eq(stores.clerkId, ctx.auth.userId),
          ),
        )
        .returning();

      return returnValue;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        billboardId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const returnValue = await ctx.db
        .delete(billboards)
        .where(eq(billboards.id, input.billboardId))
        .returning();

      return returnValue;
    }),
});
