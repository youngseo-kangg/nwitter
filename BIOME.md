# Biome 설정 설명

이 문서는 프로젝트에 포함된 `biome.json`의 각 항목이 어떤 역할을 하는지 설명합니다.  
이 설정은 React/Next.js 환경에서 Biome을 사용하며, 포맷과 린트 규칙을 적용하도록 구성되어 있습니다.

---

## 1. VCS

- `enabled`: Biome에서 Git 등 버전 관리 연동 여부를 켭니다.
- `clientKind`: 사용 중인 버전 관리 시스템 (`git`).
- `useIgnoreFile`: `.gitignore` 파일 기준으로 무시할 파일 자동 처리.

---

## 2. Files

- `ignoreUnknown`: Biome이 인식하지 못하는 파일 확장자는 무시합니다.
- `includes`:
  - `"**"`: 모든 파일 포함
  - `"!node_modules"`, `"!.next"`, `"!dist"`, `"!build"`: 빌드 산출물이나 의존성 폴더 제외

---

## 3. Formatter (전역)

- `enabled`: 코드 포맷 기능 켬
- `formatWithErrors`: 문법 오류가 있어도 포맷 허용 여부 (`false`)
- `indentStyle`: 들여쓰기 방식 (`space`)
- `indentWidth`: 들여쓰기 공백 2칸
- `lineWidth`: 한 줄 최대 길이 100자
- `lineEnding`: 줄바꿈 스타일 (`lf`)

---

## 4. Formatter (JavaScript)

- `quoteStyle`: 일반 JS 파일에서 `'` 단일 따옴표 사용
- `jsxQuoteStyle`: JSX 속성에서도 `'` 단일 따옴표 사용
- `arrowParentheses`: 화살표 함수 괄호 사용 (`asNeeded` → 필요할 때만 괄호)
- `trailingCommas`: 객체/배열 마지막 요소 뒤에도 항상 쉼표 추가

---

## 5. Linter

- `enabled`: 린트 기능 켬
- `rules.recommended`: Biome에서 제공하는 기본 권장 규칙 활성화
- `rules.correctness.noUnusedVariables`: 사용하지 않는 변수 경고
- `rules.suspicious.noWith`: `with` 구문 사용 금지 (잠재적 문제 예방)
- `domains.react`: React 관련 권장 규칙 활성화
- `domains.next`: Next.js 관련 권장 규칙 활성화

> 💡 Biome는 `recommended`와 도메인별 권장 규칙을 사용하여 최신 JS/React 스타일을 유지합니다.

---

## 6. Assist

- `actions.source.organizeImports`: import 구문 자동 정리 (사용하지 않는 import 제거 및 순서 정리)

---
