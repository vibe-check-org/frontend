import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      vorname
      nachname
      email
      geburtsdatum
      profilbildUrl
      rolle
      erstelltAm
      aktualisiertAm
      profile {
        id
        userId
        erstelltAm
        skills {
          kategorie
          punkte
        }
      }
      adressen {
        id
        strasse
        plz
        ort
        land
      }
    }
  }
`;
