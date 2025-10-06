import { Suspense } from "react";

// component
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import TabDividerSuspense from "./_component/TabDividerSuspense";
import Loading from "@/app/(afterLogin)/home/loading";

// context
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

// api
import { auth } from "@/auth";

// style
import style from "./page.module.css";

// type
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈 / Z",
  description: "홈",
};

export default async function Home() {
  const session = await auth();

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDividerSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
