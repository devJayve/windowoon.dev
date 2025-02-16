ALTER TABLE "posts" ALTER COLUMN "title" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "description" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "slug" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "view_mode" SET DEFAULT 'development';