import {
  assignVars,
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

// theme의 이름 정하기
export const global = createGlobalThemeContract({
  background: {
    color: "bg-color",
  },
  foreground: {
    color: "fg-color",
  },
});

// root에 brightGlobalTheme 적용
const brightGlobalTheme = {
  background: {
    color: "rgb(255, 255, 255)",
  },
  foreground: {
    color: "rgb(0, 0, 0)",
  },
};
createGlobalTheme(":root", global, brightGlobalTheme);

// root에 prefers-color-scheme: dark일 떄는 darkGlobalTheme 사용
const darkGlobalTheme = {
  background: {
    color: "rgb(0, 0, 0)",
  },
  foreground: {
    color: "rgb(255, 255, 255)",
  },
};
globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: assignVars(global, darkGlobalTheme),
    },
  },
});

globalStyle("*", {
  boxSizing: "border-box",
  padding: 0,
  margin: 0,
});

globalStyle("html", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      colorScheme: "dark",
    },
  },
});

globalStyle("html, body", {
  maxWidth: "100dvw",
  overflowX: "hidden",
});

globalStyle("body", {
  color: global.foreground.color, // fg-color
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
