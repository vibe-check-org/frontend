"use client";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Einleitung() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" color="#7B4A2D">
        Willkommen zu deinem persönlichen Soft-Skills-Test!
      </Typography>

      <Typography mt={2}>
        Schön, dass du dir die Zeit nimmst, deine persönlichen Stärken besser kennenzulernen...
      </Typography>

      <FormControlLabel
        control={<Checkbox checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />}
        label="Ich akzeptiere die Datenschutzrichtlinie und Nutzungsbedingungen."
        sx={{ mt: 4 }}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={!accepted}
        sx={{ mt: 2, borderRadius: 8, bgcolor: "#6A3C2C" }}
        onClick={() => router.push("/profil")}
      >
        Test Starten
      </Button>
    </Box>
  );
}
