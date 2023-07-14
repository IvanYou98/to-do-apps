# Specify the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project code to the working directory
COPY . .

# Expose the port on which your Node.js application listens
EXPOSE 3000
EXPOSE 27017

RUN apt-get update && apt-get install -y mongodb
RUN service mongodb start

# Define the command to start your Node.js application
CMD [ "node", "index.js" ]
