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

# Define the command to start your Node.js application
CMD [ "node", "index.js" ]
