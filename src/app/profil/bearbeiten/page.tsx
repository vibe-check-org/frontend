"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ProfilBearbeiten() {
  const [showPassword, setShowPassword] = useState(false);

  

  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h6" fontWeight="bold" mb={3} color="#6A3C2C">
        Hallo Herr Musterman
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Profilbild (optional)" variant="outlined" fullWidth />
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Nachname" variant="outlined" fullWidth />
        <TextField label="e-mail" variant="outlined" fullWidth />
        <TextField
          label="Passwort"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Passwort Wiederholen"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
        />
        <TextField label="Geburtstag" variant="outlined" fullWidth />
        <TextField label="Einmaliger Code" variant="outlined" fullWidth />
        <TextField label="Status Test" variant="outlined" fullWidth />
        <TextField label="Datum des Testabschlusses" variant="outlined" fullWidth />
        <TextField label="Soft-Skills-Auswertung" variant="outlined" fullWidth />
        <TextField label="Telefonnummer" variant="outlined" fullWidth />
        <TextField label="LinkedIn/Xing-Profil" variant="outlined" fullWidth />
        <TextField label="Wohnort" variant="outlined" fullWidth />
        <TextField label="Über-mich-Text" variant="outlined" fullWidth multiline />
        <TextField label="Interessen" variant="outlined" fullWidth />
        <TextField label="Lebensmotto" variant="outlined" fullWidth />
      </Box>

      <Button variant="contained" fullWidth sx={{ mt: 4, bgcolor: "#6A3C2C", borderRadius: 10 }}>
        Weiter →
      </Button>
    </Box>
  );
}
