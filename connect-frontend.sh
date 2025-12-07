#!/bin/bash

# Quick setup to connect frontend to Railway backend

echo "🔗 Frontend to Railway Backend Setup"
echo "===================================="
echo ""

# Check if Railway backend URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./connect-frontend.sh <railway-backend-url>"
    echo ""
    echo "Example:"
    echo "  ./connect-frontend.sh https://qubic-hackathon-production.up.railway.app"
    echo ""
    echo "📍 Get your Railway backend URL from:"
    echo "   Railway Dashboard → Your Service → Settings → Public Networking"
    exit 1
fi

BACKEND_URL=$1

# Remove trailing slash if present
BACKEND_URL=${BACKEND_URL%/}

echo "🎯 Backend URL: $BACKEND_URL"
echo ""

# Create .env file in frontend directory
echo "📝 Creating frontend/.env..."
cat > frontend/.env << EOF
# Railway Backend URL
VITE_API_URL=$BACKEND_URL

# Generated on $(date)
EOF

echo "✅ Created frontend/.env"
echo ""

# Show what was created
echo "📋 Configuration:"
cat frontend/.env
echo ""

# Update backend CORS if needed
echo "⚠️  IMPORTANT: Update Railway backend environment variables:"
echo ""
echo "In Railway Dashboard → Variables, add/update:"
echo "  CORS_ORIGINS=http://localhost:3000,$BACKEND_URL"
echo ""

# Test connection
echo "🧪 Testing connection..."
if curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
    echo "✅ Backend is reachable!"
else
    echo "⚠️  Warning: Could not reach backend. Make sure it's deployed."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "1. cd frontend"
echo "2. npm install (if not done)"
echo "3. npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo "🎉 Your frontend will now use Railway backend!"
