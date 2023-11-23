DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('USER', 'ADMIN', 'MODERATOR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Sector" AS ENUM('IT', 'MEDIC', 'FINANCE', 'ARMY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Building" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"configBuildingId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Config_Building" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"sector" "Sector" NOT NULL,
	"maxLevel" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Config_BuildingRequirement" (
	"id" text PRIMARY KEY NOT NULL,
	"level" integer NOT NULL,
	"upgradePrice" double precision NOT NULL,
	"configBuildingId" text,
	"upgradeDuration" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Config_RequiredBuilding" (
	"id" text PRIMARY KEY NOT NULL,
	"buildingId" text,
	"buildingLevel" integer NOT NULL,
	"configBuildingRequirementId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ConfirmationToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"validFor" timestamp(3) NOT NULL,
	"isUsed" boolean DEFAULT false NOT NULL,
	"usedAt" timestamp(3),
	"ownerId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_conversations" (
	"A" uuid NOT NULL,
	"B" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"fromId" uuid NOT NULL,
	"conversationId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Player" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" uuid NOT NULL,
	"moneyBalance" double precision NOT NULL,
	"income" double precision NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"lastBalanceUpdate" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ownerId" uuid NOT NULL,
	"sector" "Sector"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"isConfirmed" boolean DEFAULT false NOT NULL,
	"suspendedUntil" timestamp(3) DEFAULT now() NOT NULL,
	"BlockedIds" text[],
	"friends" text[],
	"isActive" boolean DEFAULT false NOT NULL,
	"lastSeen" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Config_Building_id_key" ON "Config_Building" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Config_BuildingRequirement_id_key" ON "Config_BuildingRequirement" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Config_RequiredBuilding_id_key" ON "Config_RequiredBuilding" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_conversations_AB_unique" ON "_conversations" ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_conversations_B_index" ON "_conversations" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Player_userId_key" ON "Player" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Building" ADD CONSTRAINT "Building_propertyId_Property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Building" ADD CONSTRAINT "Building_configBuildingId_Config_Building_id_fk" FOREIGN KEY ("configBuildingId") REFERENCES "Config_Building"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Config_BuildingRequirement" ADD CONSTRAINT "Config_BuildingRequirement_configBuildingId_Config_Building_id_fk" FOREIGN KEY ("configBuildingId") REFERENCES "Config_Building"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Config_RequiredBuilding" ADD CONSTRAINT "Config_RequiredBuilding_buildingId_Config_Building_id_fk" FOREIGN KEY ("buildingId") REFERENCES "Config_Building"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Config_RequiredBuilding" ADD CONSTRAINT "Config_RequiredBuilding_configBuildingRequirementId_Config_BuildingRequirement_id_fk" FOREIGN KEY ("configBuildingRequirementId") REFERENCES "Config_BuildingRequirement"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ConfirmationToken" ADD CONSTRAINT "ConfirmationToken_ownerId_User_id_fk" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_A_Conversation_id_fk" FOREIGN KEY ("A") REFERENCES "Conversation"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_B_User_id_fk" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_fromId_User_id_fk" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_Conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_Player_id_fk" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
