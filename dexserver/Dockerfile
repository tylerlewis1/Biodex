# Use a slim Node image as the base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (better Docker layer caching -
# dependencies only reinstall when these files change)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript to JavaScript (skip this line if you're not using TS)
RUN npm run build

# The port your Express app listens on inside the container
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]