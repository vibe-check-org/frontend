"use client";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_DATA } from "@/graphql/queries";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  CircularProgress,
  Button,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export default function DashboardPage() {
  const theme = useTheme();
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  if (loading)
    return <CircularProgress sx={{ mt: 4, display: "block", mx: "auto" }} />;
  if (error)
    return <Typography color="error">Fehler beim Laden der Daten.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        color={theme.palette.primary.main}
        fontWeight="bold"
        gutterBottom
      >
        Willkommen bei VibeCheck
      </Typography>

      <Box mt={4}>
        <Typography
          variant="h6"
          color={theme.palette.secondary.main}
          gutterBottom
        >
          Dein aktueller VibeScore
        </Typography>
        {data.meinScore.map((score: any, index: number) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 1,
              backgroundColor: theme.palette.background.paper,
              borderLeft: `6px solid ${theme.palette.info.main}`,
            }}
          >
            <Typography variant="subtitle1">{score.kategorie}</Typography>
            <Typography variant="h6" color="primary">
              {score.wert}/100
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box mt={4}>
        <Typography
          variant="h6"
          color={theme.palette.secondary.main}
          gutterBottom
        >
          Verfügbare Fragebögen
        </Typography>
        <Grid container spacing={2}>
          {data.frageboegen.map((bogen: any) => (
            <Grid item xs={12} sm={6} key={bogen.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {bogen.titel}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {bogen.beschreibung}
                </Typography>
                <Link href={`/frageboegen/${bogen.id}`}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    }}
                  >
                    Starten
                  </Button>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={5} textAlign="center">
        <Link href="/profile">
          <Button variant="text" color="secondary">
            Zum Profil
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
