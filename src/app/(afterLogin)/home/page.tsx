import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// component
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDivider from "./_component/TabDivider";

// context
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

// api
import { getPostRecommends } from "./_lib/getPostRecommends";

// style
import style from "./page.module.css";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDivider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
