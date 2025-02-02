CREATE TABLE "post_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"hash" varchar(64) NOT NULL,
	"viewed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_views" ADD CONSTRAINT "post_views_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;