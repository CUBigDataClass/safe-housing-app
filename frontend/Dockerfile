FROM node:13.12.0-alpine as build
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
EXPOSE 3000
COPY . ./
RUN npm start