# Use an official Node.js image as the base
FROM node:22.11.0 AS build

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Second stage: Nginx
FROM nginx:stable-alpine

# Copy the built application from the first stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
