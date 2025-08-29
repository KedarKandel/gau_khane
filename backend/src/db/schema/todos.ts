
import {
    boolean,
    pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  description: varchar({length:500}).notNull(),
  completed: boolean().default(false)
})