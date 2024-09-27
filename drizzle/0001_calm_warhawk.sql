CREATE TABLE IF NOT EXISTS "brands" (
	"id" text PRIMARY KEY NOT NULL,
	"string" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gearSet" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"racketId" text,
	"stringId" text,
	"stringTension" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match" (
	"id" text PRIMARY KEY NOT NULL,
	"organization" text NOT NULL,
	"location" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"playDate" text NOT NULL,
	"notes" text,
	"firstSetSelf" integer DEFAULT 0,
	"firstSetOpponent" integer DEFAULT 0,
	"firstSetTieBreakSelf" integer DEFAULT 0,
	"firstSetTieBreakOponnent" integer DEFAULT 0,
	"secondSetSelf" integer DEFAULT 0,
	"secondSetOpponent" integer DEFAULT 0,
	"secondSetTieBreakSelf" integer DEFAULT 0,
	"secondSetTieBreakOponnent" integer DEFAULT 0,
	"thirdSetSelf" integer DEFAULT 0,
	"thirdSetOpponent" integer DEFAULT 0,
	"thirdSetTieBreakSelf" integer DEFAULT 0,
	"thirdSetTieBreakOponnent" integer DEFAULT 0,
	"thirdSetType" text,
	"gearId" text,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "practice" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "racket" (
	"id" text PRIMARY KEY NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"headSize" integer NOT NULL,
	"stringPattern" text NOT NULL,
	"weight" integer NOT NULL,
	"swingWeight" integer NOT NULL,
	"brandId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "racketToUser" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"racketId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "refreshToken" (
	"id" text PRIMARY KEY NOT NULL,
	"hashedToken" text NOT NULL,
	"userId" text NOT NULL,
	"revoked" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "string" (
	"id" text PRIMARY KEY NOT NULL,
	"model" text NOT NULL,
	"gauge" text NOT NULL,
	"composition" text NOT NULL,
	"brandId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stringToUser" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"stringId" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gearSet" ADD CONSTRAINT "gearSet_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gearSet" ADD CONSTRAINT "gearSet_racketId_racket_id_fk" FOREIGN KEY ("racketId") REFERENCES "public"."racket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gearSet" ADD CONSTRAINT "gearSet_stringId_string_id_fk" FOREIGN KEY ("stringId") REFERENCES "public"."string"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match" ADD CONSTRAINT "match_gearId_gearSet_id_fk" FOREIGN KEY ("gearId") REFERENCES "public"."gearSet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match" ADD CONSTRAINT "match_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "practice" ADD CONSTRAINT "practice_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "racket" ADD CONSTRAINT "racket_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "racketToUser" ADD CONSTRAINT "racketToUser_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "racketToUser" ADD CONSTRAINT "racketToUser_racketId_racket_id_fk" FOREIGN KEY ("racketId") REFERENCES "public"."racket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "string" ADD CONSTRAINT "string_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stringToUser" ADD CONSTRAINT "stringToUser_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stringToUser" ADD CONSTRAINT "stringToUser_stringId_string_id_fk" FOREIGN KEY ("stringId") REFERENCES "public"."string"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
