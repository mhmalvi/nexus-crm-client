import axios from "axios";
const authToken = JSON.parse(window.localStorage.getItem("auth_tok"));

export const handleFetchLocation = async (client_id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.get(
      `https://crmuser.queleadscrm.com/lead-api/${client_id}/location-color`,
      config
    );
    return result.data;
  } catch (error) {
    return error.response;
  }
};

export const handleAddLocation = async (client_id, location, color) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.post(
      `https://crmuser.queleadscrm.com/lead-api/add-lead-location-color`,
      {
        id: client_id,
        location: location,
        color: color,
      },
      config
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export const handleUpdateLocation = async (client_id, location, color) => {
  const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  try {
    const result = await axios.put(
      `https://crmuser.queleadscrm.com/lead-api/update-location-color`,
      {
        id: client_id,
        location: location,
        color: color,
      },
      config
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
