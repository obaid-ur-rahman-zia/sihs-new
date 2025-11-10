# Vercel Deployment Guide

## Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)
- Environment variables configured

## Deployment Steps

### 1. Push to GitHub
First, push your code to a GitHub repository:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and configure your project
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Node.js
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

### 3. Configure Environment Variables
In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add the following variables from your `.env` file:
   - `MONGO_DB_URL` (use MongoDB Atlas connection string)
   - `JWT_SECRET` (generate a secure random string)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` (for email functionality)
   - `FRONTEND_URL` (your frontend domain)
   - `NODE_ENV=production`

### 4. Update Frontend Configuration
Update your React app's API URL to point to your Vercel backend:
```
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
```

### 5. Test Your Deployment
- Backend API: `https://your-backend-domain.vercel.app/api/health`
- Check your server logs in Vercel dashboard
- Test API endpoints using Postman or curl

## Important Notes

1. **File Uploads**: Vercel has a read-only filesystem. For file uploads, consider using:
   - Cloudinary for images
   - AWS S3 for documents
   - Or switch to a platform with persistent storage

2. **Database**: Use MongoDB Atlas for production database hosting

3. **CORS**: Update CORS configuration in your backend to allow your frontend domain

4. **Environment Variables**: Never commit sensitive data to GitHub

## Troubleshooting

- Check Vercel deployment logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Test API endpoints individually

## Current Configuration
Your project is configured with:
- ✅ `vercel.json` for deployment settings
- ✅ Serverless-ready server configuration
- ✅ Environment variables template
- ✅ API routing configured