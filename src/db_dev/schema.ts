import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const role = pgEnum('Role', ['USER', 'ADMIN', 'MODERATOR'])
export const sector = pgEnum('Sector', ['IT', 'MEDIC', 'FINANCE', 'ARMY'])

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  role: role('role').default('USER').notNull(),
  isActive: boolean('isActive').default(false).notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).defaultNow().notNull(),
})

export const userRelations = relations(user, ({ one, many }) => ({
  player: one(player, {
    fields: [user.id],
    references: [player.userId],
  }),
  confirmationToken: many(confirmationToken),
}))

export const player = pgTable('player', {
  id: serial('id').primaryKey(),
  nickname: text('nickname').notNull(),
  moneyBalance: doublePrecision('money_balance').default(0).notNull(),
  moneyIncome: doublePrecision('money_income').default(0).notNull(),
  lastBalanceUpdate: timestamp('last_balance_update', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  userId: integer('user_id').notNull(),
})

export const confirmationToken = pgTable('confirmation_token', {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  validFor: timestamp('valid_for', { precision: 3, mode: 'string' }).notNull(),
  isUsed: boolean('is_used').default(false).notNull(),
  usedAt: timestamp('used_at', { precision: 3, mode: 'string' }),
})

export const confirmationTokenRelations = relations(confirmationToken, ({ one }) => ({
  user: one(user, {
    fields: [confirmationToken.userId],
    references: [user.id],
  }),
}))

export const property = pgTable('property', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  sector: sector('sector').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' }).defaultNow().notNull(),
  ownerId: integer('owner_id').notNull(),
})

export const propertyRelations = relations(property, ({ one }) => ({
  owner: one(player, {
    fields: [property.ownerId],
    references: [player.id],
  }),
}))

export const building = pgTable('building', {
  id: serial('id').primaryKey(),
  level: integer('level').default(0).notNull(),
  propertyId: integer('property_id').notNull(),
  configBuildingId: integer('config_building_id').notNull(),
})

export const buildingRelations = relations(building, ({ one }) => ({
  property: one(property, {
    fields: [building.propertyId],
    references: [property.id],
  }),
  configBuilding: one(cBuilding, {
    fields: [building.configBuildingId],
    references: [cBuilding.id],
  }),
}))

export const cBuilding = pgTable('c_building', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  sector: sector('sector').notNull(),
  maxLevel: integer('max_level').notNull(),
})

export const cBuildingRelations = relations(cBuilding, ({ many }) => ({
  buildingUpgradeRequirement: many(cBuildingUpgradeRequirement),
  requiredBuilding: many(cRequiredBuilding, {
    relationName: 'requiredBuilding',
  }),
}))

export const cBuildingUpgradeRequirement = pgTable('c_building_upgrade_requirement', {
  id: serial('id').primaryKey(),
  level: integer('level').notNull(),
  upgradePrice: integer('upgrade_price').notNull(),
  buildingId: integer('building_id').notNull(),
})

export const cBuildingUpgradeRequirementRelations = relations(
  cBuildingUpgradeRequirement,
  ({ one }) => ({
    building: one(cBuilding, {
      fields: [cBuildingUpgradeRequirement.buildingId],
      references: [cBuilding.id],
    }),
  }),
)

export const cRequiredBuilding = pgTable('c_required_building', {
  id: serial('id').primaryKey(),
  buildingId: integer('building_id').notNull(),
  requiredBuildingId: integer('required_building_id').notNull(),
  requiredBuildingLevel: integer('required_building_level').notNull(),
})

export const cRequiredBuildingRelations = relations(cRequiredBuilding, ({ one }) => ({
  building: one(cBuilding, {
    relationName: 'building',
    fields: [cRequiredBuilding.buildingId],
    references: [cBuilding.id],
  }),
  requiredBuilding: one(cBuilding, {
    relationName: 'requiredBuilding',
    fields: [cRequiredBuilding.requiredBuildingId],
    references: [cBuilding.id],
  }),
}))
