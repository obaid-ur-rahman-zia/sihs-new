import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engines for different file types
const createStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `sihs/${folder}`,
      allowed_formats: allowedFormats,
      transformation: folder === 'logos' 
        ? [{ width: 500, height: 500, crop: 'limit' }] 
        : [{ width: 1200, height: 800, crop: 'limit' }],
    },
  });
};

// Multer configurations for different upload types
export const uploadEvent = multer({
  storage: createStorage('events'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const downloadFile = multer({
  storage: createStorage('downloads', ['pdf', 'doc', 'docx', 'xls', 'xlsx']),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadLogo = multer({
  storage: createStorage('logos'),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

export const uploadNotification = multer({
  storage: createStorage('notifications', ['pdf', 'jpg', 'jpeg', 'png']),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const uploadResearch = multer({
  storage: createStorage('research', ['pdf', 'doc', 'docx']),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Utility function to delete files from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Utility function to get file URL
export const getCloudinaryUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, options);
};

export default cloudinary;