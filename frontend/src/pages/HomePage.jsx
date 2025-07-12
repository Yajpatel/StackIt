import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Navigation */}
      <header className="nav-bar">
        <h1>StackIt</h1>
        <div className="nav-actions">
          <Link to="/AskQuestion">
            <button>Ask New Question</button>
          </Link>
          <button>Newest</button>
          <button>Unanswered</button>
          <button>More ▾</button>
          <input type="text" placeholder="Search" />
          <button>🔍</button>
          <Link to="/auth">
            <button>Login</button>
          </Link>
        </div>
      </header>

      {/* Questions List */}
      <div className="questions-list">
        {[1, 2, 3].map((id, idx) => (
          <Link to={`/answer/${id}`} key={id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="question-card">
              <div className="tags">
                <span className="tag">Tag1</span>
                <span className="tag">Tag2</span>
              </div>
              <div className="content">
                <h3>How to join 2 columns in a data set to make a separate column in SQL</h3>
                <p>I do not know the code for it as I am a beginner... (truncated)</p>
                <small>User Name</small>
              </div>
              <div className="answer-count">{5 - idx} ans</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>{`<`}</span>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button key={n}>{n}</button>
        ))}
        <span>{`>`}</span>
      </div>
    </div>
  );
};

export default HomePage;
