"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/i/flow/login");
  }, []);

  return <Main />;
}
