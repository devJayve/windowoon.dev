export interface Comment {
  id: number;
  postId: number;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  content: string;
  status: 'published' | 'deleted';
  parentId: number | null;
  replies?: Comment[];
  reactions: CommentReaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentReaction {
  id: number;
  userId: string;
  commentId: number;
  type: 'thumbsup' | 'heart' | 'laugh' | 'surprise' | 'sad' | 'angry';
  createdAt: Date;
  updatedAt: Date;
}
