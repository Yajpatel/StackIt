import React, { useState } from "react";
import './AskQuestion.css'
const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    console.log("Question Submitted:", questionData);
    // TODO: Send to backend
  };

  return (
    <div className="ask-container" style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>StackIt</h1>
        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <a href="/">Home</a>
          <span>🔔</span>
          <img src="https://via.placeholder.com/30" alt="Profile" style={{ borderRadius: "50%" }} />
        </nav>
      </header>

      <form onSubmit={handleSubmit} style={{ marginTop: "30px", maxWidth: "700px" }}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your question title"
          style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your question in detail..."
          style={{ width: "100%", height: "200px", padding: "10px", marginBottom: "20px" }}
        ></textarea>

        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. SQL, joins, beginners"
          style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
        />

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>Submit</button>
      </form>
    </div>
  );
};

export default AskQuestion;
