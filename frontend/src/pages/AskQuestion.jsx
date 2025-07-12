import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionsAPI, tagsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './AskQuestion.css';
const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/auth');
      return;
    }
    fetchTags();
  }, [isAuthenticated, navigate]);

  const fetchTags = async () => {
    try {
      const data = await tagsAPI.getAll();
      setTags(data);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const questionData = {
        title: title.trim(),
        content: content.trim(),
        tags: selectedTags
      };

      const result = await questionsAPI.create(questionData);
      
      if (result._id) {
        setSuccess('Question posted successfully!');
        setTimeout(() => {
          navigate(`/question/${result._id}`);
        }, 1500);
      } else {
        setError(result.message || 'Failed to post question');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while posting your question');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Ask a Question</h2>
        <p>Share your knowledge and get help from the community</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Question Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="What's your question? Be specific."
            required
            maxLength={200}
          />
          <small className="form-help">
            {title.length}/200 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Question Details *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-input"
            placeholder="Provide more context about your question. Include any relevant code, error messages, or specific details that will help others understand and answer your question."
            required
            rows={8}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Tags (Optional)
          </label>
          <div className="tags-container">
            {tags.map((tag) => (
              <button
                key={tag._id}
                type="button"
                className={`tag-selector ${selectedTags.includes(tag._id) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(tag._id)}
              >
                {tag.name}
                {selectedTags.includes(tag._id) && <span className="tag-check">✓</span>}
              </button>
            ))}
          </div>
          <small className="form-help">
            Select relevant tags to help others find your question
          </small>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Posting Question...
              </>
            ) : (
              'Post Question'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestion;
