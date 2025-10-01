// component
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "./_component/SearchResult";

// style
import style from "./search.module.css";

// type
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
  parent: ResolvingMetadata; // '/search'의 부모('/')의 메타데이터 정보
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} - 검색 / Z`,
    description: `${q} - 검색 / Z`,
  };
}

export default async function Search({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={query.q} f={query.f} pf={query.pf} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={query} />
      </div>
    </main>
  );
}
