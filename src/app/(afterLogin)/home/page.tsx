// component
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
// import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
// import Post from "@/app/(afterLogin)/_component/Post";

// style
import style from "./page.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
      </TabProvider>
    </main>
  );
}
