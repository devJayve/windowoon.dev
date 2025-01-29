import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn 함수 이용 시,
 * 1. 클래스명 충돌 방지
 * 2. 조건부 클래스 등 처리
 * 3. 중복 클래스 자동 처리
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
