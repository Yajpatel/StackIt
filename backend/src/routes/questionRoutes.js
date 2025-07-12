import express from 'express';
import { auth, optionalAuth } from '../middleware/auth.js';
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  upvoteQuestion,
  downvoteQuestion
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.post('/', auth, createQuestion);
router.put('/:id', auth, updateQuestion);
router.delete('/:id', auth, deleteQuestion);
router.post('/:id/upvote', auth, upvoteQuestion);
router.post('/:id/downvote', auth, downvoteQuestion);

export default router;
