import React, { useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // Async - Await avoid CORS error with module CORS installed
    try {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
