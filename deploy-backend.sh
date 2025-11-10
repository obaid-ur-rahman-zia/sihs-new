#!/bin/bash

# Backend Deployment Script
echo "🚀 Deploying Backend to Vercel..."

# Deploy backend with backend configuration
vercel --local-config vercel.backend.json --prod

echo "✅ Backend deployment complete!"
echo "🔧 Backend API URL: $BACKEND_URL"