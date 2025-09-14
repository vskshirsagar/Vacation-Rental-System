const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

//console.log("Cloudinary config:", process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         folder: 'wanderlust_DEV',
//        // allowed_formats: ["png", "jpg", "jpeg"], // ✅ CORRECT spelling
//     public_id: file.originalname.split('.')[0],
//     };
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:  (req, file) => {
    return {
      folder: 'wanderlust_DEV',
      public_id: file.originalname.split('.')[0],
    
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'));
  }
};



module.exports = {
    cloudinary,
    storage,
     fileFilter
};
