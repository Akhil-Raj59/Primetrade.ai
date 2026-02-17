import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../utils/validationSchemas";

const PostForm = ({ onSubmit, initialData = null, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        content: initialData.content,
        tags: initialData.tags?.join(", "),
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append(
      "tags",
      JSON.stringify(
        data.tags
          ? data.tags.split(",").map((tag) => tag.trim())
          : []
      )
    );
    formData.append("status", data.status);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h3 className="text-lg font-semibold">
        {initialData ? "Edit Post" : "Create Post"}
      </h3>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full border px-3 py-2 rounded-lg"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        <textarea
          rows="4"
          placeholder="Content"
          {...register("content")}
          className="w-full border px-3 py-2 rounded-lg"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          {...register("tags")}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      {/* Status */}
      <div>
        <select
          {...register("status")}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Image */}
      <div>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Post"
          : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
