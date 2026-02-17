import axiosInstance from "./axios";

// Create Post
export const createPost = async (formData) => {
  const response = await axiosInstance.post(
    "/posts",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Posts with filters
export const getPosts = async (params) => {
  const response = await axiosInstance.get("/posts", {
    params,
  });

  return response.data;
};

// Get single post
export const getPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// Update post
export const updatePost = async (postId, formData) => {
  const response = await axiosInstance.put(
    `/posts/${postId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete post
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};
