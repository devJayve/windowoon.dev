// 게시글(post) 메타 정보
export interface PostMatter {
  title: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  description: string;
  thumbnailURL?: string;
}

// 게시글(post) UI 데이터
export interface Post {
  category: string;
  slug: string;
  content: string;
  views: number;
  frontMatter: PostMatter;
}

// 게시글(post) DB 모델
export interface PostModel {
  id: string;
  title: string;
  content: string;
  description: string | null;
  slug: string;
  views: number;
  created_at: Date;
  updated_at: Date;
  thumbnail_url: string | null;
}

export interface PostResponse {
  posts: Partial<PostModel>[];
  success: boolean;
  error?: string;
}
