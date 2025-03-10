import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 서치바 레이아웃 컴포넌트는 클라이언트 라우터 캐시로 인해 시간 변경이 되지 않음 */}
      <div>{new Date().toLocaleString()}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
