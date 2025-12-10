# Multi-stage build for Node.js backend with Prisma
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript if tsconfig exists
RUN if [ -f "tsconfig.json" ]; then \
      echo "Building TypeScript..."; \
      npm run build; \
    else \
      echo "No TypeScript build configured, using source files"; \
    fi

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma schema
COPY --from=builder /app/prisma ./prisma/

# Copy Prisma generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy source files (always needed as fallback)
COPY --from=builder /app/src ./src/

# Copy built files if they exist (TypeScript projects)
RUN --mount=type=bind,from=builder,source=/app/dist,target=/tmp/dist \
    if [ -d "/tmp/dist" ]; then \
      cp -r /tmp/dist /app/dist; \
      echo "TypeScript build copied"; \
    else \
      echo "No TypeScript build, will use source files"; \
    fi

# Generate Prisma client in production
RUN npx prisma generate

# Expose port
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Create entrypoint script for migrations
RUN echo '#!/bin/sh' > /app/docker-entrypoint.sh && \
    echo 'set -e' >> /app/docker-entrypoint.sh && \
    echo 'echo "Running Prisma migrations..."' >> /app/docker-entrypoint.sh && \
    echo 'npx prisma migrate deploy' >> /app/docker-entrypoint.sh && \
    echo 'echo "Starting application..."' >> /app/docker-entrypoint.sh && \
    echo 'exec "$@"' >> /app/docker-entrypoint.sh && \
    chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start the application (prioritize dist/index.js if exists, fallback to src/index.js)
CMD ["sh", "-c", "if [ -f dist/index.js ]; then node dist/index.js; else node src/index.js; fi"]
