import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

// component
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import PostButton from "./_component/PostButton";
import FollowRecommend from "./_component/FollowRecommend";
import TrendSection from "./_component/TrendSection";
import RightSearchZone from "./_component/RightSearchZone";

// style
import style from "@/app/(afterLogin)/layout.module.css";

// img
import ZLogo from "../../../public/zlogo.png";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <NavMenu />
              <PostButton />
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
}
