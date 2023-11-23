ALTER TABLE "Player" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Player" ADD CONSTRAINT "Player_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
