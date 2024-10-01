ALTER TABLE "gearSet" RENAME COLUMN "stringTension" TO "stringTensionMains";--> statement-breakpoint
ALTER TABLE "gearSet" ADD COLUMN "stringTensionCrosses" integer NOT NULL;