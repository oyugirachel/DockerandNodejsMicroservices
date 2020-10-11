# Filename: Dockerfile
FROM node:10-alpine


# Create app directory
WORKDIR /usr/src/app

# Install dependencies and modules
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .

# Expose port 3000 to the outside once the container has launched
EXPOSE 3000   

# Command to run the app when docker image is launching
CMD [ "npm", "start" ]
