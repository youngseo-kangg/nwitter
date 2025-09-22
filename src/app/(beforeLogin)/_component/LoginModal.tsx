"use client";

import { ChangeEventHandler, useState, FormEventHandler } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const result = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      console.log(result);
      router.replace("/home");
    } catch (err) {
      console.error(err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
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
