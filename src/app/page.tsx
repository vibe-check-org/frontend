// app/page.tsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Startseite() {
  const router = useRouter();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#F9F4EF"
      px={4}
    >
      <Typography variant="h3" fontWeight={800} color="#4E342E" gutterBottom>
        Vibe Check
      </Typography>

      <Box
        mt={8}
        width="100%"
        maxWidth={360}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            backgroundColor: "#D88C60",
            color: "#fff",
            borderRadius: 12,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#bf7040",
            },
          }}
          onClick={() => router.push("/signup")}
        >
          Sign up
        </Button>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{
            color: "#4E342E",
            borderColor: "#C2B280",
            borderRadius: 12,
            fontWeight: 600,
            "&:hover": {
              borderColor: "#D88C60",
              backgroundColor: "#f3e9dd",
            },
          }}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
