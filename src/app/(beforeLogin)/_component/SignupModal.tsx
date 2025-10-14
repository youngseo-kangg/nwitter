"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";

// component
import Modal from "./modal";

// data
import onSubmit from "../_lib/signup";

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
  const [state, formAction] = useActionState(onSubmit, {
    message: null,
  });
  console.log("state", state);
  const { pending } = useFormStatus();

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
              defaultValue={state.id as string}
            />
            <Modal.Input
              label="닉네임"
              id="name"
              name="name"
              type="text"
              placeholderText=""
              defaultValue={state.nickname as string}
            />
            <Modal.Input
              label="비밀번호"
              id="password"
              name="password"
              type="password"
              placeholderText=""
              defaultValue={state.password as string}
            />
            <Modal.Input
              label="프로필"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              placeholderText=""
              defaultValue={state.image as string}
            />
            <Modal.Footer>
              <Modal.Button title="가입하기" type="submit" disabled={pending} />
              <Modal.Message msg={showMessage(state?.message) || ""} />
            </Modal.Footer>
          </Modal.FormWrapper>
        </Modal.Form>
      </Modal>
    </>
  );
}
