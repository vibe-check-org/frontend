"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Typography,
  CircularProgress,
  Paper,
  LinearProgress,
  Container,
  Button,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import getApolloClient from "@/lib/apolloClient";
import jsPDF from "jspdf";

import {
  GET_PUNKTE_BY_IDS,
  GET_USER_ANTWORTEN,
} from "../../../graphql/answer/query";
import {
  GET_KATEGORIE_BY_FRAGE,
  GetFragenByFragebogen,
} from "../../../graphql/questionnaire/query";

export default function AuswertungPage() {
  const searchParams = useSearchParams();
  const fragebogenId = searchParams.get("fragebogenId");
  const userId = searchParams.get("user");

  const { data: session } = useSession();
  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session?.access_token]
  );

  const { data: fragenData } = useQuery(GetFragenByFragebogen, {
    client,
    variables: { id: fragebogenId },
    skip: !fragebogenId || !userId,
  });

  const {
    data: antwortenData,
    loading: loadingAntworten,
    error: errorAntworten,
  } = useQuery(GET_USER_ANTWORTEN, {
    client,
    variables: { fragebogenId, userId },
    skip: !fragebogenId || !userId,
  });

  const antworten = antwortenData?.getAnswersByFragebogenAndUser ?? [];

  // Extrahiere und bereinige Antwort-IDs (UUIDs)
  const antwortIds = useMemo(() => {
    return antworten
      .flatMap((a) => {
        if (Array.isArray(a.antwort)) return a.antwort;
        if (typeof a.antwort === "string") {
          return a.antwort
            .replace(/[{}"]/g, "")
            .split(/[;,]/)
            .map((id) => id.trim());
        }
        return [];
      })
      .filter((id) => /^[0-9a-fA-F-]{36}$/.test(id));
  }, [antworten]);

  const frageIds = useMemo(() => antworten.map((a) => a.frageId), [antworten]);

  const {
    data: punkteData,
    loading: loadingPunkte,
    error: errorPunkte,
  } = useQuery(GET_PUNKTE_BY_IDS, {
    client,
    variables: { antwortIds },
    skip: antwortIds.length === 0,
  });

  const { data: kategorienData, error: kategorieError } = useQuery(
    GET_KATEGORIE_BY_FRAGE,
    {
      client,
      variables: { frageIds },
      skip: frageIds.length === 0,
    }
  );

  // Kategorienamen nach Kategorie-ID
  const kategorieNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const kat of kategorienData?.getKategorienByFrageIds ?? []) {
      map[kat.id] = kat.name;
    }
    return map;
  }, [kategorienData]);

  // Punkte pro Antwort-ID
  const punkteMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const t of punkteData?.getAnswerTemplatesAnwersByIds ?? []) {
      map[t.id] = t.punkte ?? 0;
    }
    return map;
  }, [punkteData]);

  // Zuordnung Frage-ID → Kategorie-ID
  const frageIdToKategorieId = useMemo(() => {
    const map: Record<string, string> = {};
    for (const frage of fragenData?.getFragenByFragebogen ?? []) {
      if (frage.kategorie?.id) {
        map[frage.id] = frage.kategorie.id;
      }
    }
    return map;
  }, [fragenData]);

  // Punkte pro Kategorie berechnen
  const kategorieScores = useMemo(() => {
    const map: Record<string, number> = {};
    const bekannteKategorieIds = new Set(
      kategorienData?.getKategorienByFrageIds.map((k) => k.id) ?? []
    );

    for (const a of antworten) {
      const antwortId = Array.isArray(a.antwort) ? a.antwort[0] : a.antwort;
      const punkte = punkteMap[antwortId] ?? 0;

      const frageKatId = frageIdToKategorieId[a.frageId];
      const kategorieName = kategorieNameMap[frageKatId];

      if (
        !frageKatId ||
        !kategorieName ||
        !bekannteKategorieIds.has(frageKatId)
      )
        continue;

      map[kategorieName] = (map[kategorieName] ?? 0) + punkte;
    }

    return map;
  }, [
    antworten,
    punkteMap,
    frageIdToKategorieId,
    kategorieNameMap,
    kategorienData,
  ]);

  const totalScore = useMemo(
    () => Object.values(kategorieScores).reduce((acc, val) => acc + val, 0),
    [kategorieScores]
  );

  const handlePdfExport = () => {
    const doc = new jsPDF();
    doc.text("VibeCheck Auswertung", 20, 20);
    doc.text(`Gesamtpunktzahl: ${totalScore.toFixed(2)}`, 20, 30);
    Object.entries(kategorieScores).forEach(([kat, punkte], i) => {
      doc.text(`${kat}: ${punkte.toFixed(2)} Punkte`, 20, 40 + i * 10);
    });
    doc.save("auswertung.pdf");
  };

  if (loadingAntworten || loadingPunkte) return <CircularProgress />;

  if (errorAntworten || errorPunkte || kategorieError) {
    const e = errorPunkte || errorAntworten || kategorieError;
    console.error("❌ Fehler bei GraphQL:", e);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" mt={4} mb={2}>
        Auswertung
      </Typography>

      <Paper sx={{ p: 2, my: 2 }}>
        <Typography variant="h6">Gesamtpunktzahl</Typography>
        <Typography>{totalScore.toFixed(2)} Punkte</Typography>
      </Paper>

      {Object.entries(kategorieScores).map(([kat, punkte]) => (
        <Paper key={kat} sx={{ p: 2, mb: 2 }}>
          <Typography fontWeight="bold">{kat}</Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(punkte * 20, 100)}
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
          <Typography variant="caption" display="block" textAlign="right">
            {punkte.toFixed(2)} Punkte
          </Typography>
        </Paper>
      ))}

      <Button
        variant="contained"
        onClick={handlePdfExport}
        sx={{ bgcolor: "#D88C60", color: "white" }}
      >
        PDF herunterladen
      </Button>
    </Container>
  );
}
