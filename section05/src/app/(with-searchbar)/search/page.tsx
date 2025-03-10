import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// export const dynamic = "force-static";
// 검색 기능이 제대로 동작하지 않을 수 있음
// 동적 함수의 값이 무조건 빈 값으로 설정되어 버리기 때문
// 검색어가 무엇인지 알 수 없음

// export const dynamic = "error";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
