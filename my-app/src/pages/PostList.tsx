  import { useEffect, useState } from "react";
  import type { Post } from "../types/Post";
  import { deletePost, getPosts } from "../services/postService";
import { Link } from "react-router-dom";

  const PostList = () => {

    const [posts,setPosts] = useState<Post[]>([]);

    useEffect(() => {
      getPosts().then(res => setPosts(res.data));
    });

    const handleDelete = (id: number) => {
      if(confirm("Are you sure?")){
        deletePost(id).then(() => {
          setPosts(posts.filter(p => p.id !== id))
        });
      }
    }
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Post Management</h1>
            <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              + Create Post
            </Link>
          </div>

        
          <div className="p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 uppercase text-sm leading-normal border-b">
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Content</th>
                  <th className="py-3 px-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{post.title}</td>
                    <td className="py-4 px-4 truncate max-w-xs">{post.body}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex item-center justify-center gap-3">
                        <Link to={`/edit/${post.id}`} className="text-blue-500 hover:text-blue-700 font-medium">Edit</Link>
                        <Link to={`/show/${post.id}`} className="text-green-500 hover:text-green-700 font-medium">Show</Link>
                        <button 
                        onClick={() =>handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 0 && (
              <p className="text-center py-10 text-gray-400">No posts found. Start by creating one!</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default PostList;