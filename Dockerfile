FROM node:14.15.0
WORKDIR /app
COPY . . 
RUN yarn install 
CMD  yarn start 
