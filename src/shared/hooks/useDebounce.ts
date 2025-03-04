/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

/**
 * 함수에 디바운스를 적용하는 커스텀 훅
 * @param fn 디바운스할 함수
 * @param delay 디바운스 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 */
function useDebounce<T extends AnyFunction>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const fnRef = useRef<T>(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        try {
          await fnRef.current(...args);
        } catch (error) {
          console.error(error);
        } finally {
          timeoutRef.current = null;
        }
      }, delay);
    },
    [delay],
  );
}

export default useDebounce;
