"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.message);
  }, [error]);
  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      {/* 서버 컴포넌트는 다시 호출하지 않음. 서버측에서 서버 컴포넌트가 다시 실행되도록 해야 함 */}
      {/* <button onClick={() => reset()}>다시 시도</button> */}

      {/* 우아한 방법은 아님. state등 날라가므로 */}
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> */}

      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 일반적 리프레쉬와 다르게, 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            reset(); // 이건 굳이 왜 ? 에러 상태를 초기화, 컴포넌트들을 다시 렌더링하는 역할
            // 즉, 서버 컴포넌트들을 다시 불러온다고 해도, 에러 상태가 초기화 되지 않으므로 클라이언트 컴포넌트를 초기화 시켜주는 reset을 적용해야 함
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
