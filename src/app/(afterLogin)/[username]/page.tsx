import { useParams } from "next/navigation";

export default function UserPage() {
  // useParams 훅으로 동적 세그먼트 가져오기
  const params = useParams();
  const { username } = params as { username?: string };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Page</h1>
      <p>
        방문한 사용자: <strong>{username || "username 없음"}</strong>
      </p>
    </div>
  );
}
