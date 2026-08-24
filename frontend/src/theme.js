import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5",
      dark: "#4338CA",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#7C3AED",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#64748B",
    },

    success: {
      main: "#16A34A",
    },

    error: {
      main: "#DC2626",
    },

    warning: {
      main: "#D97706",
    },

    divider: "#E2E8F0",
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "9px 18px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)",
          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;