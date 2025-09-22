"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// api
import { useSession } from "next-auth/react";

// component
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      router.replace("/home");
    } else {
      router.replace("/i/flow/login");
    }
  }, [data]);

  return <Main />;
}
