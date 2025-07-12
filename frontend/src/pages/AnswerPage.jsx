import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './AnswerPage.css';
const dummyQuestion = {
  id: 1,
  title: "How to join 2 columns in a data set to make a separate column in SQL",
  description:
    "I do not know the code for it as I am a beginner. I need to combine column 1 (first name) and column 2 (last name)...",
  tags: ["SQL", "Join"],
  answers: [
    {
      id: 1,
      content: "The || Operator. The + Operator. The CONCAT Function.",
      votes: 1,
    },
    {
      id: 2,
      content: "Use `CONCAT(first_name, ' ', last_name)` in SQL.",
      votes: 0,
    },
  ],
};

const AnswerPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [votes, setVotes] = useState({});
  const isLoggedIn = true;

  useEffect(() => {
    setQuestion(dummyQuestion);
    setVotes(
      dummyQuestion.answers.reduce((acc, ans) => {
        acc[ans.id] = ans.votes;
        return acc;
      }, {})
    );
  }, [id]);

  const handleVote = (answerId) => {
    if (!isLoggedIn) {
      alert("Please login to vote.");
      return;
    }

    if (votes[answerId] !== dummyQuestion.answers.find((a) => a.id === answerId).votes) {
      alert("You’ve already voted.");
      return;
    }

    setVotes((prev) => ({
      ...prev,
      [answerId]: prev[answerId] + 1,
    }));
  };

  const handleSubmitAnswer = () => {
    console.log("Submitted Answer:", answerText);
    // TODO: send to backend
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>StackIt</h1>
        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link to="/">Home</Link>
          <span>🔔</span>
          <img src="https://via.placeholder.com/30" alt="profile" style={{ borderRadius: "50%" }} />
        </nav>
      </header>

      <p style={{ margin: "20px 0" }}>
        <Link to="/">Questions</Link> &gt; {question.title.slice(0, 30)}...
      </p>

      <div style={{ borderBottom: "1px solid #ccc", paddingBottom: "15px" }}>
        <h2>{question.title}</h2>
        <div>
          {question.tags.map((tag) => (
            <span
              key={tag}
              style={{
                marginRight: "10px",
                background: "#ddd",
                padding: "3px 8px",
                borderRadius: "5px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p style={{ marginTop: "10px" }}>{question.description}</p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Answers</h3>
        {question.answers.map((answer) => (
          <div key={answer.id} style={{ borderTop: "1px solid #ccc", padding: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <button onClick={() => handleVote(answer.id)} style={{ marginRight: "5px" }}>
                ⬆️
              </button>
              <span>{votes[answer.id]}</span>
            </div>
            <div>{answer.content}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Submit Your Answer</h3>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer..."
          style={{ width: "100%", height: "200px", padding: "10px" }}
        ></textarea>
        <button
          onClick={handleSubmitAnswer}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AnswerPage;
