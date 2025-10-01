import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// component
import { BackButton } from "@/app/(afterLogin)/_component/Buttons";
import Comments from "../../../_component/Comments";
import SinglePost from "../../../_component/SinglePost";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";

// api
import { getSinglePost } from "../../../_lib/getSinglePost";
import { getComments } from "../../../_lib/getComments";
import { getUserServer } from "../../_lib/getUserServer";

// style
import style from "./singlePost.module.css";

// type
import { Metadata } from "next";
import { User } from "@/model/user";
import { Post } from "@/model/post";
import { getSinglePostServer } from "@/app/(afterLogin)/_lib/getSinglePostServer";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, username } = await params;
  const [user, post]: [User, Post] = await Promise.all([
    getUserServer({ queryKey: ["user", username] }),
    getSinglePostServer({ queryKey: ["posts", id] }),
  ]);

  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
