import axios from "axios";

export const registerUser = async (credentials) => {
  try {
    const response = await axios.post("auth/register", credentials, {
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
        const response = await axios.post("auth/login", credentials,  {
          headers: { "Content-Type": "application/json" },
        });
        return Promise.resolve(response)
    } catch (error) {
        const errorMessage = error.response.data.msg
        return Promise.reject(errorMessage)
    }

}
