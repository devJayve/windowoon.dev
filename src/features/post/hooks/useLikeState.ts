'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

export function useLikeState(postId: number) {
  const { status } = useSession();
  const [state, setState] = useState<LikeState>({ isLiked: false, likeCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/post/${postId}/like`);

        const data = await response.json();
        setState({
          isLiked: data.isLiked,
          likeCount: data.count,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching like state:', err);
      } finally {
        setLoading(false);
      }
    }

    console.log('fetch data');

    fetchData();
  }, [postId, status]);

  return { likeState: state, setLikeState: setState, loading, error };
}
