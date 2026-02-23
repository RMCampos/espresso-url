# 1. Base Stage
FROM node:22-slim AS base
ENV DIR=/usr/src/app
WORKDIR $DIR
# Prisma needs openssl and ca-certificates
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# 2. Dependencies Stage (The "Classpath" setup)
FROM base AS deps
COPY package*.json ./
COPY prisma ./prisma/
# Install ALL deps (needed for build) and generate Prisma Client
RUN npm ci && npx prisma generate

# 3. Builder Stage
FROM base AS builder
COPY --from=deps $DIR/node_modules ./node_modules
# Copy generated prisma files
COPY --from=deps $DIR/prisma-generated ./prisma-generated
COPY . .
RUN npm run build
# Remove devDeps now that build is done
RUN npm prune --omit=dev

# 4. Production Stage (The "Runtime")
FROM base AS production
ARG BUILD_VERSION
ENV BUILD_VERSION=${BUILD_VERSION}
ENV NODE_ENV=production
USER node

# Copy only what's strictly necessary for the JVM-like runtime
COPY healthcheck.js ./
COPY --from=builder --chown=node:node $DIR/node_modules ./node_modules
COPY --from=builder --chown=node:node $DIR/dist ./dist
COPY --from=builder --chown=node:node $DIR/prisma-generated ./prisma-generated
COPY --from=builder --chown=node:node $DIR/package.json ./package.json

EXPOSE 3000

# Using 'node' directly is faster/lighter than 'npm run start'
CMD ["node", "dist/main.js"]
