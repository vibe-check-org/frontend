// app/login/page.tsx
"use client";

import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Add real auth logic
    console.log("Login mit:", email, password);
    router.push("/dashboard");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={4}
      bgcolor="#F9F4EF"
    >
      <Typography
        variant="h4"
        fontWeight={700}
        color="#4E342E"
        textAlign="center"
        mb={4}
      >
        anmelden
      </Typography>

      <Stack spacing={2}>
        <Typography variant="subtitle2" color="#4E342E">
          deine daten
        </Typography>

        <TextField
          fullWidth
          label="e-mail:"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#4E342E" } }}
        />

        <TextField
          fullWidth
          label="passwort:"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#4E342E" } }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            mt: 2,
            backgroundColor: "#D88C60",
            color: "#fff",
            borderRadius: 12,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#bf7040",
            },
          }}
        >
          Login
        </Button>

        <Link
          underline="hover"
          color="#A26769"
          textAlign="center"
          sx={{ cursor: "pointer", mt: 1 }}
          onClick={() => alert("Passwort vergessen Funktion folgt.")}
        >
          vergessen
        </Link>
      </Stack>
    </Box>
  );
}
