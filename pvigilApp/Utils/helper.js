import axios from "axios";
import { BASE_API_URL } from "./utils";

export const uploadImage = async (complaintImage, folderName) => {
  console.log("hitted upload frontend");
  const formData = new FormData();
  formData.append("image", {
    name: new Date().toISOString() + "_CImage",
    type: "image/jpeg", // Adjust the image type accordingly
    uri: complaintImage,
  });
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/media/uploadImage`,
      formData, // Send the FormData object directly
      {
        headers: {
          "Content-Type": "multipart/form-data", // No need for "Accept" header
        },
        params: {
          folderName: folderName, // Pass the folder name as a parameter
        },
      }
    );
    return response.data.imageUrl;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw error;
    // return;
  }
};

export const uploadVideo = async (video, folderName, onProgress) => {
  const formData = new FormData();
  formData.append("video", {
    name: new Date() + "_CVideo",
    uri: video, // Use the video URI here
    type: "video/mp4", // Adjust the MIME type accordingly
  });

  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/media/uploadVideo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          folderName: folderName,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress); // Update the progress in the component
        },
      }
    );
    return response.data.videoUrl;
  } catch (error) {
    console.error("Video upload failed:", error.message);
    throw error;
  }
};

export const validateLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/location/validate-location`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to validate location");
    }

    const data = await response.json();

    if (!data.isInsideCityLimits) {
      return {
        success: false,
        message: "Please use this app within the city limits.",
      };
    } else {
      return {
        success: true,
        wardNo: data.wardNo,
      };
    }
  } catch (error) {
    console.log("Error in location API:", error);
    throw error;
  }
};
