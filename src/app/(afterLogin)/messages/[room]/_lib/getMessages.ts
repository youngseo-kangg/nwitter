// type
import { Message } from "@/model/message";

type Props = {
  pageParam?: number;
  queryKey: [string, { senderId: string; receiverId: string }, string];
};

export default async function getMessages({ pageParam, queryKey }: Props) {
  const [_1, { senderId, receiverId }, _3] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${senderId}/rooms/${receiverId}?cursor=${pageParam}`,
    {
      next: {
        tags: ["rooms"],
      },
      credentials: "include",
      cache: "no-store",
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Message[]>;
}
