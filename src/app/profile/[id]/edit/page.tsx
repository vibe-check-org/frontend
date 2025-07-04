"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import getApolloClient from "../../../../lib/apolloClient";
import { GET_USER_BY_ID } from "../../../../graphql/user/query";
import { UPDATE_USER } from "../../../../graphql/user/mutation";
import { ENV } from "../../../../utils/env";

const { DEFAULT_ROUTE } = ENV;

export default function ProfilBearbeiten() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  console.log("user:", session?.user)

  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    client,
    variables: { id },
    skip: !id,
  });

  const user = data?.findById;

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [profilbildUrl, setProfilbildUrl] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [rolle, setRolle] = useState("");

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    client,
  });

  useEffect(() => {
    if (user) {
      setVorname(user.vorname || "");
      setNachname(user.nachname || "");
      setEmail(user.email || "");
      setProfilbildUrl(user.profilbildUrl || "");
      setGeburtsdatum(user.geburtsdatum || "");
      setOrganisation(user.organisation || "");
      setRolle(user.rolle || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    const variables = {
      id,
      input: {
        vorname: vorname || null,
        nachname: nachname || null,
        email: email || null,
        geburtsdatum: geburtsdatum || null,
        organisation: organisation || null,
        rolle: rolle || null,
        // profilbildUrl: profilbildUrl || null,
      },
    };

    try {
      console.log("🔄 UpdateUser wird gesendet:", variables);
      await updateUser({ variables });
      router.push(`${DEFAULT_ROUTE}/${id}`);
    } catch (error: any) {
      console.error("❌ Fehler beim Update:", error);
      if (error.graphQLErrors) {
        console.error("➡️ GraphQL Fehler:", error.graphQLErrors);
      }
      if (error.networkError) {
        console.error("➡️ Netzwerkfehler:", error.networkError);
      }
    }
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">
          Profil konnte nicht geladen werden.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h5" fontWeight="bold" color="#6A3C2C" mb={3}>
        Profil bearbeiten
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          src={profilbildUrl || undefined}
          sx={{ width: 100, height: 100, border: "3px solid #6A3C2C" }}
        />
      </Box>

      <TextField
        label="Vorname"
        value={vorname}
        onChange={(e) => setVorname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nachname"
        value={nachname}
        onChange={(e) => setNachname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Geburtsdatum"
        value={geburtsdatum}
        onChange={(e) => setGeburtsdatum(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="YYYY-MM-DD"
      />
      <TextField
        label="Organisation"
        value={organisation}
        onChange={(e) => setOrganisation(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          sx={btnStyle}
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? "Speichern..." : "Änderungen speichern"}
        </Button>
        <Button
          variant="outlined"
          sx={{ ...btnStyle, bgcolor: "#fff", color: "#4E342E" }}
          onClick={() => router.push(`${DEFAULT_ROUTE}/${user.id}`)}
        >
          Zurück zum Profil →
        </Button>
      </Box>
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
