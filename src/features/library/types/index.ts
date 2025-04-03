export interface Book {
  title: string;
  authors: string[];
  publisher: string;
  isbn: string;
  thumbnail: string;
  contents: string;
  price: number;
  url: string;
  datetime: string;
  translators?: string[];
}

export interface SearchResultMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface KakaoBookSearchResponse {
  meta: SearchResultMeta;
  documents: Book[];
}
