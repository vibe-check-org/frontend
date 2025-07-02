'use client';

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
    SelectChangeEvent,
    TextField, // Importiere TextField für die Stadt-Eingabe
    Slider, // Importiere Slider für den Umkreis
    Checkbox, // Importiere Checkbox für "Standort verwenden"
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SelectionPage() {
    const theme = useTheme();
    const router = useRouter();

    // Zustände für die bestehenden Felder
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [selectedSoftskill, setSelectedSoftskill] = useState<string>('');

    // Zustände für die neuen Standort-Felder
    const [cityName, setCityName] = useState<string>(''); // Für die Stadt-Eingabe
    const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false); // Für "Standort verwenden"
    const [radius, setRadius] = useState<number>(50); // Für den Umkreis-Schieberegler, Standardwert 50km

    const handleAreaChange = (event: SelectChangeEvent<string>) => {
        setSelectedArea(event.target.value as string);
    };

    const handleSoftskillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSoftskill(event.target.value);
    };

    const handleCityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const handleUseCurrentLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUseCurrentLocation(event.target.checked);
        if (event.target.checked) {
            setCityName(''); // Stadtname leeren, wenn Standort verwendet wird
            // Hier würde normalerweise die Geolokalisierungs-API aufgerufen werden
            // navigator.geolocation.getCurrentPosition(...)
            // Fürs Erste ist es nur eine UI-Anzeige.
        }
    };

    const handleRadiusChange = (event: Event, newValue: number | number[]) => {
        setRadius(newValue as number);
    };

    const handleSearchStart = () => {
        // Validierung: Mindestens Aufgabenbereich UND Softskill MÜSSEN ausgewählt sein.
        // Für den Standort: entweder Stadtname ODER "Standort verwenden" MUSS ausgewählt sein.
        if (!selectedArea || !selectedSoftskill) {
            alert('Bitte wählen Sie einen Aufgabenbereich und einen Softskill aus.');
            return;
        }

        if (!cityName && !useCurrentLocation) {
            alert('Bitte geben Sie einen Städtenamen ein ODER aktivieren Sie "Standort verwenden".');
            return;
        }

        // Baue die Query-Parameter zusammen
        const queryParams = new URLSearchParams();
        queryParams.append('area', selectedArea);
        queryParams.append('softskill', selectedSoftskill);

        if (useCurrentLocation) {
            queryParams.append('location', 'current'); // Platzhalter für "aktueller Standort"
            queryParams.append('radius', radius.toString());
        } else if (cityName) {
            queryParams.append('city', cityName);
            queryParams.append('radius', radius.toString());
        }

        router.push(`/results_hr?${queryParams.toString()}`);
    };

    const availableAreas = ['IT', 'Sales']; // Beispielwerte erweitert
    const softskills = ['Empathie', 'Entscheidungsfindung', 'Teamfähigkeit', 'Konfliktlösung', 'Kreativität']; // Beispielwerte erweitert

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
            <Box sx={{ display: 'flex', width: '100%', maxWidth: 600 }}>
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

                    {/* Neue Sektion für die örtliche Eingrenzung */}
                    <Box sx={{ textAlign: 'left', mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary, mb: 2 }}>
                            Örtliche Eingrenzung:
                        </Typography>

                        {/* Textfeld für Städtenamen */}
                        <TextField
                            fullWidth
                            label="Städtenamen eingeben"
                            variant="outlined"
                            value={cityName}
                            onChange={handleCityNameChange}
                            sx={{ mb: 2 }}
                            disabled={useCurrentLocation} // Deaktiviert, wenn "Standort verwenden" aktiv ist
                        />

                        {/* Checkbox "Standort verwenden" */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={useCurrentLocation}
                                    onChange={handleUseCurrentLocationChange}
                                    color="primary"
                                />
                            }
                            label="Aktuellen Standort verwenden"
                            sx={{ mb: 3 }}
                        />

                        {/* Schieberegler für Umkreis */}
                        <Typography gutterBottom sx={{ color: theme.palette.text.secondary }}>
                            Umkreis: {radius} km
                        </Typography>
                        <Slider
                            value={radius}
                            onChange={handleRadiusChange}
                            aria-labelledby="radius-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={200}
                            sx={{ mb: 3 }}
                        />
                    </Box>

                    {/* Suche starten Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleSearchStart}
                        // Der Button ist deaktiviert, wenn Aufgabenbereich/Softskill nicht gewählt sind
                        // ODER wenn KEIN Standort gewählt ist (weder Stadtname noch aktueller Standort)
                        disabled={!selectedArea || !selectedSoftskill || (!cityName && !useCurrentLocation)}
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
