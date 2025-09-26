"use client";

import { useRouter } from "next/navigation";

// api
import { signOut, useSession } from "next-auth/react";

// style
import style from "./logoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();
  // console.log(me);
  if (!me?.user) return null;

  const onLogout = () => {
    signOut({
      redirect: false, // client 컴포넌트에서 서버쪽 리다이렉트 필요 X
    }).then(() => {
      router.replace("/"); // client side re-direction
    });
  };

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
