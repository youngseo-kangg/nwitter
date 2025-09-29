"use client";

import { useFormStatus, useFormState } from "react-dom";
import z from "zod";

// component
import Modal from "./modal";

// data
import onSubmit from "../_lib/signup";

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

function showMessage(message: string | null | undefined) {
  if (message === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (message === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (message === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (message === "no_image") {
    return "이미지를 업로드하세요.";
  }
  if (message === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  if (message === "nickname must be a string") {
    return "닉네임이 필요합니다.";
  }

  return message;
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();
  console.log("state", state);

  return (
    <>
      <Modal>
        <Modal.Header title="계정을 생성하세요." />
        <Modal.Form action={formAction}>
          <Modal.FormWrapper>
            <Modal.Input
              label="아이디"
              id="id"
              name="id"
              type="text"
              placeholderText=""
              required
              defaultValue={state.id as string}
            />
            <Modal.Input
              label="닉네임"
              id="name"
              name="name"
              type="text"
              placeholderText=""
              required
              defaultValue={state.nickname as string}
            />
            <Modal.Input
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              placeholderText=""
              required
              defaultValue={state.password as string}
            />
            <Modal.Input
              label="프로필"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              placeholderText=""
              required
              defaultValue={state.image as string}
            />
          </Modal.FormWrapper>
          <Modal.Footer>
            <Modal.Button title="가입하기" type="submit" disabled={pending} />
            <Modal.Message msg={showMessage(state?.message) || ""} />
          </Modal.Footer>
        </Modal.Form>
      </Modal>
    </>
  );
}
