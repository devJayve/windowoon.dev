import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const PostTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  description: text('description').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  views: integer('views').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  categories: text('categories').array().notNull().default([]),
});

export const PostViewTable = pgTable('post_views', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => PostTable.id, { onDelete: 'cascade' }),
  hash: varchar('hash', { length: 64 }).notNull(),
  viewedAt: timestamp('viewed_at').notNull().defaultNow(),
});

export const CategoryTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 30 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const PostCategoryTable = pgTable(
  'post_categories',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => PostTable.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => CategoryTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  table => {
    return [
      {
        pk: primaryKey({ columns: [table.postId, table.categoryId] }),
      },
    ];
  },
);
