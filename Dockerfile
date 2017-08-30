FROM node:8.4.0
RUN mkdir /app

RUN npm install nodemon -g

WORKDIR /app
ADD app/package.json /app/package.json
RUN npm install

EXPOSE 3000

CMD npm start
