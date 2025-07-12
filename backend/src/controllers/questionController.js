import Question from '../models/Question.js';
import User from '../models/User.js';
import Tag from '../models/Tag.js';
import Notification from '../models/Notification.js';

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('author', 'username').populate('tags', 'name');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'username')
      .populate('tags', 'name');
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { author, title, description, body, tags } = req.body;
    const question = new Question({ author, title, description, body, tags });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const upvoteQuestion = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    // Check if user has already voted
    const userId = req.user.id;
    if (!question.votesBy) question.votesBy = [];
    
    const existingVote = question.votesBy.find(vote => vote.user.toString() === userId);
    if (existingVote) {
      if (existingVote.voteType === 'upvote') {
        return res.status(400).json({ error: 'You have already upvoted this question' });
      } else {
        // Change from downvote to upvote
        existingVote.voteType = 'upvote';
        question.votes += 2; // +1 for upvote, +1 for removing downvote
      }
    } else {
      question.votesBy.push({ user: userId, voteType: 'upvote' });
      question.votes += 1;
    }

    await question.save();
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const downvoteQuestion = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    // Check if user has already voted
    const userId = req.user.id;
    if (!question.votesBy) question.votesBy = [];
    
    const existingVote = question.votesBy.find(vote => vote.user.toString() === userId);
    if (existingVote) {
      if (existingVote.voteType === 'downvote') {
        return res.status(400).json({ error: 'You have already downvoted this question' });
      } else {
        // Change from upvote to downvote
        existingVote.voteType = 'downvote';
        question.votes -= 2; // -1 for downvote, -1 for removing upvote
      }
    } else {
      question.votesBy.push({ user: userId, voteType: 'downvote' });
      question.votes -= 1;
    }

    await question.save();
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
