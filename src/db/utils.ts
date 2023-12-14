import {
  building,
  cBuilding,
  cBuildingUpgradeRequirement,
  confirmationToken,
  cRequiredBuilding,
  player,
  property,
  sector,
  user,
} from '@/db/schema'
import { relations } from 'drizzle-orm'

export type ESector = typeof sector.enumValues

export type TUserSelect = typeof user.$inferSelect
export type TUserInsert = typeof user.$inferInsert

export type TPlayerSelect = typeof player.$inferSelect
export type TPlayerInsert = typeof player.$inferInsert

export type TPropertySelect = typeof property.$inferSelect & {
  owner?: TUserSelect
  buildings?: TBuildingsSelect[]
}
export type TPropertyInsert = typeof property.$inferInsert

export type TBuildingsSelect = typeof building.$inferSelect & { configBuilding: TCBuildingSelect }
export type TBuildingsInsert = typeof building.$inferInsert

export type TCBuildingSelect = typeof cBuilding.$inferSelect & {
  buildingUpgradeRequirement?: TCBuildingUpgradeRequirementSelect
}
export type TCBuildingInsert = typeof cBuilding.$inferInsert

export type TCBuildingUpgradeRequirementSelect = typeof cBuildingUpgradeRequirement.$inferSelect & {
  requiredBuilding?: TCRequiredBuildingSelect
}
export type TCBuildingUpgradeRequirementInsert = typeof cBuildingUpgradeRequirement.$inferInsert

export type TCRequiredBuildingSelect = typeof cBuildingUpgradeRequirement.$inferSelect & {
  building?: TCBuildingSelect
}
export type TCRequiredBuildingInsert = typeof cBuildingUpgradeRequirement.$inferInsert

export const userRelations = relations(user, ({ one, many }) => ({
  player: one(player, {
    fields: [user.id],
    references: [player.userId],
  }),
  confirmationToken: many(confirmationToken),
}))

export const playerRelations = relations(player, ({ many }) => ({
  property: many(property),
}))

export const confirmationTokenRelations = relations(confirmationToken, ({ one }) => ({
  user: one(user, {
    fields: [confirmationToken.userId],
    references: [user.id],
  }),
}))

export const propertyRelations = relations(property, ({ one, many }) => ({
  owner: one(player, {
    fields: [property.ownerId],
    references: [player.id],
  }),
  buildings: many(building),
}))

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

export const cBuildingRelations = relations(cBuilding, ({ many }) => ({
  buildingUpgradeRequirement: many(cBuildingUpgradeRequirement),
}))

export const cBuildingUpgradeRequirementRelations = relations(
  cBuildingUpgradeRequirement,
  ({ one }) => ({
    building: one(cBuilding, {
      fields: [cBuildingUpgradeRequirement.buildingId],
      references: [cBuilding.id],
    }),
  }),
)

export const cRequiredBuildingRelations = relations(cRequiredBuilding, ({ one }) => ({
  building: one(cBuilding, {
    relationName: 'building',
    fields: [cRequiredBuilding.buildingId],
    references: [cBuilding.id],
  }),
}))
