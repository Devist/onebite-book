"use server";
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
  } catch (err) {
    console.log(err);
    return;
  }
}
