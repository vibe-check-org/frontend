// frontend/src/app/payment/page.tsx
'use client'; // <-- Stelle sicher, dass diese Zeile ganz oben steht!

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Grid,
    Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments'; // <-- Geändertes Icon für PayPal/Zahlungen
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Für SEPA

export default function PaymentPage() {
    const theme = useTheme();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handlePaymentSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Hier würde die eigentliche Zahlungsabwicklung stattfinden (Backend-Aufruf)
        console.log('Zahlungsmethode:', paymentMethod);
        if (paymentMethod === 'credit_card') {
            console.log('Kreditkarten-Details:', { cardNumber, expiryDate, cvc, cardHolderName });
            // Hier Validation und API-Call zum Zahlungsdienstleister
            alert('Kreditkartenzahlung simuliert. Bei Erfolg würde jetzt das PDF heruntergeladen.');
        } else if (paymentMethod === 'paypal') {
            alert('Weiterleitung zu PayPal simuliert. Bei Erfolg würde jetzt das PDF heruntergeladen.');
            // Hier Weiterleitung zu PayPal oder API-Call
        } else if (paymentMethod === 'sepa') {
            alert('SEPA-Zahlung simuliert. Bei Erfolg würde jetzt das PDF heruntergeladen.');
            // Hier SEPA-Daten erfassen und API-Call
        }

        // Nach erfolgreicher Zahlung (simuliert): PDF-Download starten
        // (Dies würde real erst nach Bestätigung durch den Zahlungsdienstleister erfolgen)
        // Da wir kein Backend haben, simulieren wir den Download direkt.
        // In einer echten Anwendung würdest du eine Backend-Route aufrufen, die das PDF generiert und zurückgibt.
        window.open('/api/generate-pdf-report', '_blank'); // Beispiel-API-Route für PDF
        router.push('/test_results'); // Optional: zurück zur Ergebnisseite oder eine Bestätigungsseite
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
            <Box sx={{ width: '100%', maxWidth: 700 }}>
                <Paper elevation={8} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                        Ergebnisse freischalten
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        Um dein detailliertes Vibe Check Ergebnis als PDF herunterladen zu können, ist eine einmalige Gebühr von 9,99€ fällig.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <form onSubmit={handlePaymentSubmit}>
                        <FormControl component="fieldset" sx={{ mb: 3, width: '100%', textAlign: 'left' }}>
                            <FormLabel component="legend" sx={{ color: theme.palette.text.primary, mb: 1, fontWeight: 'bold' }}>
                                Wähle eine Zahlungsmethode:
                            </FormLabel>
                            <RadioGroup
                                aria-label="payment-method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}
                            >
                                <FormControlLabel
                                    value="credit_card"
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <CreditCardIcon sx={{ mr: 1 }} /> Kreditkarte
                                        </Box>
                                    }
                                />
                                <FormControlLabel
                                    value="paypal"
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <PaymentsIcon sx={{ mr: 1 }} /> PayPal {/* <-- HIER KORREKTUR */}
                                        </Box>
                                    }
                                />
                                <FormControlLabel
                                    value="sepa"
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center">
                                            <AccountBalanceIcon sx={{ mr: 1 }} /> SEPA-Lastschrift
                                        </Box>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>

                        {paymentMethod === 'credit_card' && (
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Kartennummer"
                                            variant="outlined"
                                            size="small"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            required
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]{13,16}' }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Ablaufdatum (MM/JJ)"
                                            variant="outlined"
                                            size="small"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            required
                                            inputProps={{ pattern: '(0[1-9]|1[0-2])\\/([0-9]{2})' }}
                                            placeholder="MM/JJ"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="CVC"
                                            variant="outlined"
                                            size="small"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value)}
                                            required
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]{3,4}' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Karteninhaber"
                                            variant="outlined"
                                            size="small"
                                            value={cardHolderName}
                                            onChange={(e) => setCardHolderName(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Hier könnten spezifische Felder für PayPal oder SEPA folgen, falls benötigt */}
                        {paymentMethod === 'paypal' && (
                            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                                Nach Klick auf "Bezahlen" wirst du zu PayPal weitergeleitet.
                            </Typography>
                        )}
                        {paymentMethod === 'sepa' && (
                            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                                Nach Klick auf "Bezahlen" wirst du aufgefordert, deine Bankdaten für die SEPA-Lastschrift einzugeben.
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 4,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.background.default,
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.main,
                                },
                            }}
                        >
                            Jetzt Bezahlen (9,99€)
                        </Button>
                    </form>

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
                        Zurück zu den Ergebnissen
                    </Button>
                </Paper>
            </Box>
        </Box>
    );
}
