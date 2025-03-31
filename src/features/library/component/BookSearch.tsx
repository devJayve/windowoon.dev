import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/Card';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/shared/components/input/Input';
import { Button } from '@/shared/components/button/button';
import { BookOpen, Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import { useBookSearch } from '@/features/library/hooks/useBookSearch';
import { Book } from '@/features/library/types';

interface BookSearchProps {
  selectBook: (book: Book) => void;
}

function BookSearch({ selectBook }: BookSearchProps) {
  const { searchQuery, setSearchQuery, searchResults, isLoading, observerRef, searchBooks } =
    useBookSearch();

  return (
    <div>
      <CardHeader>
        <CardTitle>도서 검색</CardTitle>
        <CardDescription>
          카카오 도서 검색 API를 통해 추천하고 싶은 도서를 검색하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="도서명, 저자, 출판사 등을 입력하세요"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchBooks()}
          />
          <Button
            onClick={() => searchBooks()}
            disabled={isLoading || !searchQuery.trim()}
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Search className="mr-2 size-4" />
            )}
            검색
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">검색 결과</h3>
            {searchResults.map(book => (
              <Card
                key={book.isbn}
                className="cursor-pointer transition-colors duration-200 hover:bg-neutral-200/20"
                onClick={() => selectBook(book)}
              >
                <CardContent className="flex p-4">
                  {book.thumbnail ? (
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      width={80}
                      height={120}
                      layout="fixed"
                      className=" h-auto object-cover"
                    />
                  ) : (
                    <div className="mr-4 flex h-28 w-20 items-center justify-center bg-slate-200">
                      <BookOpen className="size-10 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold">{book.title}</h4>
                    <p className="text-sm text-slate-600">
                      {book.authors.join(', ')} | {book.publisher}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(book.datetime).toLocaleDateString()} | ISBN: {book.isbn}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm">{book.contents}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div ref={observerRef}>
          {isLoading && (
            <div>
              <Loader2 className="size-5 animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}

export default BookSearch;
