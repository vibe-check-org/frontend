// Datei: app/signup/SignupTerms.tsx
"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function SignupTerms({ onNext, onBack }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" textAlign="center">
        Nutzungsbedingungen
      </Typography>
      <Typography variant="body2">
        Um fortzufahren und dein Profil zu erstellen, akzeptiere bitte unsere
        <br />
        <a
          href="/nutzungsbedingungen"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nutzungsbedingungen
        </a>{" "}
        und{" "}
        <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
          Datenschutzrichtlinie
        </a>
        .
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
        }
        label="Ich akzeptiere die Datenschutzrichtlinie und Nutzungsbedingungen."
      />
      <Box display="flex" justifyContent="space-between">
        <Button onClick={onBack}>Zurück</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={!accepted}
        >
          Konto erstellen
        </Button>
      </Box>
    </Box>
  );
}
