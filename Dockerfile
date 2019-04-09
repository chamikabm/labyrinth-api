FROM node:8.11.1

WORKDIR '/app'

# Ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "serve"]

