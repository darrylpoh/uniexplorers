FROM node:20.2-slim
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev netcat
RUN npm install
COPY . .
RUN chmod +x /app/migrate.sh
EXPOSE 8080
CMD ["node", "app.js"]