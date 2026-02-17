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
  const [isModalOpen, setIsModalOpen] = useState(false); 

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

  const openCreateModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingPost) {
        await updatePost(editingPost._id, formData);
      } else {
        await createPost(formData);
      }
      setIsModalOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Operation failed", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        fetchPosts();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Dashboard</h2>
            <p className="text-gray-500">Manage your content and posts</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Create New Post
          </button>
        </div>

        
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search by title..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              className="w-full border-gray-200 border px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="border-gray-200 border px-4 py-2.5 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

      
        {loading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">Loading your posts...</div>
        ) : postsData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No posts found. Start by creating one!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsData.map((post) => (
              <div key={post._id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {post.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">{post.content}</p>
                  
                  <div className="flex gap-4 border-t pt-4">
                    <button onClick={() => openEditModal(post)} className="flex-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
                    <button onClick={() => handleDeletePost(post._id)} className="flex-1 text-sm font-bold text-red-500 hover:text-red-700 transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

    
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">{editingPost ? "Edit Post" : "Create New Post"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 text-2xl">&times;</button>
            </div>
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              <PostForm 
                onSubmit={handleFormSubmit} 
                initialData={editingPost} 
                loading={formLoading} 
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;