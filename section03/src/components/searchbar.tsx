"use client";
// 페이지 라우터와 달리, 이러한 일반 컴포넌트들도 app 폴더 내에 만들 수 있다. (co-location)

import { useState } from "react";

/**
 * 앱라우터에서는 useRouter를 next/navigation으로부터 불러와 줘야 함
 */
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
