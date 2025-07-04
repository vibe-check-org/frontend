import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query FindById($id: String!) {
    findById(id: $id) {
      id
        vorname
        nachname
        email
        geburtsdatum
        profilbildUrl
        rolle
        erstelltAm
        aktualisiertAm
        name
        adressen {
            id
            strasse
            plz
            ort
            land
        }
        profile {
            id
            userId
            erstelltAm
            skills {
                kategorie
                punkte
            }
        }
    }
}
`;