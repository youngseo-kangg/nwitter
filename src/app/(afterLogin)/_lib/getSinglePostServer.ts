import { cookies } from "next/headers";

// type
import { Post } from "@/model/post";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [_1: string, _2: string];
}) => {
  const [_1, id] = queryKey;
  const asyncCookies = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        tags: ["posts", id],
      },
      credentials: "include",
      headers: { Cookie: asyncCookies.toString() },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
