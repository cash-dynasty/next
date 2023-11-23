import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const sector = pgEnum('Sector', ['IT', 'MEDIC', 'FINANCE', 'ARMY'])
export const role = pgEnum('Role', ['USER', 'ADMIN', 'MODERATOR'])

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolledBackAt: timestamp('rolled_back_at', { withTimezone: true, mode: 'string' }),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
})

export const conversation = pgTable('Conversation', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
})

export const message = pgTable('Message', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  fromId: uuid('fromId')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  conversationId: uuid('conversationId')
    .notNull()
    .references(() => conversation.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const user = pgTable(
  'User',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    email: text('email').notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    role: role('role').default('USER').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
    isConfirmed: boolean('isConfirmed').default(false).notNull(),
    suspendedUntil: timestamp('suspendedUntil', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    blockedIds: text('BlockedIds').array(),
    friends: text('friends').array(),
    isActive: boolean('isActive').default(false).notNull(),
    lastSeen: timestamp('lastSeen', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex('User_email_key').on(table.email),
      usernameKey: uniqueIndex('User_username_key').on(table.username),
    }
  },
)

export const confirmationToken = pgTable('ConfirmationToken', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  token: text('token').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  validFor: timestamp('validFor', { precision: 3, mode: 'string' }).notNull(),
  isUsed: boolean('isUsed').default(false).notNull(),
  usedAt: timestamp('usedAt', { precision: 3, mode: 'string' }),
  ownerId: uuid('ownerId')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
})

export const player = pgTable(
  'Player',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    moneyBalance: doublePrecision('moneyBalance').notNull(),
    income: doublePrecision('income').notNull(),
    points: integer('points').default(0).notNull(),
    lastBalanceUpdate: timestamp('lastBalanceUpdate', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      userIdKey: uniqueIndex('Player_userId_key').on(table.userId),
    }
  },
)

export const building = pgTable('Building', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  propertyId: uuid('propertyId')
    .notNull()
    .references(() => property.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  level: integer('level').default(0).notNull(),
  configBuildingId: text('configBuildingId').references(() => configBuilding.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
})

export const configBuilding = pgTable(
  'Config_Building',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    sector: sector('sector').notNull(),
    maxLevel: integer('maxLevel').notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex('Config_Building_id_key').on(table.id),
    }
  },
)

export const configRequiredBuilding = pgTable(
  'Config_RequiredBuilding',
  {
    id: text('id').primaryKey().notNull(),
    buildingId: text('buildingId').references(() => configBuilding.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    buildingLevel: integer('buildingLevel').notNull(),
    configBuildingRequirementId: text('configBuildingRequirementId').references(
      () => configBuildingRequirement.id,
      {
        onDelete: 'set null',
        onUpdate: 'cascade',
      },
    ),
  },
  (table) => {
    return {
      idKey: uniqueIndex('Config_RequiredBuilding_id_key').on(table.id),
    }
  },
)

export const conversations = pgTable(
  '_conversations',
  {
    a: uuid('A')
      .notNull()
      .references(() => conversation.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    b: uuid('B')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_conversations_AB_unique').on(table.a, table.b),
      bIdx: index().on(table.b),
    }
  },
)

export const configBuildingRequirement = pgTable(
  'Config_BuildingRequirement',
  {
    id: text('id').primaryKey().notNull(),
    level: integer('level').notNull(),
    upgradePrice: doublePrecision('upgradePrice').notNull(),
    configBuildingId: text('configBuildingId').references(() => configBuilding.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    upgradeDuration: integer('upgradeDuration').default(0).notNull(),
  },
  (table) => {
    return {
      idKey: uniqueIndex('Config_BuildingRequirement_id_key').on(table.id),
    }
  },
)

export const property = pgTable('Property', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  ownerId: uuid('ownerId')
    .notNull()
    .references(() => player.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  sector: sector('sector'),
})
