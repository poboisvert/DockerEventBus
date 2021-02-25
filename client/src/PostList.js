import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    // Fetch data GET
    const res = await axios.get("http://localhost:4000/posts");

    //Store data
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div key={post.id} className="card">
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  //console.log(posts);
  return (
    <div className="d-flex flex-row justify-content-between">
      {renderedPosts}
    </div>
  );
}
