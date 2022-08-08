FROM node:latest
WORKDIR /App 
ENV PORT=4002
COPY package.json ./
COPY . ./
RUN npm install 
CMD ["npm", "run", "start"]