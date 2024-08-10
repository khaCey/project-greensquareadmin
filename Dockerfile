# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18.20.3

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json yarn.lock ./

# Install dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . .

# Set the environment to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 90

# Run the web service on container startup.
CMD [ "yarn", "start" ]
