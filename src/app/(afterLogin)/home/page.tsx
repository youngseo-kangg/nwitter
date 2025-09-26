import { Suspense } from "react";

// component
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDividerSuspense from "./_component/TabDividerSuspense";
import Loading from "@/app/(afterLogin)/home/loading";

// context
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

// style
import style from "./page.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDividerSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
