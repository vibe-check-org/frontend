import { gql } from '@apollo/client';

export const GET_ALL_KATEGORIEN = gql`
query GetAllKategorien {
    getAllKategorien {
        id
        name
        beschreibung
    }
}`;
  
export const GET_FRAGEBOEGEN_BY_KATEGORIE = gql`
  query GetFragebogenByCategory($kategorieId: ID!) {
    getFragebogenByCategory(kategorieId: $kategorieId) {
        id
        titel
    }
  }`;

export const GET_FRAGEN_BY_FRAGEBOGEN = gql`
query GetFragenByFragebogen($fragebogenId: ID!) {
    getFragenByFragebogen(fragebogenId: $fragebogenId) {
        id
        text
        typ
    }
}`;

export const GET_KATEGORIE_BY_FRAGE = gql`
query GetKategorieByFrageId($frageIds: [ID!]!) {
    getKategorienByFrageIds(frageIds: $frageIds) {
        id
        name
        beschreibung
    }
}`;


export const GetFragenByFragebogen = gql`
query GetFragenByFragebogen($id: ID!) {
    getFragenByFragebogen(fragebogenId: $id) {
        id
        text
        typ
        kategorie {
            id
            name
            beschreibung
        }
    }
}`;
