<<<<<<< HEAD
// frontend/src/app/profil/page.tsx
"use client";

import { Box, Typography, Avatar, Button, useTheme, Paper } from "@mui/material"; // Paper importieren
import { useRouter } from "next/navigation";
import React from "react";

export default function Profil() {
    const router = useRouter();
    const theme = useTheme();

    // Stil für die Buttons, angepasst an dein Theme
    const btnStyle = {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        borderRadius: 12,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default, // Hintergrundfarbe vom Theme
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2, // Padding für kleinere Bildschirme
            }}
        >
            <Paper elevation={8} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%', textAlign: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main} mb={2}>
                    Dein Profil
                </Typography>

                <Avatar
                    sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        mb: 2,
                        border: `4px solid ${theme.palette.secondary.main}`, // Randfarbe vom Theme
                        // Hier könntest du ein Bild des Benutzers einfügen, z.B. src="/path/to/user-avatar.jpg"
                    }}
                />

                <Typography variant="h6" fontWeight="bold" color={theme.palette.text.primary}>Max Mustermann</Typography>
                <Typography variant="body1" color={theme.palette.warning.main} mt={1}>Teststatus: Offen</Typography>
                <Typography variant="body1" color={theme.palette.warning.main}>Code-Status: Nicht eingelöst</Typography>

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

                <Typography
                    mt={4}
                    color={theme.palette.text.secondary}
                    fontSize="0.9rem"
                    sx={{ textDecoration: "underline", cursor: "pointer", '&:hover': { color: theme.palette.primary.main } }}
                >
                    Logout / Code einlösen
                </Typography>
            </Paper>
        </Box>
    );
}
=======
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
        <Button variant="contained" sx={btnStyle} onClick={() => router.push("/einleitung")}>
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
>>>>>>> d7ef237c185f70aa4c065d07845d52b67973db41
