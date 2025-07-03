<<<<<<< HEAD
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
// Icons entfernt: import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Icons entfernt: import LinkIcon from '@mui/icons-material/Link';
// Icons entfernt: import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function ProfilBearbeitenPage() {
    const [showPassword, setShowPassword] = useState(false); // Beibehalten für Funktionalität, auch ohne Icon
    const theme = useTheme();
    const router = useRouter();

    // Zustand für die einzelnen Felder initialisieren
    const [profilbild, setProfilbild] = useState('');
    const [name, setName] = useState('Max');
    const [nachname, setNachname] = useState('Mustermann');
    const [email, setEmail] = useState('max.mustermann@example.com');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [geburtstag, setGeburtstag] = useState('');
    const [telefonnummer, setTelefonnummer] = useState('');
    const [wohnort, setWohnort] = useState('Berlin');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent) => event.preventDefault();

    const handleSaveChanges = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Profiländerungen speichern:', {
            name,
            nachname,
            email,
            password,
            telefonnummer,
            wohnort,
        });
        alert('Profiländerungen gespeichert!');
        router.push('/profil');
    };

    const handleConnectLinkedIn = () => {
        alert('Verbindung mit LinkedIn wird initiiert...');
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
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                fullWidth
                                label="Profilbild (optional)"
                                variant="outlined"
                                size="small"
                                value={profilbild}
                                onChange={(e) => setProfilbild(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Vorname"
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Nachname"
                                variant="outlined"
                                size="small"
                                value={nachname}
                                onChange={(e) => setNachname(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="E-Mail"
                                type="email"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Passwort"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                size="small"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {/* Icons entfernt, daher nur ein einfacher Button */}
                                            <Button
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                size="small"
                                                sx={{ minWidth: 'unset', px: 1 }} // Kleinere Größe für den Adornment-Button
                                            >
                                                {showPassword ? 'Ausblenden' : 'Anzeigen'}
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Passwort Wiederholen"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                size="small"
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Geburtstag"
                                type="date"
                                variant="outlined"
                                size="small"
                                value={geburtstag}
                                onChange={(e) => setGeburtstag(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Telefonnummer"
                                variant="outlined"
                                size="small"
                                value={telefonnummer}
                                onChange={(e) => setTelefonnummer(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Wohnort"
                                variant="outlined"
                                size="small"
                                value={wohnort}
                                onChange={(e) => setWohnort(e.target.value)}
                            />
                        </Box>

                        {/* Button für LinkedIn (ohne Icon) */}
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleConnectLinkedIn}
                            sx={{
                                mt: 3,
                                color: theme.palette.info.main,
                                borderColor: theme.palette.info.main,
                                borderRadius: 12,
                                fontWeight: 600,
                                '&:hover': {
                                    backgroundColor: theme.palette.info.light,
                                    borderColor: theme.palette.info.dark,
                                },
                            }}
                        >
                            Mit LinkedIn verbinden
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.default,
                                borderRadius: 12,
                                fontWeight: 600,
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
                            onClick={() => router.push('/profil')}
                            sx={{
                                mt: 2,
                                color: theme.palette.primary.main,
                                borderColor: theme.palette.primary.main,
                                borderRadius: 12,
                                fontWeight: 600,
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
=======
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
>>>>>>> d7ef237c185f70aa4c065d07845d52b67973db41
}
