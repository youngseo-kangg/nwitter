import { redirect } from "next/navigation";
import z from "zod";

// component
import Modal from "./modal";

// regex
import { passwordRegex } from "../_config";

// 회원가입 스키마 정의
const signupSchema = z.object({
  id: z.string().min(1, { message: "아이디 입력값이 없습니다." }),
  nickname: z.string().min(1, { message: "닉네임 입력값이 없습니다." }),
  password: z
    .string()
    .min(1, { message: "비밀번호 입력값이 없습니다." })
    .regex(passwordRegex, {
      message:
        "비밀번호는 최소 9자 이상이어야 하며, 숫자, 대문자, 특수문자를 각각 하나 이상 포함해야 합니다.",
    }),
  image: z.string().url().optional(), // 이미지 URL (선택 사항)
});

export default function SignupModal() {
  const onSubmit = async (formData: FormData) => {
    "use server";

    if (!formData.get("id")) {
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      return { message: "no_image" };
    }

    let shouldRedirect = false;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include",
        }
      );
      if (response.status === 403) {
        return { message: "user_exists" };
      }
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
    }
    if (shouldRedirect) {
      redirect("/home"); // try/catch문 안에서 X
    }
  };

  return (
    <>
      <Modal>
        <Modal.Header title="계정을 생성하세요." />
        <Modal.Form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit(formData);
          }}
        >
          <Modal.FormWrapper>
            <Modal.Input
              label="아이디"
              id="id"
              type="text"
              placeholderText=""
            />
            <Modal.Input
              label="닉네임"
              id="name"
              type="text"
              placeholderText=""
            />
            <Modal.Input
              label="비밀번호"
              id="password"
              type="password"
              placeholderText=""
            />
            <Modal.Input
              label="프로필"
              id="image"
              type="file"
              accept="image/*"
              placeholderText=""
            />
          </Modal.FormWrapper>
          <Modal.Footer>
            <Modal.Button title="가입하기" type="submit" />
          </Modal.Footer>
        </Modal.Form>
      </Modal>
    </>
  );
}
