import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// this will configure the coudinary to our application by the allowing us to upload files to cloudinary through the api key and api secret
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File is being uploaded in cloudinary", response.url);
    return response;
  } catch (error) {
    // remove the locally saved temporary files saved locally as the operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
