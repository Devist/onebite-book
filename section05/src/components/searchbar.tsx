"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  /**
   * 인덱스 페이지를 빌드타임에 정적으로 생성하다가, 브라우저 요청으로부터 받는 부분이므로 해당 부분에서 에러
   * 오직 클라이언트 컴포넌트로만 실행되게 하려면 "use client" 설정 외에도 아래와 같이 추가 조치 필요
   * 해당 컴포넌트를 <Suspense></Suspense> 컴포넌트로 감싸줘야 함 (미완성 상태일 때 fallback으로 대체해줌)
   *
   */
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
