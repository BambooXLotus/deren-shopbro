import { StoreCreateValidator } from '@/lib/validators/store-validators';
import {
  createTRPCRouter,
  protectedProcedure,
} from '@/server/api/trpc';
import { stores } from '@/server/db/schema';

export const storeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.stores.findMany()
  }),
  create: protectedProcedure
    .input(StoreCreateValidator)
    .mutation(async ({ ctx, input }) => {

      const returnValue = await ctx.db.insert(stores).values({
        name: input.name,
        userId: ctx.auth.userId
      }).returning();

      return returnValue
    }),
});
