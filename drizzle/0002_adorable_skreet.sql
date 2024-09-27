ALTER TABLE "brands" RENAME COLUMN "string" TO "name";--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "about" text NOT NULL;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "logoLink" text NOT NULL;