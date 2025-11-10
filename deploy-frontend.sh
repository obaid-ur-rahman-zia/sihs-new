#!/bin/bash

# Frontend Deployment Script
echo "🚀 Deploying Frontend to Vercel..."

# Set environment variables for frontend
export REACT_APP_API_URL=$BACKEND_URL

# Deploy frontend with frontend configuration
vercel --local-config vercel.frontend.json --prod

echo "✅ Frontend deployment complete!"
echo "🌐 Frontend URL: $FRONTEND_URL"