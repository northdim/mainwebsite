import React, { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";

// --- Color Mode Context for global theme toggle ---
const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

function Main() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // --- Custom Material 3 Theme ---
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#2563eb",
                },
                background: {
                  default: "#ffffff",
                  paper: "#f9fafb",
                },
                text: {
                  primary: "#111827",
                  secondary: "#4b5563",
                },
              }
            : {
                primary: {
                  main: "#60a5fa",
                },
                background: {
                  default: "#0d1117",
                  paper: "#161b22",
                },
                text: {
                  primary: "#f3f4f6",
                  secondary: "#9ca3af",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h3: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
          h4: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
          },
          button: {
            fontWeight: 600,
            textTransform: "none",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: "none",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 20,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
