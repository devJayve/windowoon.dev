import { useCallback, useEffect, useRef, useState } from 'react';
import { Book, KakaoBookSearchResponse } from '@/features/library/types';

export function useBookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const observerRef = useRef(null);

  const fetchBooks = useCallback(
    async (searchQuery: string, page: number): Promise<KakaoBookSearchResponse> => {
      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(searchQuery)}&page=${page}`,
        {
          headers: {
            Authorization: 'KakaoAK eba331f6c45860dfc7a28d34db1abe3e',
          },
        },
      );

      return await response.json();
    },
    [],
  );

  const searchBooks = useCallback(async () => {
    if (!searchQuery.trim() || isLoading) return;

    setIsLoading(true);
    setPage(1);

    try {
      const result = await fetchBooks(searchQuery, page);

      setSearchResults(result.documents || []);
      setHasMore(!result.meta.is_end);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks, isLoading, page, searchQuery]);

  const loadMoreBooks = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const result = await fetchBooks(searchQuery, page);

      setSearchResults(prev => [...prev, ...result.documents]);
      setHasMore(!result.meta.is_end);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks, hasMore, isLoading, page, searchQuery]);

  const resetSearch = () => {};

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreBooks();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMoreBooks]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    observerRef,
    searchBooks,
    loadMoreBooks,
    resetSearch,
  };
}
