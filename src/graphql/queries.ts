import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    frageboegen {
      id
      titel
      beschreibung
    }
    meinScore {
      kategorie
      wert
    }
  }
`;
