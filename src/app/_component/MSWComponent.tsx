"use client";

import { Suspense, use } from "react";
import { handlers } from "@/mocks/handlers";

const mockingEnabledPromise =
  typeof window !== "undefined" // 브라우저 환경에서는 @/mocks/browser 사용
    ? import("@/mocks/browser").then(async ({ default: worker }) => {
        if (
          process.env.NODE_ENV === "production" ||
          process.env.NEXT_PUBLIC_MSW_ENABLED === "false"
        ) {
          return;
        }
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        // 'module is not defined' 에러 관련 처리
        // module 객체는 Node.js 환경에서만 정의 O ... 브라우저 환경(next dev 클라이언트 번들)에서는 module이 없어 에러!
        if (typeof module !== "undefined") {
          // https://github.com/vercel/next.js/issues/69098 에러 관련 임시 처리
          (module as any).hot?.dispose(() => {
            worker.stop();
          });
        }
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
