"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  LinearProgress,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import getApolloClient from "../../../../lib/apolloClient";
import { GET_USER_BY_ID } from "../../../../graphql/user/query";

export default function Ergebnisse() {
  const { id } = useParams();
  const { data: session } = useSession();

  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    client,
    variables: { id },
    skip: !id,
  });

  const profile = data?.findById?.profile;
  const skills = profile?.skills || [];

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">
          Fehler beim Laden der Auswertung oder kein Profil gefunden.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h5" fontWeight="bold" color="#6A3C2C" mb={2}>
        Auswertung deiner Soft Skills
      </Typography>

      <Typography color="#4E342E" mb={3}>
        Erstellt am: {new Date(profile.erstelltAm).toLocaleDateString()}
      </Typography>

      {skills.map((skill: any, index: number) => (
        <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: "#fff" }} elevation={2}>
          <Typography fontWeight="bold" color="#4E342E">
            {skill.kategorie}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(skill.punkte / 5) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              mt: 1,
              backgroundColor: "#C2B280",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#D88C60",
              },
            }}
          />
          <Typography
            variant="caption"
            display="block"
            textAlign="right"
            color="#4E342E"
          >
            {skill.punkte} / 5
          </Typography>
        </Paper>
      ))}

      {skills.length === 0 && (
        <Typography color="#A26769">Keine Skills verfügbar.</Typography>
      )}
    </Box>
  );
}
