// 이게 있어야 클라이언트 컴포넌트로 실행됨.
// 서버 측에서 한 번 실행 후, 하이드레이션 과정에서 브라우저에서 한 번 실행되므로 두 번 실행됨
// "use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import ClientComponent from "../../components/client-component";
import ServerComponent from "./server-component";

export default function Home() {
  console.log("HOME 컴포넌트 실행");

  // 서버에서만 실행되기 때문에, 이러한 비밀키값을 이 컴포넌트에서 사용해도 브라우저에 노출, 전달 되지도 않기 때문에
  // 보안 문제 발생 X
  const secretKey = "qwer123";

  // RSC 이기 때문에 오류 발생, 클라이언트 컴포넌트에서만 사용할 수 있으므로
  // useEffect(() => {});

  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
