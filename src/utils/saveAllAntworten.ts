import { gql } from "@apollo/client";
import getApolloClient from "@/lib/apolloClient";

export type AntwortEintrag = {
    frageId: string;
    antwortIds: string[];
};

const SAVE_ANTWORT_MUTATION = gql`
  mutation SaveAntwort($input: CreateAntwortInput!) {
    saveAntwort(input: $input) {
      id
    }
  }
`;

export async function saveAllAntworten(
    userId: string | undefined,
    fragebogenId: string,
    token: string | undefined,
    antworten: AntwortEintrag[]
) {
    const client = getApolloClient(token);

    for (const eintrag of antworten) {
        console.log('eintrag: ', eintrag)
        for (const antwortId of eintrag.antwortIds) {
            console.log('antwortId: ', antwortId)
            try {
                await client.mutate({
                    mutation: SAVE_ANTWORT_MUTATION,
                    variables: {
                        input: {
                            userId,
                            fragebogenId,
                            frageId: eintrag.frageId,
                            antwort: antwortId,
                        },
                    },
                });
            } catch (err) {
                console.error("❌ Fehler beim Speichern der Antwort:", err);
            }
        }
    }
}
