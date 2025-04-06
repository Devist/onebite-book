import { notFound } from "next/navigation";
import style from "./page.module.css";

// id 1,2,3 아닌 경우에는 404로 가게됨. 동적으로 더이상 받을 파라미터가 존재하지 않아야된다 라고 설정하는것
// export const dynamicParams = false;

/**
 * 정적인 파라미터를 생성하는 약속된 함수
 * 주의할 점 1 : 문자열 데이터로만 명시해야 함
 * 주의할 점 2 : 이 함수를 내보내게 되면, 페이지 컴포넌트 내부에 데이터 캐싱이 설정되지 않은 데이터 패칭이 존재해도
 * 강제로 스테틱 페이지로 설정됨
 *
 * = getStaticPaths 의 앱라우터 버전이라 보면 됨
 */
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ bookId }: { bookId: string }) {
  // 서버 액션을 사용하기 위해서는 반드시 async로 만들어야 함
  async function createReviewAction(formData: FormData) {
    "use server";
    // 서버에서만 실행되는 코드
    // 서버에서만 실행되는 액션을 만들고 싶다면, 액션을 함수로 만들어서 사용하면 됨
    // 이 액션은 서버에서만 실행됨
    // console.log("server action called");
    // console.log(formData);
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    // 서버 측 에러 방지
    if (!content || !author) {
      throw new Error("리뷰 내용을 입력해주세요");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
        {
          method: "POST",
          body: JSON.stringify({ bookId, content, author }),
        }
      );
      console.log(response.status);
    } catch (err) {
      console.log(err);
      return;
    }
  }
  return (
    <section>
      <form action={createReviewAction}>
        {/* 클라이언트 측 에러 방지 */}
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

/**
 * book/4는 실시간으로 다이나믹 페이지로 만들어짐 풀 라우트 캐시로 만들어짐
 */
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
    </div>
  );
}
