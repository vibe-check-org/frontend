"use client";

import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

export default function EmailVerifiedSuccessPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        gap: 2,
      }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
      <Typography variant="h4" color="success.main">
        Deine E-Mail wurde erfolgreich verifiziert!
      </Typography>
      <Typography variant="body1">
        Du kannst dich jetzt mit deinem Account anmelden.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => router.push("/login")}
      >
        Zum Login
      </Button>
    </Box>
  );
}
