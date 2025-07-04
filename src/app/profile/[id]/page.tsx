"use client";

import { Box, Typography, Avatar, Button, useTheme, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import getApolloClient from "../../../lib/apolloClient";
import { GET_USER_BY_ID } from "../../../graphql/user/query";
import { useQuery } from "@apollo/client";
import { ENV } from "../../../utils/env";

const { DEFAULT_ROUTE } = ENV;

export default function Profil() {
  const { id } = useParams();
  console.log("Profil ID:", id);
  const theme = useTheme();
  const router = useRouter();

  const { data: session } = useSession();
  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );

  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_USER_BY_ID, {
    client,
    variables: { id },
  });

  console.log("data: ", userData);
  const user = userData?.findById;

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error|| !user ) {
    console.error("User Error:", error);
    console.error("❌ Fehler beim Ausführen der UpdateUser-Mutation:");
    console.error("➡️ Variables:", id);
    console.error("➡️ ApolloError:", error);
    console.error('user: ', user)
    if (error?.graphQLErrors) {
      console.error("➡️ graphQLErrors:", error.graphQLErrors);
    }
    if (error?.networkError) {
      console.error("➡️ networkError:", error.networkError);
    }
    console.error(
      "➡️ Vollständiger Fehler als JSON:",
      JSON.stringify(error, null, 2)
    );
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">
          Fehler beim Laden des Profils oder Benutzer nicht gefunden.{" "}
          {JSON.stringify(error, null, 2)}
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh" textAlign="center">
      <Typography variant="h5" fontWeight="bold" color="#6A3C2C" mb={2}>
        Profil
      </Typography>

      <Avatar
        src={user.profilbildUrl || undefined}
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
          border: "4px solid #6A3C2C",
        }}
      />

      <Typography fontWeight="bold" color="#6A3C2C">
        {user.vorname} {user.nachname}
      </Typography>
      <Typography color={user.profile ? "green" : "orange"} mt={1}>
        Teststatus: {user.profile ? "Abgeschlossen" : "Offen"}
      </Typography>
      <Typography color="orange">Code-Status: Nicht eingelöst</Typography>

      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={() => router.push(`/test_einleitung`)}
        >
          Test Starten →
        </Button>
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={() => router.push(`${DEFAULT_ROUTE}/${user.id}/results`)}
        >
          Auswertung anzeigen →
        </Button>
        <Button variant="contained" sx={btnStyle}>
          Zertifikat anfordern →
        </Button>
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={() => router.push(`${DEFAULT_ROUTE}/${user.id}/edit`)}
        >
          Profil bearbeiten →
        </Button>
      </Box>

      <Typography
        mt={4}
        color="#A0522D"
        fontSize="0.9rem"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Logout / Code einlösen
      </Typography>
    </Box>
  );
}

const btnStyle = {
  bgcolor: "#4E342E",
  borderRadius: 10,
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    bgcolor: "#6A3C2C",
  },
};