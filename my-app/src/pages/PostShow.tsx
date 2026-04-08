import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {  getPost } from "../services/postService";
const PostShow = () => {
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    useEffect(() => {
        if(id){
            getPost(id).then(res => {
                setTitle(res.data.title);
                setBody(res.data.body);
            });
        }
    }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      
   <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
    + Back
    </Link>
      <section className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-bold mb-4">Show Post</h2>

        <div>
            <p><strong>Title:</strong>{title}</p>
            <p><strong>Body:</strong>{body}</p>
        </div>
      </section>
    </div>
  );
};

export default PostShow     ;