"use client";

import { ChangeEventHandler, useState } from "react";
import { z } from "zod";

// component
import Modal from "./modal";

// regex
import { passwordRegex } from "../_config";

const loginSchema = z.object({
  id: z.string().min(1, { message: "아이디 입력값이 없습니다." }),
  password: z
    .string()
    .min(1, { message: "비밀번호 입력값이 없습니다." })
    .regex(passwordRegex, {
      message:
        "비밀번호는 최소 9자 이상이어야 하며, 숫자, 대문자, 특수문자를 각각 하나 이상 포함해야 합니다.",
    }),
});

export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ id, password });

    // 실패
    if (result.error instanceof z.ZodError) {
      const errorMsgs = result.error.issues.map((issue) => issue.message);
      setMessage(errorMsgs.length > 0 ? errorMsgs[0] : "에러가 발생했습니다.");

      return false;
    }

    // 로그인 처리
    console.log("로그인 완료");
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Modal>
      <Modal.Header title="로그인하세요." />
      <Modal.Form onSubmit={onSubmit}>
        <Modal.FormWrapper>
          <Modal.Input
            label="아이디"
            id="id"
            value={id}
            onChange={onChangeId}
            type="text"
            placeholderText=""
          />
          <Modal.Input
            label="비밀번호"
            id="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholderText=""
          />
          <Modal.Footer>
            <Modal.Message msg={message || ""} />
            <Modal.Button title="로그인하기" disabled={!id && !password} />
          </Modal.Footer>
        </Modal.FormWrapper>
      </Modal.Form>
    </Modal>
  );
}
