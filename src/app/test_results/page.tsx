// frontend/src/app/test_results/page.tsx
'use client';

import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    LinearProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Dummy-Ergebnisdaten (später aus dem Backend mit echten Berechnungen laden)
const dummyTestResults = {
    overallScore: 85,
    skillScores: {
        Empathie: 80,
        Entscheidungsfindung: 90,
        Teamfähigkeit: 75,
        Konfliktlösung: 60,
        Kreativität: 88,
    },
    interpretations: {
        Empathie: "Du zeigst eine hohe Fähigkeit, dich in andere hineinzuversetzen.",
        Entscheidungsfindung: "Deine Entscheidungen triffst du überlegt und effizient.",
        Teamfähigkeit: "Du arbeitest gut im Team und förderst die Zusammenarbeit.",
        Konfliktlösung: "Du hast Raum zur Entwicklung im Umgang mit Konflikten.",
        Kreativität: "Du bringst neue Ideen ein und denkst außerhalb der Box.",
    },
};

export default function TestResultsPage() {
    const theme = useTheme();
    const router = useRouter();

    const handleProceedToPayment = () => {
        // Navigiere zur Bezahlseite
        router.push('/payment');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Paper elevation={8} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <EmojiEventsIcon sx={{ fontSize: 60, color: theme.palette.warning.main, mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        Dein Vibe Check Ergebnis
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        Gesamtpunktzahl: {dummyTestResults.overallScore}%
                    </Typography>

                    <Box sx={{ textAlign: 'left', mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}>
                            Deine Softskill-Profile:
                        </Typography>
                        {Object.entries(dummyTestResults.skillScores).map(([skillName, value]) => (
                            <Box key={skillName} sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{skillName}: {value}%</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={value}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: theme.palette.grey[300],
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: theme.palette.info.main,
                                        },
                                    }}
                                />
                                {dummyTestResults.interpretations[skillName as keyof typeof dummyTestResults.interpretations] && (
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 0.5, display: 'block' }}>
                                        {dummyTestResults.interpretations[skillName as keyof typeof dummyTestResults.interpretations]}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<DownloadIcon />}
                        onClick={handleProceedToPayment} // Geänderter Handler
                        sx={{
                            mt: 3,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        Ergebnisse als PDF freischalten
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => router.push('/profil')}
                        sx={{
                            mt: 2,
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            '&:hover': {
                                borderColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.main,
                            },
                        }}
                    >
                        Zurück zum Profil
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}
