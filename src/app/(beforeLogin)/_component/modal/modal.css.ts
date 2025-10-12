import { style } from "@vanilla-extract/css";

export const modalBackground = style({
  width: "100vw",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
});

export const modal = style({
  background: "#ffffff",
  position: "relative",
  top: "5%",
  maxWidth: "80vw",
  minWidth: "600px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  height: "550px",

  "@media": {
    "(min-width: 466px)": {
      width: "100%",
      minWidth: "auto",
    },
  },
});

export const modalForm = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const modalHeader = style({
  padding: "36px 80px 20px",
  fontSize: "31px",
  fontWeight: "bold",

  "@media": {
    "(min-width: 466px)": {
      padding: "26px 50px 16px",
    },
  },
});

export const modalBody = style({
  flex: 1,
  padding: "0 80px",

  "@media": {
    "(min-width: 466px)": {
      padding: "0 30px",
    },
  },
});

export const actionButton = style({
  width: "100%",
  height: "50px",
  borderRadius: "25px",
  backgroundColor: "rgb(15, 20, 25)",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
  border: "none",

  selectors: {
    "&:disabled": {
      opacity: 0.5,
    },
    "&:hover": {
      backgroundColor: "rgb(39, 44, 48)",
    },
  },
});

export const closeButton = style({
  width: "34px",
  height: "34px",
  borderRadius: "17px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#fff",
  position: "absolute",
  left: "16px",
  top: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&:hover": {
      backgroundColor: "rgb(39, 44, 48)",
    },
  },
});

export const inputDiv = style({
  display: "flex",
  flexDirection: "column",
  height: "56px",
  position: "relative",
  margin: "12px 0",
});

export const inputDivWithImage = style([
  inputDiv,
  {
    height: "120px",
  },
]);

export const inputLabel = style({
  width: "100%",
  display: "inline-block",
  position: "absolute",
  top: 0,
  border: "1px solid rgb(207, 217, 222)",
  borderRadius: "4px",
  fontSize: "13px",
  height: "56px",
  padding: "8px 8px 0",
  color: "rgb(83, 100, 113)",

  selectors: {
    "&:focus-within": {
      color: "red",
    },
  },
});

export const inputLabelWithImage = style([
  inputLabel,
  {
    height: "120px",
  },
]);

export const input = style({
  width: "100%",
  border: "none",
  fontSize: "17px",
  marginTop: "16px",
  padding: "12px 8px 8px",
  outline: "none",
});

export const inputWithImage = style({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "16px",
  padding: "12px 8px 8px",
});

export const inputImage = style({
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "50%",
  border: "1px solid #ccc",
});

export const message = style({
  fontSize: "13px",
  marginBottom: "5px",
  color: "red",
  display: "flex",
  justifyContent: "center",
  fontWeight: "bold",
});

export const modalFooter = style({
  padding: "24px 80px",
});
