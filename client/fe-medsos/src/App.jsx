import React, { useState } from 'react';
import { MessageCircle, Heart, Home, User, Search, Settings } from 'lucide-react';
import { VscAccount } from "react-icons/vsc";


const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Rezky', content: 'Emyu emyu :<', image: '', likes: 3 },
    { id: 2, user: 'Igor', content: 'P balap', image: '', likes: 5 },
  ]);

  const [newPost, setNewPost] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [username, setUsername] = useState('N13u0W'); // or whatever username you want


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          user: username, // use dynamic username
          content: newPost,
          image: imagePreview,
          likes: 0,
        },
        ...posts,
      ]);
      setNewPost('');
      setImageFile(null);
      setImagePreview('');
    }
  };

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      
      <aside className="w-20 bg-white border-r flex flex-col items-center py-7 space-y-7">
         {/* Profile logo */}
      <div className="p-2 bg-white-500 rounded-full">
    <VscAccount className="w-10 h-10 text-black" />
    </div>
      <Home className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      <User className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      <Search className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      <MessageCircle className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      <Settings className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Navbar */}
        <nav className="bg-white p-4 mb-4 rounded-2xl shadow text-center text-xl font-bold">
          PI Chat
        </nav>

        {/* Post input */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <VscAccount className="w-8 h-8 text-black" />
            <h1 className="font-semibold text-lg">N13u0W</h1>
          </div>

          <textarea
            className="w-full p-2 rounded border resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg my-2"
            />
          )}

          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
            onClick={handlePost}
          >
            Post
          </button>
        </div>


        {/* Posts Feed */}
        {posts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-2xl shadow mb-4">

          {/* Profile Icon + Username */}

        <div className="flex items-center gap-3 mb-2">
        <VscAccount className="w-7 h-7 text-black" />
        <span className="font-semibold">@{post.user}</span>
        </div>
            <p className="text-gray-700 mb-2">{post.content}</p>

            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="rounded-lg mb-2 max-h-60 object-cover w-full"
              />
            )}
            <div className="flex items-center gap-4 text-gray-500">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-1 hover:text-pink-500"
              >
                <Heart size={18} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle size={18} />
                <span>0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;