import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { questionsAPI, answersAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        setLoading(true);
        const [questionData, answersData] = await Promise.all([
          questionsAPI.getById(id),
          answersAPI.getByQuestion(id)
        ]);
        setQuestion(questionData);
        setAnswers(answersData);
      } catch (err) {
        setError("Failed to fetch question");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  const handleVote = async (itemId, voteType, isQuestion = false) => {
    if (!isAuthenticated()) {
      alert('Please log in to vote');
      return;
    }

    try {
      if (isQuestion) {
        const updatedQuestion = voteType === 'upvote' 
          ? await questionsAPI.upvote(itemId)
          : await questionsAPI.downvote(itemId);
        setQuestion(updatedQuestion);
      } else {
        const updatedAnswer = voteType === 'upvote' 
          ? await answersAPI.upvote(itemId)
          : await answersAPI.downvote(itemId);
        setAnswers(answers.map(a => a._id === itemId ? updatedAnswer : a));
      }
    } catch (err) {
      if (err.message?.includes('already')) {
        alert(err.message);
      } else if (err.message?.includes('Authentication')) {
        alert('Please log in to vote');
      } else {
        alert('Vote failed. Please try again.');
      }
      console.error('Vote failed:', err);
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    if (!isAuthenticated()) {
      alert('Please log in to accept answers');
      return;
    }

    try {
      const updatedAnswer = await answersAPI.accept(answerId);
      setAnswers(answers.map(a => a._id === answerId ? updatedAnswer : a));
      alert('Answer accepted successfully!');
    } catch (err) {
      if (err.message?.includes('Only question author')) {
        alert('Only the question author can accept answers');
      } else if (err.message?.includes('Authentication')) {
        alert('Please log in to accept answers');
      } else {
        alert('Failed to accept answer. Please try again.');
      }
      console.error('Accept answer failed:', err);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      alert('Please log in to post an answer');
      return;
    }

    if (!newAnswer.trim()) return;

    try {
      const answerData = {
        question: id,
        body: newAnswer,
        author: user.id
      };

      const newAnswerData = await answersAPI.create(answerData);
      setAnswers([...answers, newAnswerData]);
      setNewAnswer("");
      alert('Answer posted successfully!');
    } catch (err) {
      if (err.message?.includes('Authentication')) {
        alert('Please log in to post an answer');
      } else {
        alert('Failed to post answer. Please try again.');
      }
      console.error('Submit answer failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading question...</div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error || "Question not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{question.title}</h1>
          <p className="text-gray-600 mb-4">{question.body}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Asked by {question.author?.username || "Anonymous"}</span>
              <span>{new Date(question.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote(question._id, 'upvote', true)}
                className="text-gray-400 hover:text-green-600 transition"
              >
                ▲
              </button>
              <span className="text-sm font-medium">{question.votes || 0}</span>
              <button
                onClick={() => handleVote(question._id, 'downvote', true)}
                className="text-gray-400 hover:text-red-600 transition"
              >
                ▼
              </button>
            </div>
          </div>
          
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answers */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {answers.length} Answer{answers.length !== 1 ? 's' : ''}
          </h2>
          
          {answers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No answers yet. Be the first to answer!</div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <div key={answer._id} className={`bg-white rounded-lg shadow-md p-6 ${
                  answer.isAccepted ? 'border-2 border-green-500' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-4">{answer.body}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Answered by {answer.author?.username || "Anonymous"}</span>
                          <span>{new Date(answer.createdAt).toLocaleDateString()}</span>
                          {answer.isAccepted && (
                            <span className="text-green-600 font-medium">✓ Accepted</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleVote(answer._id, 'upvote')}
                            className="text-gray-400 hover:text-green-600 transition"
                          >
                            ▲
                          </button>
                          <span className="text-sm font-medium">{answer.votes || 0}</span>
                          <button
                            onClick={() => handleVote(answer._id, 'downvote')}
                            className="text-gray-400 hover:text-red-600 transition"
                          >
                            ▼
                          </button>
                          {!answer.isAccepted && question.author?._id === user?.id && (
                            <button
                              onClick={() => handleAcceptAnswer(answer._id)}
                              className="ml-2 text-sm text-green-600 hover:text-green-800"
                            >
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Answer Form */}
        {isAuthenticated() ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Answer</h3>
            <form onSubmit={handleSubmitAnswer}>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Post Answer
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-4">Please log in to post an answer.</p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail; 