FROM node:latest
WORKDIR /App 
ENV PORT=4000
COPY package.json ./
COPY . ./
RUN npm install 
CMD ["npm", "run", "start"]