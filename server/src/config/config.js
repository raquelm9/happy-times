export const config = {
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/happy-times",
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3001",
  PORT: process.env.PORT || 3001,
  APP_NAME: "happy-times",
};
