CREATE TYPE "public"."view_mode" AS ENUM('public', 'development', 'private');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "view_mode" "view_mode" DEFAULT 'public' NOT NULL;