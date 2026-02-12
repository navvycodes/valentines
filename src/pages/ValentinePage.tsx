import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";

import { ValentineCard } from "../components/ValentineCard";
import { valentineTheme } from "../theme/valentineTheme";

export function ValentinePage() {
  return (
    <ThemeProvider theme={valentineTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: { xs: 6, sm: 10 },
          background:
            "radial-gradient(1200px circle at 20% 10%, rgba(216, 27, 96, 0.18), transparent 55%), radial-gradient(900px circle at 80% 0%, rgba(255, 64, 129, 0.18), transparent 50%), radial-gradient(900px circle at 50% 100%, rgba(173, 20, 87, 0.14), transparent 55%), linear-gradient(180deg, #fff7fb 0%, #fff 60%, #fff7fb 100%)",
        }}
      >
        <Container maxWidth="sm">
          <ValentineCard />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
