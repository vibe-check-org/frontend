# syntax=docker/dockerfile:1.10.0
ARG NODE_VERSION=23.10.0

# ---------------------------------------------------------------------------------------
# S t a g e   d i s t
# ---------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS dist

RUN <<EOF
set -eux
apt-get update
apt-get upgrade --yes

# Installiere curl im Container
apt-get install --no-install-recommends --yes curl

npm i -g --no-audit --no-fund npm
EOF

USER node

WORKDIR /home/node

COPY --chown=node:node .env ./

COPY public ./public
COPY src ./src

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
    --mount=type=cache,target=/root/.npm <<EOF
set -eux
npm ci --no-audit --no-fund
npm run build
EOF

# ------------------------------------------------------------------------------
# S t a g e   d e p e n d e n c i e s
# ------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS dependencies

RUN <<EOF
set -eux
apt-get update
apt-get upgrade --yes

npm i -g --no-audit --no-fund npm
EOF

USER node

WORKDIR /home/node

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm <<EOF
set -eux
npm ci --no-audit --no-fund --omit=peer
EOF

# ------------------------------------------------------------------------------
# S t a g e   f i n a l
# ------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-bookworm-slim AS final
LABEL org.opencontainers.image.title="omnixys-ui" \
      org.opencontainers.image.description="OmnixysSphere Frontend (Next.js + MUI)" \
      org.opencontainers.image.version="2025.06.12" \
      org.opencontainers.image.licenses="GPL-3.0-or-later" \
      org.opencontainers.image.authors="caleb.gyamfi@omnixys.com"

RUN <<EOF
set -eux
apt-get update

# Installiere dumb-init
apt-get install --no-install-recommends --yes dumb-init=1.2.5-2

# Bereinige temporäre Dateien und Caches
apt-get autoremove --yes
apt-get clean --yes
rm -rf /var/lib/apt/lists/*
rm -rf /tmp/*
EOF

WORKDIR /opt/app

USER node

COPY --chown=node:node package.json ./
COPY --from=dependencies --chown=node:node /home/node/node_modules ./node_modules
COPY --from=dist --chown=node:node /home/node/public ./public
COPY --from=dist --chown=node:node /home/node/.next ./.next

EXPOSE 3000

# Setze EntryPoint für den Container
ENTRYPOINT ["dumb-init"]
CMD ["npm", "start"]
