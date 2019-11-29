import axios from "axios";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;
}

export const fetchUser = async () => {
  try {
    const response = await axios.get("/api/users/auth/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const login = async ({ username, password }) => {
  try {
    await axios.post("/api/users/login", {
      username,
      password
    });
    return await fetchUser();
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const logout = async () => {
  try {
    await axios.delete("/api/users/logout", {});
    return null;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const register = async user => {
  try {
    const response = await axios.post("/api/users/register", user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const fetchCourseworks = async () => {
  try {
    const response = await axios.get("/api/courseworks");
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
  return null;
};
