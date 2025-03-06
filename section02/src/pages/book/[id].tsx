import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

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
  if (router.isFallback)
    return (
      <>
        <title>한입북스</title>
        {/* '/' 는 public 폴더 경로를 의미 */}
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
        <div>로딩중입니다</div>
      </>
    );

  // 로딩 끝났는데도 안 들어오면, 진짜 문제가 발생했습니다 보여줌
  if (!book) return "문제가 발생했습니다 다시 시도하세요";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      {/* 
        다이나믹 SSG 이므로, fallback 옵션이 true 이므로,
        최초 호출시에는 하단에 설정한 메타태그가 들어가 있지 않음
        위의 return "로딩중입니다" 이기 때문에 나중에 추가되므로
      */}
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
