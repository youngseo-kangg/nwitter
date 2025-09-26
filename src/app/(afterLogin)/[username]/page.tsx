import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// component
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";

// api
import { getUser } from "./_lib/getUser";
import { getUserPosts } from "./_lib/getUserPosts";

// style
import style from "./profile.module.css";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Profile(props: Props) {
  const { username } = await props.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", "recommends"],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
