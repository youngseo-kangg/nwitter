import { useParams } from "next/navigation";

export default function StatusPage() {
  // useParams 훅으로 URL 동적 세그먼트 가져오기
  const params = useParams();
  const { username, id } = params as {
    username?: string;
    id?: string;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>유저의 트윗</h1>
      <p>
        여기서는 <strong>{username || "유저 없음"}</strong>의 특정 id 트윗을
        확인합니다.
      </p>

      {/* URL 파라미터 확인용 */}
      <div
        style={{
          marginTop: "2rem",
          borderTop: "1px solid #ccc",
          paddingTop: "1rem",
        }}
      >
        <h3>URL 파라미터</h3>
        <p>
          <strong>Username:</strong> {username || "없음"}
        </p>
        <p>
          <strong>ID:</strong> {id || "없음"}
        </p>
      </div>
    </div>
  );
}
