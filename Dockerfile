# Base image
FROM node:18 as builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY public ./public/

RUN npm ci --omit=dev

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start:prod"]