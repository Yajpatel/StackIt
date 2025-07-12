import Answer from '../models/Answer.js';
import Question from '../models/Question.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

export const getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('author', 'username');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id).populate('author', 'username');
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAnswer = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { question, author, body, bodyRich } = req.body;
    const answer = new Answer({ question, author, body, bodyRich });
    await answer.save();

    // Create notification for question author
    const questionData = await Question.findById(question).populate('author');
    if (questionData && questionData.author._id.toString() !== author) {
      const notification = new Notification({
        recipient: questionData.author._id,
        type: 'answer',
        question: question,
        answer: answer._id,
        message: `Someone answered your question: "${questionData.title}"`
      });
      await notification.save();
    }

    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const upvoteAnswer = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    // Check if user has already voted
    const userId = req.user.id;
    if (!answer.votesBy) answer.votesBy = [];
    
    const existingVote = answer.votesBy.find(vote => vote.user.toString() === userId);
    if (existingVote) {
      if (existingVote.voteType === 'upvote') {
        return res.status(400).json({ error: 'You have already upvoted this answer' });
      } else {
        // Change from downvote to upvote
        existingVote.voteType = 'upvote';
        answer.votes += 2; // +1 for upvote, +1 for removing downvote
      }
    } else {
      answer.votesBy.push({ user: userId, voteType: 'upvote' });
      answer.votes += 1;
    }

    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const downvoteAnswer = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    // Check if user has already voted
    const userId = req.user.id;
    if (!answer.votesBy) answer.votesBy = [];
    
    const existingVote = answer.votesBy.find(vote => vote.user.toString() === userId);
    if (existingVote) {
      if (existingVote.voteType === 'downvote') {
        return res.status(400).json({ error: 'You have already downvoted this answer' });
      } else {
        // Change from upvote to downvote
        existingVote.voteType = 'downvote';
        answer.votes -= 2; // -1 for downvote, -1 for removing upvote
      }
    } else {
      answer.votesBy.push({ user: userId, voteType: 'downvote' });
      answer.votes -= 1;
    }

    await answer.save();
    res.json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const acceptAnswer = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    // Check if user is the question author
    const question = await Question.findById(answer.question);
    if (!question || question.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only question author can accept answers' });
    }

    answer.isAccepted = true;
    await answer.save();
    await Question.findByIdAndUpdate(answer.question, { acceptedAnswer: answer._id });

    // Create notification for answer author
    const notification = new Notification({
      recipient: answer.author,
      type: 'answer',
      question: answer.question,
      answer: answer._id,
      message: `Your answer was accepted!`
    });
    await notification.save();

    res.json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
