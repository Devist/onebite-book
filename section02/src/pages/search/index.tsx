import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // getStaticPropsContext 에는 query 속성이 없음
//   // 빌드 타임에 딱 한 번 실행되는데, 이 때 이러한 쿼리 스트링을 알 수 없음
//   // 서치 페이지는 SSG 방식으로 동작 시킬 수 없다.
//   // 리액트 방식으로 불러온 후 실행 해야 함

//   // const q = context.query.q;

//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

export default function Page({}) {
  //   books,
  // }: InferGetStaticPropsType<typeof getStaticProps>) {

  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
