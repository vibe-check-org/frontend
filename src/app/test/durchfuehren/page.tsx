"use client";

import { useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Paper,
} from "@mui/material";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../lib/apolloClient";
import { GET_FRAGEN_BY_FRAGEBOGEN } from "../../../graphql/questionnaire/query";
import { GET_ANTWORTEN_BY_FRAGE } from "../../../graphql/answer/query";
import { saveAllAntworten } from "@/utils/saveAllAntworten";

export default function TestDurchfuehrenPage() {
  const searchParams = useSearchParams();
  const fragebogenId = searchParams.get("fragebogenId");
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [antwortenMap, setAntwortenMap] = useState<Record<string, any[]>>({});
  const [antworten, setAntworten] = useState<
    { frageId: string; antwortIds: string[] }[]
  >([]);

  const { data: session } = useSession();
  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );

  const { data, loading, error } = useQuery(GET_FRAGEN_BY_FRAGEBOGEN, {
    client,
    variables: { fragebogenId },
    skip: !fragebogenId,
  });

  const fragen = data?.getFragenByFragebogen || [];
  const currentFrage = fragen[index];

  const {
    data: antwortenData,
    loading: antwortenLoading,
    error: antwortenError,
  } = useQuery(GET_ANTWORTEN_BY_FRAGE, {
    client,
    variables: { frageId: currentFrage?.id },
    skip: !currentFrage?.id,
  });

  useEffect(() => {
    if (antwortenData && currentFrage) {
      setAntwortenMap((prev) => ({
        ...prev,
        [currentFrage.id]: antwortenData.getAnswersByQuestion,
      }));
    }
  }, [antwortenData, currentFrage]);

  const handleNext = async () => {
    if (index < fragen.length - 1) {
        setIndex(index + 1);
    } else {
      await saveAllAntworten(
        session?.user.id,
        fragebogenId!,
        session?.access_token,
        antworten
      );
      router.push(`/test/auswertung?user=${session?.user.id}&fragebogenId=${fragebogenId}`);
    }
  };

    if (loading || !currentFrage || antwortenLoading) return <CircularProgress />;
    
    if (error || antwortenError) {
      const e = error || antwortenError;
      console.error("❌ Fehler bei GraphQL:");
      console.error("➡️ name:", e?.name);
      console.error("➡️ message:", e?.message);
      console.error("➡️ graphQLErrors:", e?.graphQLErrors);
      console.error("➡️ networkError:", e?.networkError);
      try {
        console.error("➡️ JSON:", JSON.stringify(e, null, 2));
      } catch {
        console.error("⚠️ Fehler beim Serialisieren von error.");
      }
    }
        

  const antwortOptionen = antwortenMap[currentFrage.id] || [];

  const aktuelleAntwort = antworten.find((a) => a.frageId === currentFrage.id);

  return (
    <Box p={3} bgcolor="#F9F4EF" minHeight="100vh">
      <Typography variant="h6" fontWeight="bold" color="#4E342E" mb={2}>
        Frage {index + 1} von {fragen.length}
      </Typography>

      <Paper sx={{ p: 2, borderRadius: 3, mb: 2 }}>
        <Typography fontWeight="bold" mb={2} color="#4E342E">
          {currentFrage.text}
        </Typography>

        {currentFrage.typ === "FREITEXT" && (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Deine Antwort"
            variant="outlined"
          />
        )}

        {currentFrage.typ === "SINGLE_CHOICE" && (
          <RadioGroup
            value={aktuelleAntwort?.antwortIds[0] || ""}
            onChange={(e) => {
              const neu = {
                frageId: currentFrage.id,
                antwortIds: [e.target.value],
              };
              setAntworten((prev) => [
                ...prev.filter((a) => a.frageId !== currentFrage.id),
                neu,
              ]);
            }}
          >
            {antwortOptionen.map((opt) => (
              <FormControlLabel
                key={opt.id}
                value={opt.id}
                control={<Radio />}
                label={opt.antwort}
              />
            ))}
          </RadioGroup>
        )}

        {currentFrage.typ === "MULTIPLE_CHOICE" && (
          <Box>
            {antwortOptionen.map((opt) => (
              <FormControlLabel
                key={opt.id}
                control={
                  <Checkbox
                    checked={
                      aktuelleAntwort?.antwortIds.includes(opt.id) || false
                    }
                    onChange={(e) => {
                      const alt = aktuelleAntwort?.antwortIds || [];
                      const neuAntworten = e.target.checked
                        ? [...alt, opt.id]
                        : alt.filter((id) => id !== opt.id);
                      const neu = {
                        frageId: currentFrage.id,
                        antwortIds: neuAntworten,
                      };
                      setAntworten((prev) => [
                        ...prev.filter((a) => a.frageId !== currentFrage.id),
                        neu,
                      ]);
                    }}
                  />
                }
                label={opt.antwort}
              />
            ))}
          </Box>
        )}
      </Paper>

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ bgcolor: "#D88C60", color: "white", borderRadius: 2 }}
      >
        {index < fragen.length - 1 ? "Weiter" : "Abschließen"}
      </Button>
    </Box>
  );
}
