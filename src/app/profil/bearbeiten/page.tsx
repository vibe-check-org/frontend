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
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Wichtig: Icons importieren
import { useRouter } from 'next/navigation';

export default function ProfilBearbeitenPage() {
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const router = useRouter();

    // Zustand für die einzelnen Felder initialisieren
    // Diese Werte können später aus einer API oder einem Kontext geladen werden
    const [profilbild, setProfilbild] = useState('');
    const [name, setName] = useState('Max');
    const [nachname, setNachname] = useState('Mustermann');
    const [email, setEmail] = useState('max.mustermann@example.com');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [geburtstag, setGeburtstag] = useState('');
    const [telefonnummer, setTelefonnummer] = useState('');
    const [linkedinXing, setLinkedinXing] = useState('');
    const [wohnort, setWohnort] = useState('Berlin');
    const [ueberMich, setUeberMich] = useState('Hallo, ich bin Max und interessiere mich für...');
    const [interessen, setInteressen] = useState('Lesen, Sport, Reisen');
    const [lebensmotto, setLebensmotto] = useState('Carpe Diem');

    // Dummy-Werte für Felder, die eventuell von Backend kommen oder nicht editierbar sind
    const [einmaligerCode, setEinmaligerCode] = useState('XYZ123ABC');
    const [statusTest, setStatusTest] = useState('Bestanden');
    const [datumTestabschluss, setDatumTestabschluss] = useState('2024-01-15');
    const [softSkillsAuswertung, setSoftSkillsAuswertung] = useState('Teamfähigkeit: 90%, Empathie: 85%');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();

    const handleSave = () => {
        // Hier würde die Logik zum Speichern der Daten implementiert
        // z.B. API-Aufruf
        alert('Profil gespeichert!');
        router.push('/profil'); // Zurück zur Profilübersicht
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Paper elevation={8} sx={{ p: 4, borderRadius: 3, maxWidth: 600, width: '100%', textAlign: 'left' }}>
                <Typography variant="h6" fontWeight="bold" mb={3} color={theme.palette.primary.main}>
                    Hallo {name} {nachname}
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Profilbild */}
                    <TextField
                        label="Profilbild (optional)"
                        variant="outlined"
                        fullWidth
                        value={profilbild}
                        onChange={(e) => setProfilbild(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Name */}
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Nachname */}
                    <TextField
                        label="Nachname"
                        variant="outlined"
                        fullWidth
                        value={nachname}
                        onChange={(e) => setNachname(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* E-Mail */}
                    <TextField
                        label="E-Mail"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Passwort */}
                    <TextField
                        label="Passwort"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Passwort Wiederholen */}
                    <TextField
                        label="Passwort Wiederholen"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Geburtstag */}
                    <TextField
                        label="Geburtstag"
                        type="date" // Datums-Input-Typ für bessere Benutzerfreundlichkeit
                        variant="outlined"
                        fullWidth
                        value={geburtstag}
                        onChange={(e) => setGeburtstag(e.target.value)}
                        InputLabelProps={{
                            shrink: true, // Label soll immer schrumpfen für Datum
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Telefonnummer */}
                    <TextField
                        label="Telefonnummer"
                        variant="outlined"
                        fullWidth
                        value={telefonnummer}
                        onChange={(e) => setTelefonnummer(e.target.value)}
                        type="tel"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* LinkedIn/Xing-Profil */}
                    <TextField
                        label="LinkedIn/Xing-Profil"
                        variant="outlined"
                        fullWidth
                        value={linkedinXing}
                        onChange={(e) => setLinkedinXing(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Wohnort */}
                    <TextField
                        label="Wohnort"
                        variant="outlined"
                        fullWidth
                        value={wohnort}
                        onChange={(e) => setWohnort(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Über-mich-Text */}
                    <TextField
                        label="Über-mich-Text"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4} // Mehrere Zeilen für längeren Text
                        value={ueberMich}
                        onChange={(e) => setUeberMich(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Interessen */}
                    <TextField
                        label="Interessen"
                        variant="outlined"
                        fullWidth
                        value={interessen}
                        onChange={(e) => setInteressen(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />
                    {/* Lebensmotto */}
                    <TextField
                        label="Lebensmotto"
                        variant="outlined"
                        fullWidth
                        value={lebensmotto}
                        onChange={(e) => setLebensmotto(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.secondary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.secondary.dark,
                                },
                            },
                        }}
                    />

                    {/* Felder mit Dummy-Werten, die nicht direkt bearbeitet werden (können aber angezeigt werden) */}
                    <TextField
                        label="Einmaliger Code"
                        variant="outlined"
                        fullWidth
                        value={einmaligerCode}
                        InputProps={{ readOnly: true }} // Nicht editierbar
                        sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: theme.palette.text.disabled } }}
                    />
                    <TextField
                        label="Status Test"
                        variant="outlined"
                        fullWidth
                        value={statusTest}
                        InputProps={{ readOnly: true }} // Nicht editierbar
                        sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: theme.palette.text.disabled } }}
                    />
                    <TextField
                        label="Datum des Testabschlusses"
                        variant="outlined"
                        fullWidth
                        value={datumTestabschluss}
                        InputProps={{ readOnly: true }} // Nicht editierbar
                        sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: theme.palette.text.disabled } }}
                    />
                    <TextField
                        label="Soft-Skills-Auswertung"
                        variant="outlined"
                        fullWidth
                        value={softSkillsAuswertung}
                        InputProps={{ readOnly: true }} // Nicht editierbar
                        sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: theme.palette.text.disabled } }}
                    />
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    sx={{
                        mt: 4,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.background.default,
                        borderRadius: 10,
                        '&:hover': {
                            bgcolor: theme.palette.secondary.main,
                        },
                    }}
                >
                    Speichern →
                </Button>
            </Paper>
        </Box>
    );
}
