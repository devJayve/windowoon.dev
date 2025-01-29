import { PostModel } from '@/features/post/types';

export interface PostTitleProps {
  title: string;
}

export interface PopularPostProps {
  category: string;
  title: string;
  imageUrl: string;
}

export interface RegPostListProps {
  posts: PostModel[];
}

export interface RegPostProps {
  post: PostModel;
}
