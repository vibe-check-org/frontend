// Datei: app/signup/SignupConfirm.tsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function SignupConfirm() {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    // Hier könnte ein echter Resend-Call erfolgen
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} textAlign="center">
      <Typography variant="h6">Fast geschafft!</Typography>
      <Typography variant="body1">
        Für den Abschluss der Registrierung fehlt noch deine
        Identitätsbestätigung.
        <br />
        Bitte öffne die E-Mail, die wir dir geschickt haben, um dein Konto zu
        aktivieren.
      </Typography>
      {resent && (
        <Typography color="success.main">
          E-Mail wurde erneut gesendet!
        </Typography>
      )}
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="outlined" onClick={handleResend}>
          Erneut senden
        </Button>
        <Button variant="text" color="secondary">
          Schließen
        </Button>
      </Box>
    </Box>
  );
}
