import axios from "axios";

export const registerUser = async (credentials) => {
  try {
    const response = await axios.post("/register", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.response.data.msg;
    return Promise.reject(errorMessage);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return Promise.resolve(response);
  } catch (error) {
    const errorMessage = error.response.data.msg;
    return Promise.reject(errorMessage);
  }
};

export const addNewPlace = async (newData) => {
  const token = localStorage.getItem("token");
  try {
    const { status } = await axios.post("/newplace", newData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    return Promise.resolve(status);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateNewPlace = async (newData, id) => {
  const token = localStorage.getItem("token");
  try {
    const { data, status } = await axios.put("/updateplace/" + id, newData, {
      headers: { Authorization: `bearer ${token}` },
    });
    return Promise.resolve(status);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
