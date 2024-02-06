import axios from "axios";

const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));
const config = {
  headers: {
    Accept: "application/json",
  },
};

export const fetchEmailTemplateList = async () => {
  try {
    const result = await axios.get(
      `https://emailmarketing.queleadscrm.com/api/get-template`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const dailyEmailCount = async (data) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/email-counts-on-today`,
      data,
      config
    );
    console.log(result)
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const getEmailHistory = async (data, pageNumber) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/email-history?page=${pageNumber}`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const getEmailDetailsCount = async (data, pageNumber) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/email-history-details?page=${pageNumber}`,
      data,
      config
    );
    console.log(result);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleCurrentEmail = async (id) => {
  try {
    const result = await axios.get(
      `https://emailmarketing.queleadscrm.com/api/get-mail/${id}`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleAddSenderEmail = async (data) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/save-mail`,
      data,
      config
    );
    console.log(data);
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const deleteEmailSettings = async (data) =>{
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/delete-mail`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
}
export const handleUpdateSenderEmail = async (data, id) => {
  console.log(data);
  try {
    const result = await axios.put(
      `https://emailmarketing.queleadscrm.com/api/update-mail/${id}`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const sendEmail = async (data) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/send-mail`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const updateEmail = async (data) => {
  try {
    const result = await axios.put(
      `https://emailmarketing.queleadscrm.com/api/update-template`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const AddNewTemplateList = async (data) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/save-template`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleRemoveTemplate = async (id) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/delete-template`,
      { id },
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleImageUpload = (blobInfo, progress, failure) => {
  return new Promise((resolve, reject) => {
    if (blobInfo.blob().size > 200 * 1024) {
      reject("Image size exceeds 200kb");
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://emailmarketing.queleadscrm.com/api/upload-image",
      true
    );

    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());
    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
      if (progress && typeof progress === "function") {
        const percent = 0;
        progress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: "HTTP Error: " + xhr.status, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject("HTTP Error: " + xhr.status);
        return;
      }

      const json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != "string") {
        reject("Invalid JSON: " + xhr.responseText);
        return;
      }

      resolve(json.location);
    };

    xhr.onerror = () => {
      reject({ message: "Image upload failed", remove: true });
      if (failure && typeof failure === "function") {
        failure("Image upload failed");
      }
    };

    xhr.send(formData);
  });
};
export const handleGetAllImage = async () => {
  try {
    const result = await axios.get(
      `https://emailmarketing.queleadscrm.com/api/get-image`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
export const handleDeleteImage = async (data) => {
  try {
    const result = await axios.post(
      `https://emailmarketing.queleadscrm.com/api/delete-image`,
      data,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};
