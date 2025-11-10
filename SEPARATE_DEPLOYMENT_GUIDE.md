# Separate Frontend & Backend Deployment Guide

## Overview
This guide explains how to deploy your React frontend and Node.js backend separately on Vercel, with Cloudinary for file uploads.

## Architecture
- **Frontend**: React app deployed on Vercel
- **Backend**: Node.js API deployed on Vercel
- **File Storage**: Cloudinary for production, local storage for development
- **Database**: MongoDB Atlas

## Step 1: Set Up Cloudinary

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Cloudinary dashboard
3. Add to your `.env` file:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   USE_CLOUDINARY=true
   ```

## Step 2: Deploy Backend First

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
vercel --local-config vercel.backend.json --prod
```

### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Create new project
3. Import your GitHub repository
4. Configure:
   - Framework: Node.js
   - Root Directory: `./`
   - Override configuration: Upload `vercel.backend.json`

### Set Backend Environment Variables in Vercel:
```
NODE_ENV=production
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/sihs
JWT_SECRET=your-jwt-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
USE_CLOUDINARY=true
```

## Step 3: Deploy Frontend

### Update Frontend API URL
Before deploying frontend, update your frontend to point to the deployed backend:

```bash
# In your .env file
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
```

### Deploy Frontend
```bash
# Deploy frontend
vercel --local-config vercel.frontend.json --prod
```

### Set Frontend Environment Variables in Vercel:
```
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
```

## Step 4: Update CORS Configuration

Update your backend's CORS settings to allow your frontend domain:

```javascript
// In src/server/index.js
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true 
}));
```

## File Upload Behavior

### Development (Local)
- Files stored locally in `/uploads` directory
- Accessible via `/uploads/folder/filename`

### Production (Vercel + Cloudinary)
- Files automatically uploaded to Cloudinary
- Cloudinary URLs stored in database
- No local file storage on Vercel

## Testing File Uploads

### Test Cloudinary Integration
```bash
# Start your backend locally with Cloudinary
USE_CLOUDINARY=true npm run server

# Test upload via API
curl -X POST http://localhost:5000/api/downloads \
  -F "file=@test.pdf" \
  -F "title=Test File" \
  -F "description=Test upload"
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check CORS configuration in backend

2. **File Upload Failures**
   - Verify Cloudinary credentials
   - Check file size limits (5MB for images, 10MB for documents)

3. **Database Connection Issues**
   - Ensure MongoDB Atlas allows connections from anywhere
   - Verify `MONGO_DB_URL` format

4. **Environment Variables Not Working**
   - Restart your Vercel deployment after adding variables
   - Check variable names match exactly

### File Types Supported
- **Images**: jpg, jpeg, png, gif, webp
- **Documents**: pdf, doc, docx, xls, xlsx
- **Max Sizes**: 2MB (logos), 5MB (images/notifications), 10MB (documents)

## Deployment Commands Summary

```bash
# Deploy backend only
./deploy-backend.sh

# Deploy frontend only  
./deploy-frontend.sh

# Deploy both (run in sequence)
./deploy-backend.sh && ./deploy-frontend.sh
```

## Monitoring

- Check Vercel dashboard for deployment logs
- Monitor Cloudinary dashboard for upload statistics
- Use MongoDB Atlas for database monitoring

## Security Notes

- Never commit `.env` files to GitHub
- Use strong JWT secrets
- Configure Cloudinary upload presets for security
- Set up proper CORS origins in production