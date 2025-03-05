import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";

// 약속된 이 함수를 만들어두면, SSR 방식으로 사전렌더링이 이루어지게 됨
// 아래 home 보다 먼저 실행하게 됨
// 사전 렌더링 과정에서 딱 한 번만, 오직 서버 측에서만 실행되는 함수
//
export const getServerSideProps = () => {
  // 페이지 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수

  const data = "hello";

  console.log("서버사이브프롭스에요"); // 브라우저 콘솔에서 확인 불가, 서버인 콘솔에서만 확인가능

  // window.location; // 서버에서는 브라우저 읽을 수 없으므로 사용 불가

  return {
    props: {
      data,
    },
  };
};

// 페이지 컴포넌트 또한 사전렌더링을 위해 서버 측에서 한 번 실행(렌더링)된 후
// 두번째로 브라우저에서 자바스크립트 번들 형태로 전달되어서 브라우저 측에서 실행이 될 때
// 즉, 하이드레이션 과정 진행될 때 한 번 더 실행됨
// * InferGetServerSidePropsType은 getServerSideProps의 반환값 타입을 자동으로 추론해주는 기능을 하는 타입이다
export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // a.서버 터미널에서 한 번 찍힌 후, 브라우저 콘솔에서도 찍히는 걸 볼 수 있음
  console.log(data);

  // b. 따라서 window 같은 객체를 호출할 때는 window.location이 아닌 window?.location 사용해야 함

  // c. 또는 useEffect를 사용하여 마운트된 이후 실행되도록 해야 함
  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
