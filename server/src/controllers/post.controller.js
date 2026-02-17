import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

/* ===============================
   CREATE POST
================================= */
const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags, status } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  let imageUrl = "";

  if (req.file?.path) {
    const uploadedImage = await uploadToCloudinary(req.file.path);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Image upload failed");
    }
    imageUrl = uploadedImage.url;
  }

  const parsedTags =
    tags && typeof tags === "string" ? JSON.parse(tags) : tags || [];

  const post = await Post.create({
    title: title.trim(),
    content: content.trim(),
    image: imageUrl,
    tags: parsedTags,
    status: status || "published",
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const getMyPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "all",
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const query = { author: req.user._id };

  if (status !== "all") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === "asc" ? 1 : -1;

  const posts = await Post.find(query)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  const totalPosts = await Post.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        posts,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalPosts / Number(limit)),
          totalPosts,
        },
      },
      "Posts fetched successfully"
    )
  );
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findOne({
    _id: id,
    author: req.user._id,
  });

  if (!post) {
    throw new ApiError(404, "Post not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, status } = req.body;

  if (!id) {
    throw new ApiError(400, "Post ID is required");
  }

  const updateFields = {};

  if (title) updateFields.title = title.trim();
  if (content) updateFields.content = content.trim();
  if (status) updateFields.status = status;

  if (tags) {
    try {
      updateFields.tags =
        typeof tags === "string" ? JSON.parse(tags) : tags;
    } catch (err) {
      throw new ApiError(400, "Invalid tags format");
    }
  }

  if (req.file?.path) {
    const uploadedImage = await uploadToCloudinary(req.file.path);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Image upload failed");
    }
    updateFields.image = uploadedImage.url;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: id, author: req.user._id },
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedPost) {
    throw new ApiError(404, "Post not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findOneAndDelete({
    _id: id,
    author: req.user._id,
  });

  if (!deletedPost) {
    throw new ApiError(404, "Post not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export {
  createPost,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
