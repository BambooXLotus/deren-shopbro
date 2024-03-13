import { sql } from 'drizzle-orm';
import {
  index,
  int,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core';

export const createTable = sqliteTableCreator((name) => `deren-drizzle-test_${name}`);

export const stores = createTable(
  "store",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    userId: text("userId", { length: 256}),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }),
  },
  (store) => ({
    nameIndex: index("name_idx").on(store.name),
  })
);