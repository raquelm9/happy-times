import fs from "fs";

export const createFolderIfDoesntExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

/**
 * @param {string} data
 */
export const saveBase64Image = (data) => {
  if (!isBase64(data)) return data;

  const extension = "png";
  const imageData = data.replace(/^data:image\/.*;base64,/, "");
  const imageName = new Date().toISOString();
  const imagePath = `/uploads/${imageName}.${extension}`;

  createFolderIfDoesntExist("./uploads");

  fs.writeFile("." + imagePath, imageData, "base64", function (err) {
    console.log(err);
  });

  return `http://localhost:3001${imagePath}`;
};

export const isBase64 = (imageData) => {
  return imageData.includes("base64");
};
