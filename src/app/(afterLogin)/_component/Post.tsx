import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

// component
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostLink from "./PostLink";

// style
import style from "./post.module.css";

dayjs.locale("ko"); // 한국 시간 적용
dayjs.extend(relativeTime); // fromNow 사용

export default function Post() {
  const target = {
    postId: 1,
    User: {
      id: "yskangg",
      nickname: "영서",
      image: "/IMG_0426.jpeg",
    },
    content: "작업중",
    createdAt: new Date(),
    Images: [],
  };

  return (
    <PostLink post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}></div>
          <ActionButtons />
        </div>
      </div>
    </PostLink>
  );
}
