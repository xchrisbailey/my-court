ALTER TABLE "match" RENAME COLUMN "firstSetTieBreakOponnent" TO "firstSetTieBreakOpponent";--> statement-breakpoint
ALTER TABLE "match" RENAME COLUMN "secondSetTieBreakOponnent" TO "secondSetTieBreakOpponent";--> statement-breakpoint
ALTER TABLE "match" RENAME COLUMN "thirdSetTieBreakOponnent" TO "thirdSetTieBreakOpponent";--> statement-breakpoint
ALTER TABLE "gearSet" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gearSet" ALTER COLUMN "racketId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gearSet" ALTER COLUMN "stringId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "match" DROP COLUMN IF EXISTS "thirdSetType";