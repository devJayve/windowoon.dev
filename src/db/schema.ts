import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const post = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  description: text('description').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  views: integer('views').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  categories: text('categories').array().default([]),
});

export const category = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const postCategories = pgTable(
  'post_categories',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => post.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => category.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
  },
  table => {
    return [
      {
        pk: primaryKey({ columns: [table.postId, table.categoryId] }),
      },
    ];
  },
);
