import { createTheme } from "@mui/material/styles";

const theme = () =>
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#4d6bff" },
      secondary: { main: "#6f7cff" },
      background: {
        default: "transparent",
        paper: "rgba(255,255,255,0.25)",
      },
      text: {
        primary: "#111",
        secondary: "#333",
      },
    },
    shape: { borderRadius: 12 },
  });

export default theme;
