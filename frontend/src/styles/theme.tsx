"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#149E54",
      contrastText: "#FFF",
      light: "rgba(20, 158, 84, 0.8)",
    },
    secondary: {
      main: "rgba(20, 158, 84, 0.05)",
      contrastText: "#000",
    },
    action: {
      disabledBackground: "rgba(20, 158, 84, 0.35)",
      disabled: "#FFF",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: "48px",
          marginTop: "12px",
          fontWeight: 500,
          fontSize: "16px",
        },
      },
    },
    
  },

  typography: {
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

export default theme;
