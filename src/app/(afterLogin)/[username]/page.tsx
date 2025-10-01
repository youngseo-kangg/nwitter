import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// component
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";

// api
import { getUserServer } from "./_lib/getUserServer";
import { getUserPosts } from "./_lib/getUserPosts";
import { auth } from "@/auth";

// style
import style from "./profile.module.css";

// type
import { Metadata } from "next";
import { User } from "@/model/user";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user: User = await getUserServer({ queryKey: ["users", username] });

  return {
    title: `${user.nickname}(${user.id}) - Z`,
    description: `${user.nickname}(${user.id})의 프로필에 대해 알아보세요.`,
  };
}

export default async function Profile(props: Props) {
  const { username } = await props.params;
  const session = await auth();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", "recommends"],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
