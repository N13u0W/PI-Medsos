import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../redux/action/authAction'
import { VscAccount } from 'react-icons/vsc';
import { Home as HomeIcon, User, Search, MessageCircle, Settings, Heart } from 'lucide-react';

const WEBSOCKET_URL = 'ws://127.0.0.1:3001';

const Home = () => {
  const profile = useSelector(root => root?.auth)
  const dispatch = useDispatch()
  const  [isConnected, setIsConnected] = useState(false)
  const [websocket, setWebsocket] = useState(null)
  const ws = useRef(null)
  
  useEffect(() =>{
    dispatch(fetchProfile(profile?.token))
    dispatch(fetchProfile(profile?.token))
  },[])

  const [posts, setPosts] = useState([
    { id: 1, user: 'Rezky', content: 'Emyu emyu :<', image: '', likes: 3, comments: [] },
    { id: 2, user: 'Igor', content: 'P balap', image: '', likes: 5, comments: [] },
  ]);

  const [newPost, setNewPost] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [username, setUsername] = useState('N13u0W');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  //  New state for comments per post
  const [newComments, setNewComments] = useState({});

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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { id: Date.now(), text: chatInput }]);
      setChatInput('');
    }
  };

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          user: username,
          content: newPost,
          image: imagePreview,
          likes: 0,
          comments: [],
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

  // Comment input handler
  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({ ...prev, [postId]: value }));
  };

  // Add comment to post
  const handleAddComment = (postId) => {
    const text = newComments[postId]?.trim();
    if (text) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { id: Date.now(), text }] }
          : post
      ));
      setNewComments(prev => ({ ...prev, [postId]: '' }));
    }
  };

  useEffect(() => {
    dispatch(fetchProfile(profile?.token))
  }, [])

  const handleAddTweet = (newTweetContent) => {
    if(newTweetContent.trim() === '') return;

    dispatch(storePosting(profile?.token,{
      content_text: newTweetContent
    }))
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r flex flex-col items-center py-7 space-y-7">
        <div className="p-2 bg-white-500 rounded-full">
          <VscAccount className="w-10 h-10 text-black" />
        </div>
        <HomeIcon className="w-9 h-9 text-gray-600 hover:text-blue-500" />
        <User className="w-9 h-9 text-gray-600 hover:text-blue-500" />
        <Search className="w-9 h-9 text-gray-600 hover:text-blue-500" />
        <MessageCircle className="w-9 h-9 text-gray-600 hover:text-blue-500" />
        <Settings className="w-9 h-9 text-gray-600 hover:text-blue-500" />
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        <nav className="bg-white p-4 mb-4 rounded-2xl shadow text-center text-xl font-bold">
          PI Chat
        </nav>

        {/* Post input */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <div className="flex items-center gap-2 mb-4">
            <VscAccount className="w-8 h-8 text-black" />
            <h1 className="font-semibold text-lg">{username}</h1>
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

            <div className="flex items-center gap-4 text-gray-500 mb-2">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-1 hover:text-pink-500"
              >
                <Heart size={18} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <MessageCircle size={18} />
                <span>{post.comments.length}</span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Comments</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-2 rounded mb-1">
                  {comment.text}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write a comment..."
                  value={newComments[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Chat Box */}
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-2xl p-4 flex flex-col">
          <h2 className="font-bold text-lg mb-2">Chat</h2>
          <div className="flex-1 overflow-y-auto max-h-60 mb-2 space-y-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="bg-gray-200 p-2 rounded">
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
