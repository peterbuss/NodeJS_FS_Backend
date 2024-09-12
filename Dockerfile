FROM node:22

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3001

# ENV port=3001

# docker run --env-file env.list

# doing env differend

CMD ["node", "server"]


