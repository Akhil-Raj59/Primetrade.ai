import axiosInstance from "./axios";

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


export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(
    "/users/login",
    credentials
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};
