import axiosInstance from "./axios";

// Register (multipart/form-data)
export const registerUser = async (formData) => {
  const response = await axiosInstance.post(
    "/users/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/users/login",
    credentials
  );

  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
