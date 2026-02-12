import { createTheme } from "@mui/material";

export const valentineTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#d81b60" },
    background: { default: "#fff7fb" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
});
