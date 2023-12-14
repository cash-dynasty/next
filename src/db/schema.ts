import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core'

export const sector = pgEnum('Sector', ['IT', 'MEDIC', 'FINANCE', 'ARMY'])
export const role = pgEnum('Role', ['USER', 'ADMIN', 'MODERATOR'])
export const moneyTransferOperations = pgEnum('MoneyTransferOperations', ['WITHDRAW', 'DEPOSIT'])

export const safeboxTransfers = pgTable('safebox_transfers', {
  id: serial('id').primaryKey().notNull(),
  amount: integer('amount').notNull(),
  type: moneyTransferOperations('type').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  isCancelled: boolean('is_cancelled').default(false).notNull(),
  isProcessed: boolean('is_processed').default(false).notNull(),
  propertyId: integer('property_id').notNull(),
})

export const user = pgTable(
  'user',
  {
    id: serial('id').primaryKey().notNull(),
    email: text('email').notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    role: role('role').default('USER').notNull(),
    isActive: boolean('isActive').default(false).notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userEmailUnique: unique('user_email_unique').on(table.email),
    }
  },
)

export const building = pgTable('building', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level').default(0).notNull(),
  propertyId: integer('property_id').notNull(),
  configBuildingId: integer('config_building_id').notNull(),
})

export const confirmationToken = pgTable('confirmation_token', {
  id: serial('id').primaryKey().notNull(),
  token: text('token').notNull(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  validFor: timestamp('valid_for', { precision: 3, mode: 'string' }).notNull(),
  isUsed: boolean('is_used').default(false).notNull(),
  usedAt: timestamp('used_at', { precision: 3, mode: 'string' }),
})

export const player = pgTable(
  'player',
  {
    id: serial('id').primaryKey().notNull(),
    nickname: text('nickname').notNull(),
    lastBalanceUpdate: timestamp('last_balance_update', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
    userId: integer('user_id').notNull(),
  },
  (table) => {
    return {
      playerNicknameUnique: unique('player_nickname_unique').on(table.nickname),
    }
  },
)

export const cRequiredBuilding = pgTable('c_required_building', {
  id: serial('id').primaryKey().notNull(),
  buildingId: integer('building_id').notNull(),
  requiredBuildingLevel: integer('required_building_level').notNull(),
  buildingUpgradeRequirementId: integer('building_upgrade_requirement_id').notNull(),
})

export const cBuilding = pgTable('c_building', {
  id: serial('id').primaryKey().notNull(),
  codeName: text('code_name').default('building').notNull(),
  description: text('description'),
  sector: sector('sector').notNull(),
  maxLevel: integer('max_level').notNull(),
  name: text('name'),
})

export const cBuildingUpgradeRequirement = pgTable('c_building_upgrade_requirement', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level').notNull(),
  upgradePrice: integer('upgrade_price').notNull(),
  buildingId: integer('building_id').notNull(),
  upgradeDuration: integer('upgrade_duration').default(10).notNull(),
})

export const property = pgTable('property', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  sector: sector('sector').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  ownerId: integer('owner_id').notNull(),
  safeboxAmount: doublePrecision('safebox_amount'),
  blockedFundsAmount: doublePrecision('blocked_funds_amount'),
  moneyBalance: doublePrecision('money_balance'),
  moneyIncome: doublePrecision('money_income'),
})

export * from './utils'
