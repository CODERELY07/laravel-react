import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        createPost({title: title, body: body}).then(() => navigate('/'));
    }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
   <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
    + Back
    </Link>
      <section className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-bold mb-4">Add New Post</h2>
        <form onSubmit={submit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Title" 
            name="title"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded shadow-sm focus:outline-blue-500"
          />
          <textarea 
            placeholder="Content" 
            name="body"
            value={body}
            title="body"
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded shadow-sm focus:outline-blue-500"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700" type="submit">
            Save Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostCreate;