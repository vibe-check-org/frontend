// app/layout.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "../theme/theme";
import BottomNav from "../components/BottomNav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm" disableGutters>
            <main>{children}</main>
            <BottomNav />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
