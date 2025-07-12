import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionsAPI } from '../utils/api';
import './HomePage.css';

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionsAPI.getAll();
      console.log('Questions data:', data); // Debug log
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load questions');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="questions-list">
        <div className="questions-header">
          <h1>Loading Questions...</h1>
          <div className="loading" style={{ margin: '2rem auto' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="questions-list">
        <div className="error">
          <h2>Error Loading Questions</h2>
          <p>{error}</p>
          <button onClick={fetchQuestions} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-list">
      <div className="questions-header">
        <h1>Welcome to StackIt</h1>
        <p>Discover answers to your questions and help others in the community</p>
      </div>

      {questions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🤔</div>
          <h2>No Questions Yet</h2>
          <p>Be the first to ask a question and start the conversation!</p>
          <Link to="/AskQuestion" className="btn-primary">
            Ask Your First Question
          </Link>
        </div>
      ) : (
        <div className="questions-grid">
          {questions.map((question) => (
            <Link 
              key={question._id} 
              to={`/question/${question._id}`}
              className="question-card"
            >
              <div className="question-meta">
                <div className="question-author">
                  <div className="author-avatar">
                    {question.author?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{question.author?.username || 'Anonymous'}</span>
                </div>
                <span className="question-date">
                  {formatDate(question.createdAt)}
                </span>
              </div>

              <h3>{question.title || 'Untitled Question'}</h3>
              <p>
                {question.content 
                  ? (question.content.length > 150 
                      ? question.content.substring(0, 150) + '...' 
                      : question.content)
                  : 'No content available'
                }
              </p>

              <div className="question-footer">
                <div className="tags">
                  {question.tags && Array.isArray(question.tags) && question.tags.map((tag) => (
                    <span key={tag._id || tag} className="tag">
                      {tag.name || tag}
                    </span>
                  ))}
                </div>
                <div className="question-stats">
                  <span className="answer-count">
                    {question.answers?.length || 0} answers
                  </span>
                  <span className="vote-count">
                    {question.votes || 0} votes
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
