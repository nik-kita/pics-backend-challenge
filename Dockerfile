FROM node:lts-alpine

ARG PORT=3000
ENV PORT=$PORT

COPY . .

RUN npm i
RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
