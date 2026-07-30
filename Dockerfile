FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
# Version comes from the "packageManager" field in package.json, so the image
# and local installs always agree. Pinning also keeps builds reproducible.
RUN corepack enable

# ---- deps: install node_modules from the lockfile only ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---- builder: produce .next/standalone ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# git does not track empty directories, so public/ may be absent in a fresh
# checkout. Create it here to keep the runner's COPY valid either way.
RUN mkdir -p public && pnpm build

# ---- runner: minimal runtime image ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# server.js does not bundle public/ or .next/static — copy them in explicitly.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Monitor history is written here at runtime; owned by the app user so a
# named volume or bind mount stays writable.
RUN mkdir -p /data && chown -R nextjs:nodejs /data

USER nextjs

# Read by lib/config/load.ts and lib/monitor/store.ts respectively.
ENV CONFIG_PATH=/config/config.yaml
ENV DATA_DIR=/data

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]
