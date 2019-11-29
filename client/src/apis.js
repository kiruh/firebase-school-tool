import axios from "axios";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:5000/";
}

export const fetchUser = async () => {
  try {
    const response = await axios.get("/api/users/auth/", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const login = async ({ username, password }) => {
  try {
    await axios.post(
      "/api/users/login",
      {
        username,
        password
      },
      { withCredentials: true }
    );
    return await fetchUser();
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const register = async user => {
  try {
    const response = await axios.post("/api/users/register", user, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
