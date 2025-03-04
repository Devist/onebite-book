import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    /**
     * 대체, 대비책, 보험. ex) book/4
     * 옵션 세 개 :
     * - false : 없는 페이지로 취급하도록 설정 404 Not Found 반환
     * - blocking: [즉시 생성 (Like SSR)]. 이후 보관 (SSR 과 같은 문제 발생할 수도 있음)
     * - true: [SSR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환] 즉시 생성 + 페이지만 미리 반환 (Props 없는 페이지 빠르게 반환 = getStaticProps로부터 받은 데이터가 없는 페이지. props만 따로 반환)
     */
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  // 여기서 !로 단언할 수 있는 이유? 무조건 아이디가 하나 있어야만 접근할 수 있는 페이지
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  // 페이지 컴포넌트의 문제가 발생했습니다가 아닌 404로 보냄
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // fallback 상태 : 페이지 컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
  if (router.isFallback) return "로딩중입니다";

  // 로딩 끝났는데도 안 들어오면, 진짜 문제가 발생했습니다 보여줌
  if (!book) return "문제가 발생했습니다 다시 시도하세요";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
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
    </div>
  );
}
