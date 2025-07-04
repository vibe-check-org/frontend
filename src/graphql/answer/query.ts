
import { gql } from '@apollo/client';

export const GET_ANTWORTEN_BY_FRAGE = gql`
  query GetAnswersByQuestion($frageId: String!) {
    getAnswersByQuestion(frageId: $frageId) {
      id
      antwort
      punkte
    }
  }
`;

import getApolloClient from '../lib/apolloClient';
import { useAnswerStore } from '../app/store/answerStore';

export const SAVE_ANTWORT = gql`
  mutation SaveAntwort($input: CreateAntwortInput!) {
    saveAntwort(input: $input) {
      id
    }
  }
`;


export const GET_USER_ANTWORTEN = gql`
  query GetAntworten($fragebogenId: String!, $userId: String!) {
    getAnswersByFragebogenAndUser(
      fragebogenId: $fragebogenId
      userId: $userId
    ) {
      antwort
      frageId
    }
  }
`;

export const GET_PUNKTE_BY_IDS = gql`
  query GetAnswerTemplatesAnwersByIds($antwortIds: [String!]!) {
    getAnswerTemplatesAnwersByIds(antwortIds: $antwortIds) {
      id
      punkte
    }
  }
`;
