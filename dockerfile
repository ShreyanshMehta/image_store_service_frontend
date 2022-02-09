FROM node:latest

WORKDIR /app

COPY . .

ENV REACT_APP_API_URL=http://localhost:4000

RUN npm install 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]