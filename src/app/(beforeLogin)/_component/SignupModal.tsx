"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImage(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    // 입력값 검증
    const result = signupSchema.safeParse({ id, nickname, password, image });

    if (!result.success) {
      const errorMsgs = result.error.issues.map((issue) => issue.message);
      setMessage(errorMsgs.length > 0 ? errorMsgs[0] : "에러가 발생했습니다.");

      return false;
    }

    // fetch("http://localhost:9090/api/users", {
    //   method: "post",
    //   body: JSON.stringify({
    //     id,
    //     nickname,
    //     image,
    //     password,
    //   }),
    //   credentials: "include",
    // })
    //   .then((response: Response) => {
    //     console.log(response.status);
    //     if (response.status === 200) {
    //       router.replace("/home");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <>
      <Modal>
        <Modal.Header title="계정을 생성하세요." />
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
              label="닉네임"
              id="name"
              value={nickname}
              onChange={onChangeNickname}
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
            <Modal.Input
              label="프로필"
              id="image"
              onChange={onChangeImageFile}
              previewUrl={image}
              type="file"
              accept="image/*"
              placeholderText=""
            />
          </Modal.FormWrapper>
          <Modal.Footer>
            {message && <Modal.Message msg={message} />}
            <Modal.Button title="가입하기" disabled={!id && !password} />
          </Modal.Footer>
        </Modal.Form>
      </Modal>
    </>
  );
}
