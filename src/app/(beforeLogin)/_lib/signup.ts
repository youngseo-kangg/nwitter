"use server";

import z from "zod";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { passwordRegex } from "../_config";

// 회원가입 스키마 정의
const signupSchema = z.object({
  id: z.string().min(1, { message: "no_id" }),
  name: z.string().min(1, { message: "no_name" }),
  password: z.string().min(1, { message: "no_password" }).regex(passwordRegex, {
    message:
      "비밀번호는 최소 9자 이상이어야 하며, 숫자, 대문자, 특수문자를 각각 하나 이상 포함해야 합니다.",
  }),
  image: z.string().optional(), // 이미지 URL (선택 사항)
});

export default async (
  prevState: { message: string | null },
  formData: FormData
) => {
  const formValues = Object.fromEntries(formData.entries());

  // ✅ Zod로 유효성 검증
  const parsed = signupSchema.safeParse(formValues);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message;
    return { message };
  }

  formData.set("nickname", formData.get("name") as string);
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );

    if (response.status === 403) {
      return { message: "user_exists" };
    } else if (response.status === 400) {
      return {
        message: (await response.json()).data[0],
        id: formData.get("id"),
        nickname: formData.get("nickname"),
        password: formData.get("password"),
        image: formData.get("image"),
      };
    }
    console.log(await response.json());

    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect("/home"); // try/catch문 안에서 X
  }
  return { message: null };
};
