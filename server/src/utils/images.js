import fs from "fs";
import { config } from "../config/config.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

class ImageUploader {
  upload(data) {
    throw new Error("Not yet implemented");
  }

  isBase64(imageData) {
    return imageData.includes("base64");
  }
}

export class CloudinaryImageUploader extends ImageUploader {
  constructor() {
    super();
  }

  upload(data) {
    if (!this.isBase64(data)) return data;

    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(data, {}, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const imageUrl = result.secure_url;
          console.warn("HERE", imageUrl);
          resolve(imageUrl);
        }
      });
    });

    return uploadPromise;
  }
}

export class FileSystemImageUploader extends ImageUploader {
  constructor() {
    super();
  }

  createFolderIfDoesntExist(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  upload(data) {
    if (!this.isBase64(data)) return data;

    try {
      const extension = "png";
      const imageData = data.replace(/^data:image\/.*;base64,/, "");
      const imageName = new Date().toISOString();
      const imagePath = `/uploads/${imageName}.${extension}`;

      this.createFolderIfDoesntExist("./uploads");

      fs.writeFile("." + imagePath, imageData, "base64", function (err) {
        console.log(err);
      });
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(`${config.SERVER_URL}${imagePath}`);
  }
}
