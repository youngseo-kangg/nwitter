// component
import Post from "@/app/(afterLogin)/_component/Post";
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";

// style
import style from "./profile.module.css";

export default function Profile() {
  const user = {
    id: "yskangg",
    nickname: "영서",
    image: "/IMG_0426.jpeg",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
