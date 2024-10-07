ALTER TABLE "practice" ADD COLUMN "gearId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "practice" ADD CONSTRAINT "practice_gearId_gearSet_id_fk" FOREIGN KEY ("gearId") REFERENCES "public"."gearSet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
