# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# ARG NODE_VERSION=18.12.1

# FROM node:${NODE_VERSION}-alpine

FROM node:lts-alpine
ARG WORK_DIR=/usr/src/app/backend
# Use production node environment by default.
ENV NODE_ENV production


WORKDIR $WORK_DIR

# Copy the rest of the source files into the image.
COPY . .



# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN npm ci --omit=dev

# Change ownership of files
RUN chown -R node:1000 $WORK_DIR/logs
RUN chown node:1000 $WORK_DIR/node_modules

# Run the application as a non-root user.
USER node


# Expose the port that the application listens on.
EXPOSE 8080

# Run the application.
CMD npm run server
