#!/bin/bash
echo "Starting Career Compass AI..."

# 1. Start the Express Backend on strict port 5001
echo "--> Initializing Backend Server..."
cd server
export PORT=5001
npm install
npx prisma generate
node index.js &

# Give backend a second to boot up
sleep 2

# 2. Start the Next.js Frontend on port 5000
echo "--> Initializing Frontend Server..."
cd ../client
export BACKEND_URL=http://localhost:5001
npm install
npm run dev -- -p 5000 -H 0.0.0.0
