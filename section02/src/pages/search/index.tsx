import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { q } = router.query;

  console.log(q);

  return <h1>Search</h1>;
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
