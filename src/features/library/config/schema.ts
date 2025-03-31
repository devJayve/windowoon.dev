import * as z from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  authors: z.string().min(1, { message: '저자를 입력해주세요' }),
  publisher: z.string().min(1, { message: '출판사를 입력해주세요' }),
  isbn: z.string().optional(),
  thumbnail: z.string().optional(),
  contents: z.string().optional(),
  recommendationReason: z.string().min(10, { message: '추천 이유는 최소 10자 이상 입력해주세요' }),
});
