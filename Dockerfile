# Stage 1: Build
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Define build-time arguments
ARG REACT_APP_API_ENDPOINT
ARG REACT_APP_API_BASE_ENDPOINT
ARG REACT_APP_API_PATH
ARG REACT_APP_API_VERSION
ARG REACT_APP_API_PUBLIC

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the app files
COPY . .

# Set environment variables for the build
ENV REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT}
ENV REACT_APP_API_BASE_ENDPOINT=${REACT_APP_API_BASE_ENDPOINT}
ENV REACT_APP_API_PATH=${REACT_APP_API_PATH}
ENV REACT_APP_API_VERSION=${REACT_APP_API_VERSION}
ENV REACT_APP_API_PUBLIC=${REACT_APP_API_PUBLIC}

# Build the app
RUN yarn build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy the build files from the builder stage
COPY --from=builder /app/build /app/build

# Install serve globally
RUN npm install -g serve

# Expose port 8081
EXPOSE 8081

# Serve the build files
CMD ["serve", "-s", "build", "-l", "8081"]