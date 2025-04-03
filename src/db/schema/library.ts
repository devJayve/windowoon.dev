import {
  integer,
  json,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { CategoryTable } from '@/db/schema/post';
import { UserTable } from '@/db/schema/user';

export const BookTable = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 150 }).notNull(),
  thumbnail: varchar('thumbnail', { length: 255 }).notNull(),
  thumbnail3d: varchar('thumbnail_3d', { length: 255 }),
  description: text('description'),
  content: text('content').notNull(),
  shortContent: varchar('short_content', { length: 150 }).notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  publisher: varchar('publisher', { length: 100 }).notNull(),
  isbn: varchar('isbn', { length: 13 }),
  publishedAt: timestamp('published_at'),
  readStartedAt: timestamp('read_started_at').notNull(),
  readEndedAt: timestamp('read_ended_at'),
  links: json('links').$type<{
    yes24?: string;
    kyobo?: string;
    aladin?: string;
  }>(),
  views: integer('views').notNull().default(0),
  categories: text('categories').array().notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const BookRecommendationTable = pgTable('book_recommendations', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => UserTable.id),
  title: varchar('thumbnail', { length: 225 }),
  authors: text('authors').array().notNull().default([]),
  publisher: varchar('publisher', { length: 100 }).notNull(),
  isbn: varchar('isbn', { length: 13 }),
  thumbnail: varchar('thumbnail', { length: 255 }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const BookCategoryTable = pgTable(
  'book_categories',
  {
    bookId: integer('book_id')
      .notNull()
      .references(() => BookTable.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => CategoryTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
  },
  table => {
    return [
      {
        pk: primaryKey({ columns: [table.bookId, table.categoryId] }),
      },
    ];
  },
);

export const BookReactionTable = pgTable(
  'book_reactions',
  {
    bookId: integer('book_id')
      .notNull()
      .references(() => BookTable.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  table => {
    return [
      {
        pk: primaryKey({ columns: [table.bookId, table.userId] }),
      },
    ];
  },
);
