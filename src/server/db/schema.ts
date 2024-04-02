import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator(
  (name) => `deren-storebro_${name}`,
);

export const stores = createTable(
  "store",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).unique().notNull(),
    slug: text("slug", { length: 256 }).unique().notNull(),
    description: text("description", { length: 1000 }),
    imageUrl: text("imageUrl", { length: 1000 }),
    clerkId: text("clerkId", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updatedAt"),
  },
  (store) => ({
    nameIndex: index("name_idx").on(store.name),
    slugIndex: index("slug_idx").on(store.slug),
  }),
);
export type InsertStore = typeof stores.$inferInsert;
export type SelectStore = typeof stores.$inferSelect;
