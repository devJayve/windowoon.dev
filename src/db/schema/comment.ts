import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  PgColumn,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { PostTable } from './post';
import { UserTable } from './user';

export const CommentStatus = pgEnum('comment_status', ['published', 'deleted']);

export const ReactionType = pgEnum('reaction_type', [
  'thumbsup', // 👍
  'heart', // ❤️
  'laugh', // 😄
  'surprise', // 😮
  'sad', // 😢
  'angry', // 😠
]);

export const CommentTable = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => PostTable.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  status: CommentStatus('status').notNull().default('published'),
  parentId: integer('parent_id').references((): PgColumn => CommentTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// 댓글 좋아요 관리를 위한 테이블
export const CommentReactionTable = pgTable(
  'comment_reactions',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references((): PgColumn => UserTable.id, {
        onDelete: 'cascade',
      }),
    commentId: integer('comment_id')
      .notNull()
      .references(() => CommentTable.id, {
        onDelete: 'cascade',
      }),
    type: ReactionType('type').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  table => {
    return [
      {
        pk: primaryKey({ columns: [table.userId, table.commentId, table.type] }),
      },
    ];
  },
);
