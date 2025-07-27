#!/bin/bash

# Kill any process running on port 3000
echo "Checking for processes on port 3000..."
PID=$(lsof -ti:3000)
if [ ! -z "$PID" ]; then
    echo "Killing process $PID on port 3000..."
    kill -9 $PID
    sleep 1
fi

# Start the development server
echo "Starting development server on port 3000..."
next dev --port 3000