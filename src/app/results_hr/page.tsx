'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    useTheme,
    LinearProgress,
    Button,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

// Dummy-Daten für die Ergebnisse, JETZT MIT STADT
const dummyResults = [
    {
        email: 'email1@email.com',
        city: 'Berlin', // <-- Hinzugefügt
        skills: {
            Empathie: 80,
            Teamfähigkeit: 90,
            Entscheidungsfindung: 75,
            Konfliktlösung: 60,
        },
    },
    {
        email: 'email2@email.com',
        city: 'München', // <-- Hinzugefügt
        skills: {
            Empathie: 70,
            Teamfähigkeit: 85,
            Entscheidungsfindung: 80,
            Konfliktlösung: 70,
        },
    },
    {
        email: 'email3@email.com',
        city: 'Hamburg', // <-- Hinzugefügt
        skills: {
            Empathie: 95,
            Teamfähigkeit: 70,
            Entscheidungsfindung: 65,
            Konfliktlösung: 80,
        },
    },
    {
        email: 'email4@email.com',
        city: 'Berlin', // <-- Hinzugefügt
        skills: {
            Empathie: 85,
            Teamfähigkeit: 75,
            Entscheidungsfindung: 90, // Hoher Wert für Entscheidungsfindung
            Konfliktlösung: 65,
        },
    },
];

export default function ResultsPage() {
    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();

    const area = searchParams.get('area') || 'unbekannt';
    const softskill = searchParams.get('softskill') || 'unbekannt';
    const cityQueryParam = searchParams.get('city') || searchParams.get('location'); // Lese Stadt oder "current" aus
    const radius = searchParams.get('radius') || 'unbegrenzt'; // Lese Radius aus

    const highlightColor = theme.palette.secondary.main;
    const skillHighlightColor = theme.palette.info.main;

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                // Hier wäre der API-Aufruf an dein Gateway!
                // Beispiel-URL, die du später anpassen musst:
                // const response = await fetch(`http://localhost:4000/api/search-employees?area=${area}&softskill=${softskill}&city=${cityQueryParam}&radius=${radius}`);

                // Für jetzt verwenden wir die Dummy-Daten
                // Filtern der Dummy-Daten basierend auf dem Städtenamen
                const filteredDummyResults = dummyResults.filter(person => {
                    // Wenn weder Stadt noch aktueller Standort angegeben ist, zeige alle an
                    if (!cityQueryParam) return true;

                    // Wenn der Parameter "current" ist (d.h., aktueller Standort verwendet wurde)
                    // oder die Person in der gesuchten Stadt ist
                    // ACHTUNG: Hier müsste später eine echte Geo-Distanzberechnung stattfinden
                    return cityQueryParam === 'current' || person.city === cityQueryParam;
                });


                // Sortieren der gefilterten Dummy-Daten
                const sortedData = [...filteredDummyResults].sort((a, b) => {
                    const skillA = a.skills[softskill as keyof typeof a.skills] || 0;
                    const skillB = b.skills[softskill as keyof typeof b.skills] || 0;
                    return skillB - skillA; // Absteigend sortieren
                });

                setResults(sortedData);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [area, softskill, cityQueryParam, radius]); // Abhängigkeiten für useEffect

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                    Lade Ergebnisse...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" color="error">
                    Fehler beim Laden der Ergebnisse: {error}
                </Typography>
            </Box>
        );
    }

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
                        , priorisiertem Softskill{" "}
                        <Box component="span" sx={{ color: highlightColor, fontWeight: 'bold' }}>
                            "{softskill}"
                        </Box>
                        {cityQueryParam && (
                            <>
                                {" "}und Umkreis{" "}
                                <Box component="span" sx={{ color: highlightColor, fontWeight: 'bold' }}>
                                    {cityQueryParam === 'current' ? `aktueller Standort` : `"${cityQueryParam}"`}
                                </Box>
                                {" "}({radius} km):
                            </>
                        )}
                        {!cityQueryParam && ":"} {/* Wenn kein Standort, einfach Doppelpunkt anhängen */}
                    </Typography>
                    <Button onClick={() => router.back()} variant="outlined" sx={{ mt: 2 }}>
                        Zurück zur Auswahl
                    </Button>
                </Paper>

                {results.length === 0 ? (
                    <Paper elevation={4} sx={{ p: 3, mb: 2, borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                            Keine Mitarbeiter für die gewählten Kriterien gefunden.
                        </Typography>
                    </Paper>
                ) : (
                    results.map((result, index) => (
                        <Paper key={index} elevation={4} sx={{ p: 3, mb: 2, borderRadius: 2, textAlign: 'left' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {result.email}
                            </Typography>
                            {/* Hier wird der Stadtname angezeigt */}
                            {result.city && (
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                    Standort: {result.city}
                                </Typography>
                            )}
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
                    ))
                )}
            </Box>
        </Box>
    );
}
