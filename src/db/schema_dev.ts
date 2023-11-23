import { relations } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  serial,
  varchar,
  boolean,
  integer,
} from 'drizzle-orm/pg-core'

export const role = pgEnum('Role', ['USER', 'ADMIN', 'MODERATOR'])

export const user = pgTable('User', {
  id: serial('id').primaryKey().notNull(),
  email: text('email').notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  role: role('role').default('USER').notNull(),
  isActive: boolean('isActive').default(false).notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
})

export const userRelations = relations(user, ({ one }) => ({
  player: one(player),
}))

export const player = pgTable('Player', {
  id: serial('id').primaryKey().notNull(),
  nickname: text('nickname').notNull(),
  userId: integer('user_id').references(() => user.id),
})
