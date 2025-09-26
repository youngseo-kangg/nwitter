"use client";

import { useContext } from "react";

// context
import { TabContext } from "@/app/(afterLogin)/home/_component/TabProvider";

// style
import style from "./tab.module.css";

export default function Tab() {
  const { tab, setTab } = useContext(TabContext);
  const onClickForyou = () => {
    setTab("foryou");
  };
  const onClickFollowing = () => {
    setTab("following");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div onClick={onClickForyou}>
          추천
          <div
            className={style.tabIndicator}
            hidden={tab === "following"}
          ></div>
        </div>
        <div onClick={onClickFollowing}>
          팔로우 중
          <div className={style.tabIndicator} hidden={tab === "foryou"}></div>
        </div>
      </div>
    </div>
  );
}
