// frontend/src/app/profil/bearbeiten/page.tsx
'use client';

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    TextField,
    MenuItem, // Für das Geschlecht Dropdown
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProfilBearbeitenPage() {
    const theme = useTheme();
    const router = useRouter();

    // Zustände für die Formularfelder (Beispiel)
    const [firstName, setFirstName] = useState('Max');
    const [lastName, setLastName] = useState('Mustermann');
    const [email, setEmail] = useState('max.mustermann@example.com');
    const [city, setCity] = useState('Berlin');
    const [gender, setGender] = useState('Männlich'); // Beispiel für ein Auswahlfeld

    const handleSaveChanges = (event: React.FormEvent) => {
        event.preventDefault();
        // Hier würde die Logik zum Speichern der Änderungen im Backend erfolgen
        console.log('Profiländerungen speichern:', {
            firstName,
            lastName,
            email,
            city,
            gender,
        });
        alert('Profiländerungen gespeichert!');
        router.push('/profil'); // Zurück zur Profilseite nach dem Speichern
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
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Paper elevation={8} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: theme.palette.primary.main, fontWeight: 'bold' }}>
                        Profil bearbeiten
                    </Typography>

                    <form onSubmit={handleSaveChanges}>
                        <TextField
                            fullWidth
                            label="Vorname"
                            variant="outlined"
                            size="small"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Nachname"
                            variant="outlined"
                            size="small"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="E-Mail"
                            type="email"
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Stadt"
                            variant="outlined"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            select
                            label="Geschlecht"
                            variant="outlined"
                            size="small"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{ mb: 3 }}
                        >
                            <MenuItem value="Männlich">Männlich</MenuItem>
                            <MenuItem value="Weiblich">Weiblich</MenuItem>
                            <MenuItem value="Divers">Divers</MenuItem>
                            <MenuItem value="Keine Angabe">Keine Angabe</MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.default,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.main,
                                },
                            }}
                        >
                            Änderungen speichern
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => router.push('/profil')} // Zurück zur Profilseite
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
                            Abbrechen
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}
