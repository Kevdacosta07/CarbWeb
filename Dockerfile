# Étape de build
FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_PUBLIC_PAGESPEED_API_KEY=AIzaSyDmp1c59Zbut7QKPztFw9pC-TCPyN1zjp4

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape de production
FROM node:20-alpine

WORKDIR /app

ENV NEXT_PUBLIC_PAGESPEED_API_KEY=AIzaSyDmp1c59Zbut7QKPztFw9pC-TCPyN1zjp4

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
