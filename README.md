# nwitter (X 클론 코딩 프로젝트)🚀

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![MSW](https://img.shields.io/badge/MSW-Mocking-yellow?style=for-the-badge)
![CSS Module](https://img.shields.io/badge/CSS%20Module-Scoped-green?style=for-the-badge)
![Biome](https://img.shields.io/badge/Biome-Linter%20%26%20Formatter-orange?style=for-the-badge)

> 이 프로젝트는 'X' (이전 Twitter)를 클론 코딩하며, 로그인 기능과 내부 페이지를 구현하는 학습 프로젝트입니다.

---

## ⚡ 기술 스택

- **Next.js 15**: 서버 사이드 렌더링, 라우팅 관리
- **React**: 컴포넌트 기반 UI 구현
- **MSW (Mock Service Worker)**: API 요청 모킹
- **CSS Module**: 컴포넌트 단위 스타일링
- **Biome**: 코드 포맷터 및 린터 관리, ESLint/Prettier 대체

> 미래 계획: styled-component의 지원 중지로 인해 css-module 사용 하면서 추후 **Vanilla Extract**로 스타일링을 마이그레이션하여, 타입 안전하고 유지보수 쉬운 CSS-in-JS 환경으로 전환 예정

---

## 🛠 구현 예정 기능

- 로그인 / 로그아웃 기능
- 타임라인 및 피드 페이지
- 프로필 페이지
- 게시글 작성 및 삭제
- 반응형 UI 구현

---

## 📁 프로젝트 구조

```
/src
/components # 재사용 가능한 UI 컴포넌트
/pages # Next.js 페이지
/styles # CSS Module 스타일
/mocks # MSW API 모킹
```

---

## ⚙️ 개발 환경 설정

1. 저장소 클론

```
git clone https://github.com/youngseo-kangg/nwitter
cd <project-folder>
```

2. 의존성 설치 및 실행

```
pnpm install
pnpm run dev
```

---

## 🔮 미래 계획

- Vanilla Extract로 스타일 마이그레이션
- 추가 페이지 및 기능 구현
- 테스트 코드 작성 (Jest / React Testing Library)

## 📌 참고

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://reactjs.org/docs/getting-started.html)
- [MSW 문서](https://mswjs.io/docs)
- [Biome 문서](https://biomejs.dev)
