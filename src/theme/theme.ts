// theme/theme.ts
// MUI Theme mit CI-Farben für VibeCheck (Mobile-First)

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#D88C60', // Terrakotta
        },
        secondary: {
            main: '#A26769', // Altrosa
        },
        background: {
            default: '#F9F4EF', // Cremeweiß
            paper: '#FFFFFF',
        },
        warning: {
            main: '#FFD580', // Ocker (Highlight)
        },
        info: {
            main: '#C2B280', // Sandbeige (Akzent 1)
        },
        success: {
            main: '#A8B5A2', // Salbeigrün (Akzent 2)
        },
        text: {
            primary: '#4E342E', // Dunkelbraun für Kontrast
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16, // Weiche, moderne Kanten
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});

export default theme;