import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator(
  (name) => `deren-storebro_${name}`,
);

//TODO:Update At
export const stores = createTable(
  "store",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }).notNull(),
    userId: text("userId", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updatedAt"),
  },
  (store) => ({
    nameIndex: index("name_idx").on(store.name),
  }),
);
export type InsertStore = typeof stores.$inferInsert;
export type SelectStore = typeof stores.$inferSelect;
