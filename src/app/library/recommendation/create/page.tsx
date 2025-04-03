'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/tabs';
import BookSubmitForm from '@/features/library/component/BookSubmitForm';
import { formSchema } from '@/features/library/config/schema';
import BookSearch from '@/features/library/component/BookSearch';
import { Book } from '@/features/library/types';

export default function CreateRecommendationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      authors: '',
      publisher: '',
      isbn: '',
      thumbnail: '',
      recommendationReason: '',
    },
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeTab, setActiveTab] = useState('search');

  // 검색 결과에서 도서 선택
  const selectBook = (book: Book) => {
    setSelectedBook(book);

    // 폼 필드 값 설정
    form.setValue('title', book.title);
    form.setValue('authors', book.authors.join(', '));
    form.setValue('publisher', book.publisher);
    form.setValue('isbn', book.isbn);
    form.setValue('thumbnail', book.thumbnail);
    form.setValue('contents', book.contents);

    // 직접 입력 탭으로 전환
    setActiveTab('manual');
  };

  // 폼 제출 처리
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('제출된 값:', {
      ...values,
      // authors 문자열을 배열로 변환
      authors: values.authors.split(',').map(author => author.trim()),
    });

    // 성공 메시지 표시
    alert('도서 추천이 등록되었습니다!');
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">도서 검색</TabsTrigger>
          <TabsTrigger value="manual">직접 입력</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-6">
          <BookSearch selectBook={selectBook} />
        </TabsContent>

        <TabsContent value="manual" className="mt-6">
          <BookSubmitForm selectedBook={selectedBook} form={form} onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
