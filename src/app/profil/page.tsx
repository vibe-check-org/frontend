"use client";

import { Box, Typography, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Profil() {
  const router = useRouter();

  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh" textAlign="center">
      <Typography variant="h5" fontWeight="bold" color="#6A3C2C" mb={2}>
        Profil
      </Typography>

      <Avatar
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
          border: "4px solid #6A3C2C",
        }}
      />

      <Typography fontWeight="bold" color="#6A3C2C">Max Musterman</Typography>
      <Typography color="orange" mt={1}>Teststatus: Offen</Typography>
      <Typography color="orange">Code-Status: Nicht eingelöst</Typography>

      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" sx={btnStyle} onClick={() => router.push("/test_einleitung")}>
          Test Starten →
        </Button>
        <Button variant="contained" sx={btnStyle}>
          Auswertung anzeigen →
        </Button>
        <Button variant="contained" sx={btnStyle}>
          Zertifikat anfordern →
        </Button>
        <Button variant="contained" sx={btnStyle} onClick={() => router.push("/profil/bearbeiten")}>
          Profil bearbeiten →
        </Button>
      </Box>

      <Typography mt={4} color="#A0522D" fontSize="0.9rem" sx={{ textDecoration: "underline", cursor: "pointer" }}>
        Logout / Code einlösen
      </Typography>
    </Box>
  );
}

const btnStyle = {
  bgcolor: "#4E342E",
  borderRadius: 10,
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    bgcolor: "#6A3C2C",
  },
};
