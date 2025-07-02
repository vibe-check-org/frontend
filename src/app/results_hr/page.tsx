'use client';

import React from 'react';
import {
    Box,
    Paper,
    Typography,
    useTheme,
    LinearProgress,
    Button,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

// Dummy-Daten für die Ergebnisse
const dummyResults = [
    {
        email: 'email1@email.com',
        skills: {
            Empathie: 80,
            Teamfähigkeit: 90,
            Entscheidungsfindung: 75,
            Konfliktlösung: 60,
        },
    },
    {
        email: 'email2@email.com',
        skills: {
            Empathie: 70,
            Teamfähigkeit: 85,
            Entscheidungsfindung: 80, // Höchster Wert für Entscheidungsfindung
            Konfliktlösung: 70,
        },
    },
    {
        email: 'email3@email.com',
        skills: {
            Empathie: 95,
            Teamfähigkeit: 70,
            Entscheidungsfindung: 65,
            Konfliktlösung: 80,
        },
    },
];

export default function ResultsPage() {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();

    const area = searchParams.get('area') || 'unbekannt';
    const softskill = searchParams.get('softskill') || 'unbekannt';

    const highlightColor = theme.palette.secondary.main; // Nutze secondary.main aus deinem Theme für Highlighting
    const skillHighlightColor = theme.palette.info.main; // Nutze info.main für den Balken des priorisierten Skills

    // Erstelle eine kopierte und sortierte Liste der Ergebnisse
    const sortedResults = [...dummyResults].sort((a, b) => {
        const skillA = a.skills[softskill as keyof typeof a.skills] || 0;
        const skillB = b.skills[softskill as keyof typeof b.skills] || 0;
        return skillB - skillA; // Absteigend sortieren
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                p: 2,
                pt: 4,
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Paper elevation={8} sx={{ p: 4, borderRadius: 3, textAlign: 'center', mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        Mitarbeiter suchen
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                        Ergebnisse für Aufgabenbereich{" "}
                        <Box component="span" sx={{ color: highlightColor, fontWeight: 'bold' }}>
                            "{area}"
                        </Box>
                        {" "}und priorisiertem Softskill{" "}
                        <Box component="span" sx={{ color: highlightColor, fontWeight: 'bold' }}>
                            "{softskill}"
                        </Box>
                        :
                    </Typography>
                    <Button onClick={() => router.back()} variant="outlined" sx={{ mt: 2 }}>
                        Zurück zur Auswahl
                    </Button>
                </Paper>

                {sortedResults.map((result, index) => (
                    <Paper key={index} elevation={4} sx={{ p: 3, mb: 2, borderRadius: 2, textAlign: 'left' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {result.email}
                        </Typography>
                        {Object.entries(result.skills).map(([skillName, value]) => (
                            <Box key={skillName} sx={{ mb: 1 }}>
                                <Typography variant="body2">{skillName}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={value}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: theme.palette.grey[300],
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: skillName === softskill ? skillHighlightColor : theme.palette.primary.main,
                                        },
                                    }}
                                />
                            </Box>
                        ))}
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
