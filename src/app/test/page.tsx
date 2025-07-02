// frontend/src/app/test/page.tsx
'use client';

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    LinearProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';

// Beispiel-Fragenstruktur (später aus dem Backend laden)
const questions = [
    {
        id: 1,
        text: "Wie reagierst du, wenn ein Teammitglied Schwierigkeiten bei einer Aufgabe hat?",
        options: [
            { value: 1, label: "Ich biete sofort meine Hilfe an." },
            { value: 2, label: "Ich warte ab, ob die Person selbst um Hilfe bittet." },
            { value: 3, label: "Ich konzentriere mich auf meine eigene Aufgabe." },
            { value: 4, label: "Ich weise auf die Fehler hin, damit die Person es besser macht." },
        ],
        skill: "Empathie" // Dies könnte der Softskill sein, der hier bewertet wird
    },
    {
        id: 2,
        text: "Wie triffst du wichtige Entscheidungen in einem Projekt?",
        options: [
            { value: 1, label: "Nach sorgfältiger Analyse aller Fakten." },
            { value: 2, label: "Intuitiv und schnell." },
            { value: 3, label: "Ich delegiere die Entscheidung, wenn möglich." },
            { value: 4, label: "Ich warte, bis jemand anderes die Entscheidung trifft." },
        ],
        skill: "Entscheidungsfindung"
    },
    {
        id: 3,
        text: "Wie verhältst du dich in Konfliktsituationen im Team?",
        options: [
            { value: 1, label: "Ich suche das offene Gespräch und versuche zu vermitteln." },
            { value: 2, label: "Ich vermeide Konflikte und halte mich heraus." },
            { value: 3, label: "Ich versuche, meine Meinung durchzusetzen." },
            { value: 4, label: "Ich lasse die Situation eskalieren, damit sie sich von selbst löst." },
        ],
        skill: "Konfliktlösung"
    },
    {
        id: 4,
        text: "Was motiviert dich am meisten in der Zusammenarbeit mit anderen?",
        options: [
            { value: 1, label: "Das Erreichen gemeinsamer Ziele." },
            { value: 2, label: "Die Anerkennung meiner individuellen Leistung." },
            { value: 3, label: "Ein reibungsloser Ablauf ohne viel Diskussion." },
            { value: 4, label: "Die Möglichkeit, andere zu leiten und zu beeinflussen." },
        ],
        skill: "Teamfähigkeit"
    },
    {
        id: 5,
        text: "Wie gehst du mit neuen, unkonventionellen Ideen um?",
        options: [
            { value: 1, label: "Ich bin offen dafür und diskutiere sie aktiv." },
            { value: 2, label: "Ich bin skeptisch und bevorzuge bewährte Methoden." },
            { value: 3, label: "Ich ignoriere sie, wenn sie nicht direkt relevant sind." },
            { value: 4, label: "Ich kritisiere sie, wenn sie nicht sofort umsetzbar erscheinen." },
        ],
        skill: "Kreativität"
    },
];

export default function TestPage() {
    const theme = useTheme();
    const router = useRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({}); // Speichert die ausgewählten Antworten (Fragen-ID: Wert)

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers({
            ...answers,
            [questions[currentQuestionIndex].id]: parseInt(event.target.value),
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Test beendet, zur Ergebnisseite navigieren
            // Hier würde man normalerweise die Antworten an ein Backend senden zur Auswertung
            console.log('Alle Antworten:', answers);
            router.push('/test_results');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
                        Vibe Check Test
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        Frage {currentQuestionIndex + 1} von {questions.length}
                    </Typography>

                    <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 8, borderRadius: 5, backgroundColor: theme.palette.grey[300], '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.primary.main } }} />

                    <Box sx={{ textAlign: 'left', mb: 4 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {currentQuestion.text}
                        </Typography>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                name={`question-${currentQuestion.id}`}
                                value={answers[currentQuestion.id] || ''}
                                onChange={handleAnswerChange}
                            >
                                {currentQuestion.options.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio sx={{ color: theme.palette.primary.main }} />}
                                        label={option.label}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3 }}>
                        <Button
                            variant="outlined"
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            sx={{
                                flex: 1,
                                color: theme.palette.primary.main,
                                borderColor: theme.palette.primary.main,
                                '&:hover': {
                                    borderColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.main,
                                },
                            }}
                        >
                            Zurück
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNextQuestion}
                            disabled={!answers[currentQuestion.id]} // Deaktiviert, wenn keine Antwort ausgewählt
                            sx={{
                                flex: 1,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.default,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.main,
                                },
                            }}
                        >
                            {currentQuestionIndex === questions.length - 1 ? 'Weiter zur Auswertung' : 'Nächste Frage'}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
