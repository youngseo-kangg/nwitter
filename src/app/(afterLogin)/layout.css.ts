import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  backgroundColor: "#fff",
});

export const leftSectionWrapper = style({
  display: "flex",
  alignItems: "flex-end",
  flexDirection: "column",
  flexGrow: 1,
});

export const leftSection = style({
  width: "275px",
  height: "100dvh",

  "@media": {
    "(max-width: 1295px)": {
      width: "88px",
    },
  },
});

export const leftSectionFixed = style({
  position: "fixed",
  width: "inherit",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  borderTop: "none",
  borderRight: "1px solid rgb(239, 243, 244)",
  borderBottom: "none",
  borderLeft: "none",

  "@media": {
    "(max-width: 1295px)": {
      alignItems: "center",
    },
  },
});

globalStyle(`${leftSectionFixed} nav`, {
  flex: 1,

  "@media": {
    "(max-width: 1295px)": {
      width: "100%",
    },
  },
});

globalStyle(`${leftSectionFixed} nav li`, {
  listStyleType: "none",

  "@media": {
    "(max-width: 1295px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

globalStyle(`${leftSectionFixed} nav li a`, {
  "@media": {
    "(max-width: 1295px)": {
      display: "inline-block",
    },
  },
});

export const logo = style({
  display: "inline-block",
  height: "56px",
  marginTop: "2px",
});

export const logoPill = style({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  selectors: {
    "&:hover": {
      backgroundColor: "rgba(15, 20, 25, 0.1)",
    },
  },
});

export const rightSectionWrapper = style({
  display: "flex",
  alignItems: "flex-start",
  height: "100dvh",
  flexDirection: "column",
  flexGrow: 1,

  "@media": {
    "(max-width: 700px)": {
      width: "calc(100% - 88px)",
    },
  },
});

export const rightSectionInner = style({
  height: "100%",
  width: "990px",
  display: "flex",
  justifyContent: "space-between",

  "@media": {
    "(max-width: 1080px)": {
      width: "auto",
    },
    "(max-width: 700px)": {
      width: "100%",
    },
  },
});

export const main = style({
  width: "600px",
  height: "100dvh",
  borderTop: "none",
  borderRight: "1px solid rgb(239, 243, 244)",
  borderBottom: "none" /* 필요 없다면 없애기 */,
  borderLeft: "none",

  "@media": {
    "(max-width: 700px)": {
      width: "100%",
    },
  },
});

export const rightSection = style({
  width: "350px",
  height: "100%",

  "@media": {
    "(max-width: 1080px)": {
      display: "none",
    },
  },
});

export const followRecommend = style({
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "rgb(247, 249, 249)",
  borderRadius: "16px",
  margin: "12px 0",
  padding: "12px 16px",
});
