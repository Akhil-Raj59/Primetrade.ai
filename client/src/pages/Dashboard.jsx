import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import PostForm from "../components/posts/PostForm";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/post.api";

const Dashboard = () => {
  const [postsData, setPostsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    search: "",
    status: "all",
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts(filters);

      // Adjust according to your backend response shape
      setPostsData(response.data?.posts || []);
      setTotalPages(response.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  // CREATE
  const handleCreatePost = async (formData) => {
    setFormLoading(true);
    try {
      await createPost(formData);
      fetchPosts();
    } catch (error) {
      console.error("Create failed", error);
    } finally {
      setFormLoading(false);
    }
  };

  // UPDATE
  const handleUpdatePost = async (formData) => {
    if (!editingPost) return;

    setFormLoading(true);
    try {
      await updatePost(editingPost._id, formData);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setFormLoading(false);
    }
  };

  // DELETE
  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Posts</h2>

        {/* Post Form */}
        <div className="mb-10">
          <PostForm
            onSubmit={
              editingPost ? handleUpdatePost : handleCreatePost
            }
            initialData={editingPost}
            loading={formLoading}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
                page: 1,
              })
            }
            className="border px-3 py-2 rounded-lg w-64"
          />

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
                page: 1,
              })
            }
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Posts List */}
        {loading ? (
          <p>Loading posts...</p>
        ) : postsData.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postsData.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md rounded-xl p-4"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}

                  <h3 className="text-lg font-semibold">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {post.content?.slice(0, 100)}...
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {post.status}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeletePost(post._id)
                        }
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-3">
              <button
                disabled={filters.page === 1}
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: filters.page - 1,
                  })
                }
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-3 py-1">
                Page {filters.page} of {totalPages}
              </span>

              <button
                disabled={filters.page === totalPages}
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: filters.page + 1,
                  })
                }
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
