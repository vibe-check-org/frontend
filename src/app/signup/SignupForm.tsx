// Datei: app/signup/SignupForm.tsx
"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

export default function SignupForm({ onNext }: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password === form.repeatPassword) {
      onNext();
    } else {
      alert("Die Passwörter stimmen nicht überein.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" textAlign="center">
        Willkommen
      </Typography>
      <TextField
        label="Vorname"
        name="firstName"
        fullWidth
        onChange={handleChange}
        value={form.firstName}
      />
      <TextField
        label="Nachname"
        name="lastName"
        fullWidth
        onChange={handleChange}
        value={form.lastName}
      />
      <TextField
        label="E-Mail"
        name="email"
        type="email"
        fullWidth
        onChange={handleChange}
        value={form.email}
      />
      <TextField
        label="Passwort"
        name="password"
        type="password"
        fullWidth
        onChange={handleChange}
        value={form.password}
      />
      <TextField
        label="Passwort wiederholen"
        name="repeatPassword"
        type="password"
        fullWidth
        onChange={handleChange}
        value={form.repeatPassword}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Weiter
      </Button>
    </Box>
  );
}
