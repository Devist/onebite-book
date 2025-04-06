"use server";

import { revalidatePath } from "next/cache";

// 서버 액션을 별도로 파일로 분리할 때는, use server를 함수 아닌 최상단으로 두는게 좋음

// 서버 액션을 사용하기 위해서는 반드시 async로 만들어야 함
export async function createReviewAction(formData: FormData) {
  // 서버에서만 실행되는 코드
  // 서버에서만 실행되는 액션을 만들고 싶다면, 액션을 함수로 만들어서 사용하면 됨
  // 이 액션은 서버에서만 실행됨
  // console.log("server action called");
  // console.log(formData);
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  // 서버 측 에러 방지
  if (!content || !author || !bookId) {
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

    //  넥스트 서버 측에 재검증 해줄 것을 요구하는 것
    // 서버 측에서 페이지 컴포넌트가 다시 랜더링 됨
    // 즉, 모두 다시 렌더링 된다는 뜻
    // 주의사항 1. 이 메서드는, 오직 서버 측에서만 호출할 수 있는 메서드
    // 주의사항 2. 전부 재검증 시켜버리므로, 페이지에 포함된 모든 캐시들도 무효화 시킴
    // force-cache 여도 무효화시킴
    // 주의사항 3. 풀 라우트 캐시까지 삭제, 무효화 한 후, 풀라우트 캐시를 재생성하지 않음
    //
    // 결론: 서버 액션에서 재검증 요청하게 되면, 다음번에 방문하게 되면 다이나믹 방식으로 접속하게 됨
    // 주의사항 4. 서버 액션에서만 사용 가능
    // 이렇게 동작하는 이유 ? 브라우저에서 다시 접속했을 때, 무조건 최신의 데이터를 응답하기 위해서
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.log(err);
    return;
  }
}
