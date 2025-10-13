import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

// api
import { auth } from "@/auth";

// component
import QueryProvider from "./_component/QueryProvider";
import NavMenu from "./_component/NavMenu";
import { LogoutButton } from "./_component/Buttons";
import PostButton from "./_component/Post/PostButton";
import TrendSection from "./_component/TrendSection";
import RightSearchZone from "./_component/RightSearchZone";
import FollowRecommendSection from "./_component/FollowRecommendSection";

// style
import * as style from "@/app/(afterLogin)/layout.css";

// img
import ZLogo from "../../../public/zlogo.png";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href={session?.user ? "/home" : "/"}>
              <div className={style.logoPill}>
                <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            {session?.user && (
              <>
                <nav>
                  <NavMenu />
                  <PostButton />
                </nav>
                <LogoutButton me={session} />
              </>
            )}
          </div>
        </section>
      </header>
      <QueryProvider>
        <div className={style.rightSectionWrapper}>
          <div className={style.rightSectionInner}>
            <main className={style.main}>{children}</main>
            <section className={style.rightSection}>
              <RightSearchZone />
              <TrendSection />
              <div className={style.followRecommend}>
                <h3>팔로우 추천</h3>
                <FollowRecommendSection />
              </div>
            </section>
          </div>
        </div>
        {modal}
      </QueryProvider>
    </div>
  );
}
