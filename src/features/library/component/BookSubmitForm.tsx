import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/form/form';
import { Input } from '@/shared/components/input/Input';
import { Textarea } from '@/shared/components/textarea/TextArea';
import { Button } from '@/shared/components/button/button';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { formSchema } from '../config/schema';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/Card';
import { Book } from '@/features/library/types';
import { cn } from '@/shared/lib/cn';

interface BookSubmitFormProps {
  selectedBook: Book | null;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}
function BookSubmitForm({ selectedBook, form, onSubmit }: BookSubmitFormProps) {
  return (
    <div>
      <CardHeader>
        <CardTitle>도서 정보 직접 입력</CardTitle>
        <CardDescription>
          {selectedBook
            ? '검색한 도서 정보를 수정하거나 추천 이유를 입력하세요.'
            : '추천하고 싶은 도서의 정보를 직접 입력하세요.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>도서명*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="도서 제목을 입력하세요"
                      {...field}
                      className={cn(
                        form.formState.errors.title &&
                          'border-destructive focus-visible:ring-destructive',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>저자*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="저자 이름 (여러 명인 경우 쉼표로 구분)"
                      {...field}
                      className={cn(
                        form.formState.errors.authors &&
                          'border-destructive focus-visible:ring-destructive',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>출판사*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="출판사명"
                      {...field}
                      className={cn(
                        form.formState.errors.publisher &&
                          'border-destructive focus-visible:ring-destructive',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN (선택사항)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>도서 표지 URL</FormLabel>
                  <FormControl>
                    <Input placeholder="도서 표지 이미지 URL (선택사항)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recommendationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>추천 이유*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="이 도서를 추천하는 이유를 적어주세요"
                      {...field}
                      className={cn(
                        'h-32 resize-none',
                        form.formState.errors.publisher &&
                          'border-destructive focus-visible:ring-destructive',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">도서 추천 등록하기</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}

export default BookSubmitForm;
