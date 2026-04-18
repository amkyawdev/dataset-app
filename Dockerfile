# Chat Bot Dataset Collector - Dockerfile
# This Dockerfile builds a Next.js app for HuggingFace Spaces

# Use Node.js 18 base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]