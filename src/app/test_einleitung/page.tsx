// frontend/src/app/einleitung/page.tsx
'use client';

import React from 'react';
import { Box, Paper, Typography, Button, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Neues Icon für Hinweise

export default function EinleitungsPage() {
    const theme = useTheme();
    const router = useRouter();

    const handleStartTest = () => {
        router.push('/test'); // Navigiert zur eigentlichen Testseite
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
                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        Willkommen zum Vibe Check
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        Bereit für deinen Test?
                    </Typography>

                    <Box sx={{ textAlign: 'left', mb: 3 }}>
                        <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 2, display: 'flex', alignItems: 'center' }}>
                            <InfoOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.dark }} />
                            Bevor du startest, beachte bitte folgende Hinweise:
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />
                                </ListItemIcon>
                                <ListItemText primary="Der Test besteht aus mehreren Fragen zu deinen Softskills." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />
                                </ListItemIcon>
                                <ListItemText primary="Es gibt keine richtigen oder falschen Antworten. Sei ehrlich zu dir selbst!" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />
                                </ListItemIcon>
                                <ListItemText primary="Plane ca. 15-20 Minuten für den gesamten Test ein." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />
                                </ListItemIcon>
                                <ListItemText primary="Deine Ergebnisse bleiben vertraulich und dienen nur deiner persönlichen Entwicklung." />
                            </ListItem>
                        </List>
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleStartTest}
                        sx={{
                            mt: 3,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        Test starten
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => router.back()}
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
