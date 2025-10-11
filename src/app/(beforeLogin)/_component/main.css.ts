import { style } from "@vanilla-extract/css";

export const mainContainer = style({
  display: "flex",
  width: "100dvw",
  height: "100dvh",
  flexDirection: "column",
  padding: "36px",

  "@media": {
    "(min-width: 1000px)": {
      padding: 0,
      flexDirection: "row",
    },
  },
});

export const mainLeft = style({
  display: "flex",
  flex: 0,
  alignItems: "center",

  "@media": {
    "(min-width: 1000px)": {
      flex: 1,
      justifyContent: "center",
    },
  },
});

export const mainLeftImg = style({
  width: "55px",
  height: "65px",

  "@media": {
    "(min-width: 1000px)": {
      width: "450px",
      height: "550px",
    },
  },
});

export const mainRight = style({
  display: "flex",
  flex: 0,
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",

  "@media": {
    "(min-width: 1000px)": {
      flex: 1,
    },
  },
});

export const mainRightH1 = style({
  fontWeight: 700,
  margin: "48px 0",
  fontSize: "40px",

  "@media": {
    "(min-width: 1000px)": {
      fontSize: "60px",
    },
  },
});

export const mainRightH2 = style({
  fontWeight: 700,
  fontSize: "31px",
  marginBottom: "32px",
});

export const mainRightH3 = style({
  fontWeight: 700,
  fontSize: "17px",
  marginBottom: "20px",
  marginTop: "40px",
});

export const signUp = style({
  width: "300px",
  height: "40px",
  borderRadius: "20px",
  padding: "0 16px",
  fontSize: "15px",
  backgroundColor: "#1d9bf0",
  color: "#fff",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const login = style({
  width: "300px",
  height: "40px",
  borderRadius: "20px",
  padding: "0 16px",
  fontSize: "15px",
  color: "#1d9bf0",
  border: "1px solid #cfd9de",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
