FROM node:latest
ENV PORT=4001
WORKDIR /App 
COPY package.json ./
COPY . ./
RUN npm install 
CMD ["npm", "run", "start"]