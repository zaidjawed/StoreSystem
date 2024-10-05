FROM node:18-slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ENV VITE_SERVER_URL=http://localhost:8000
ENV VITE_STORE_ID=0

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
