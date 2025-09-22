import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
  { id: "yskangg", nickname: "영서", image: "/IMG_0426.jpeg" },
  { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log("로그인");

    return HttpResponse.json(
      {
        id: User[1].id,
        name: User[1].nickname,
        email: `${User[1].id}@example.com`, // email 필드는 꼭 있어야 함
        image: User[1].image,
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log("로그아웃");

    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log("회원가입");

    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
];
