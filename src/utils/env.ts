/**
 * Konstante `ENV`:
 * Enthält alle relevanten Umgebungsvariablen mit Standardwerten,
 * falls die Variablen nicht definiert sind.
 */
export const KEYCLOAK_ENV = {
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID:
    process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? 'N/A',

  NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET ?? 'N/A',

  NEXT_PUBLIC_KEYCLOAK_ISSUER: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER ?? 'N/A',
};

export const APP_ENV = {
  NEXT_PUBLIC_BACKEND_SERVER_URL:
    process.env.NEXT_PUBLIC_BACKEND_SERVER_URL ?? 'N/A',
};

export const ENV = {
  DEFAULT_ROUTE: process.env.NEXT_PUBLIC_DEFAULT_ROUTE ?? '/',

  NODE_TLS_REJECT_UNAUTHORIZED:
    process.env.NODE_TLS_REJECT_UNAUTHORIZED ?? 'N/A', // Überprüfung von TLS-Zertifikaten
  // Keycloak-Client-ID
  // Keycloak-Client-Secret
  // Keycloak-Issuer-URL
  // Backend-Server-URL
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? 'N/A', // NextAuth-Secret für Token-Validierung
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'N/A', // NextAuth-Basis-URL
  NEXTAUTH_DEBUG: process.env.NEXTAUTH_DEBUG ?? 'N/A', // Debug-Modus für NextAuth
  NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'info', // Log-Level
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? 'N/A', // Aktive Umgebung (z. B. production, development)
  NEXT_PUBLIC_PINO_PRETTY: process.env.NEXT_PUBLIC_PINO_PRETTY ?? 'true', // Aktiviert Pretty Print für Logs
  NEXT_PUBLIC_LOG_DIR: process.env.NEXT_PUBLIC_LOG_DIR ?? 'logs', // Log-Verzeichnis

  NOTIFICATION_UPDATE_INTERVAL:
    process.env.NOTIFICATION_UPDATE_INTERVAL ?? '86400000',
  ADMIN_GROUP: process.env.NEXT_PUBLIC_ADMIN_GROUP ?? 'Identity',
};
