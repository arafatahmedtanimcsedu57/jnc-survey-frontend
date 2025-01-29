# Stage 1: Build
FROM node:18.18.0-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker's cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Define build-time argument for the environment
ARG BUILD_ENV=production

# Set environment variables based on the build environment
# Assuming you have different environment files like .env.production, .env.staging, etc.
RUN cp .env.$BUILD_ENV .env

# Build the application based on the environment
RUN if [ "$BUILD_ENV" = "staging" ]; then \
      yarn run build:staging; \
    else \
      yarn run build; \
    fi

# Stage 2: Production
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static resources
RUN rm -rf ./*

# Copy the build output from the builder stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
