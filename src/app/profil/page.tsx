// frontend/src/app/profil/page.tsx
"use client";

import { Box, Typography, Avatar, Button, useTheme, Paper } from "@mui/material";
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
                        border: `4px solid ${theme.palette.primary.main}`, // Angepasst an Theme
                    }}
                />

                <Typography fontWeight="bold" color={theme.palette.text.primary}>Lena Müller</Typography>
                <Typography color={theme.palette.warning.main} mt={1}>Teststatus: Abgeschlossen</Typography> {/* Farbe angepasst */}
                <Typography color={theme.palette.warning.main}>Code-Status: Nicht eingelöst</Typography> {/* Farbe angepasst */}

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
                    <Button
                        variant="contained" sx={btnStyle}
                        onClick={() => router.push("/profil/bearbeiten")}
                        >
                        Profil bearbeiten →
                    </Button>
                </Box>

                <Typography mt={4} color={theme.palette.text.secondary} fontSize="0.9rem" sx={{ textDecoration: "underline", cursor: "pointer" }}> {/* Farbe angepasst */}
                    Logout / Code einlösen
                </Typography>
            </Paper>
        </Box>
    );
}
