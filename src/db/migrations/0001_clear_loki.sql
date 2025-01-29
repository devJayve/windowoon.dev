ALTER TABLE "post_categories" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE varchar(30);--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "post_categories" ALTER COLUMN "post_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "post_categories" ALTER COLUMN "category_id" SET DATA TYPE integer;