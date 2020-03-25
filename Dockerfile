FROM ubuntu:18.04

RUN apt-get update
RUN apt-get -y install nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3212

ENTRYPOINT ["node"]

CMD ["server.js"]