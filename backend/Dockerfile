# # Base image
# FROM node:22-alpine AS base
# WORKDIR /usr/src/app
# # Need openssl for Prisma
# RUN apk add --no-cache openssl

# # Dependencies
# FROM base AS dependencies
# COPY package.json package-lock.json ./
# # Install all dependencies (including devDependencies for build)
# RUN npm ci

# # Builder
# FROM base AS builder
# # Copy dependencies
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# # Copy source code and Prisma schema
# COPY . .
# # Generate Prisma Client
# RUN npx prisma generate
# # Build the application
# RUN npm run build
# # Copy generated Prisma Client to dist since nest build ignores non-TS files
# RUN cp -r src/generated dist/generated
# # Prune devDependencies to keep the production image small
# RUN npm prune --omit=dev

# # Production
# FROM base AS production
# ENV NODE_ENV=production
# # Copy only necessary files
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/prisma ./prisma
# COPY --from=builder /usr/src/app/package.json ./package.json

# EXPOSE 3000

# # Start the application
# CMD ["npm", "run", "start:prod"]
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
