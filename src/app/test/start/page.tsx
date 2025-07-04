// app/test/start/page.tsx
"use client";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { GET_ALL_KATEGORIEN } from "../../../graphql/questionnaire/query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import getApolloClient from "../../../lib/apolloClient";

export default function KategorieStartPage() {
    const { data: session } = useSession();
    const client = useMemo(
      () => getApolloClient(session?.access_token),
      [session]
    );
  const { data, loading } = useQuery(GET_ALL_KATEGORIEN, { client });
  const router = useRouter();

  if (loading) return <CircularProgress />;

  return (
    <Box p={3} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h6" fontWeight="bold" mb={2} color="#4E342E">
        Wähle eine Kategorie:
      </Typography>
      <Grid container spacing={2}>
        {data?.getAllKategorien.map((kat: any) => (
            <Grid sx={{ xs:12 }} key={kat.id}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#D88C60", borderRadius: 2, color: "#fff" }}
              onClick={() =>
                router.push(`/test/frageboegen?kategorieId=${kat.id}`)
              }
            >
              {kat.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
