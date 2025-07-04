// app/test/frageboegen/page.tsx
"use client";
import { useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { GET_FRAGEBOEGEN_BY_KATEGORIE } from "../../../graphql/questionnaire/query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import getApolloClient from "../../../lib/apolloClient";

export default function FrageboegenAuswahlPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
    const kategorieId = searchParams.get("kategorieId");
    
    console.log('kategorieID:', kategorieId)
    
    const { data: session } = useSession();
    const client = useMemo(
      () => getApolloClient(session?.access_token),
      [session]
    );

    const { data, loading } = useQuery(GET_FRAGEBOEGEN_BY_KATEGORIE, {
    client,
    variables: { kategorieId },
    skip: !kategorieId,
  });

  if (loading || !data) return <CircularProgress />;

  return (
    <Box p={3} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h6" fontWeight="bold" mb={2} color="#4E342E">
        Verfügbare Fragebögen:
      </Typography>
      <Grid container spacing={2}>
        {data.getFragebogenByCategory.map((bogen: any) => (
            <Grid sx={{ xs:12 }} key={bogen.id}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#A26769", borderRadius: 2, color: "#fff" }}
              onClick={() =>
                router.push(`/test/durchfuehren?fragebogenId=${bogen.id}`)
              }
            >
              {bogen.titel}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
