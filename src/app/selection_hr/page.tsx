'use client'; // This component will use client-side features like useState, useTheme, useRouter

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    useTheme,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    SelectChangeEvent, // Import SelectChangeEvent
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icon für den "Suche starten" Button

export default function SelectionPage() {
    const theme = useTheme();
    const router = useRouter();
    const [selectedArea, setSelectedArea] = useState<string>(''); // Für das Dropdown
    const [selectedSoftskill, setSelectedSoftskill] = useState<string>(''); // Für die Radio-Buttons

    const handleAreaChange = (event: SelectChangeEvent<string>) => { // Use SelectChangeEvent
        setSelectedArea(event.target.value as string);
    };

    const handleSoftskillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSoftskill(event.target.value);
    };

    const handleSearchStart = () => {
        if (selectedArea && selectedSoftskill) {
            // Navigiere zur Ergebnisseite mit Query-Parametern
            router.push(`/results_hr?area=${selectedArea}&softskill=${selectedSoftskill}`);
        } else {
            alert('Bitte wählen Sie einen Aufgabenbereich und einen Softskill aus.');
        }
    };

    const availableAreas = ['IT', 'Sales']; // Beispielwerte
    const softskills = ['Empathie', 'Entscheidungsfindung', 'Teamfähigkeit', 'Konfliktlösung'];

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
            <Box sx={{ display: 'flex', width: '100%', maxWidth: 600 }}> {/* Angepasste Breite für diese Seite */}
                <Paper elevation={8} sx={{ flex: 1, p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        Mitarbeiter suchen
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                        Willkommen! Starten Sie die Suche nach passenden Talenten!
                    </Typography>

                    {/* Aufgabenbereich Dropdown */}
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="area-select-label">Aufgabenbereich</InputLabel>
                        <Select
                            labelId="area-select-label"
                            id="area-select"
                            value={selectedArea}
                            label="Aufgabenbereich"
                            onChange={handleAreaChange}
                        >
                            {availableAreas.map((area) => (
                                <MenuItem key={area} value={area}>{area}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Priorisierung der Softskills Checkboxen (als Radio-Buttons) */}
                    <Box sx={{ textAlign: 'left', mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, mb: 1 }}>
                            Priorisierung der Softskills:
                        </Typography>
                        <RadioGroup
                            name="softskills"
                            value={selectedSoftskill}
                            onChange={handleSoftskillChange}
                        >
                            {softskills.map((skill) => (
                                <FormControlLabel
                                    key={skill}
                                    value={skill}
                                    control={<Radio />}
                                    label={skill}
                                />
                            ))}
                        </RadioGroup>
                    </Box>

                    {/* Suche starten Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleSearchStart}
                        disabled={!selectedArea || !selectedSoftskill} // Deaktiviert, wenn nicht beides ausgewählt ist
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.background.default,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            },
                        }}
                    >
                        Suche starten
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}
