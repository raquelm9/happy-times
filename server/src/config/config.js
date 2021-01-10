export const config = {
  // Server configuration
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3001",
  PORT: process.env.PORT || 3001,
  APP_NAME: "happy-times",

  // Database configuration
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/happy-times",

  //Cloudinary configuration
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
