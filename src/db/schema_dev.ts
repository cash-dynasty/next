import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const role = pgEnum('Role', ['USER', 'ADMIN', 'MODERATOR'])

export const user = pgTable('User', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  role: role('role').default('USER').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
})

// export const userRelations = relations(user, ({ one }) => ({
//   player: one(player),
// }))

export const player = pgTable('Player', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  nickname: text('nickname').notNull(),
  userId: uuid('user_id').references(() => user.id),
})
