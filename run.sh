#!/bin/bash

# Qubic Smart Contract Studio - Quick Start Script

echo "🚀 Starting Qubic Smart Contract Studio..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
fi

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose up --build -d

echo ""
echo "✅ Qubic Smart Contract Studio is running!"
echo ""
echo "📍 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "🛑 To stop the application, run: docker-compose down"
echo "📊 To view logs, run: docker-compose logs -f"
echo ""
echo "🎉 Happy coding with Qubic!"
