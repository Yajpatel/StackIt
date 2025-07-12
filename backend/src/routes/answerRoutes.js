import express from 'express';
import { auth, optionalAuth } from '../middleware/auth.js';
import {
  getAnswersByQuestion,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  downvoteAnswer,
  acceptAnswer
} from '../controllers/answerController.js';

const router = express.Router();

router.get('/question/:questionId', getAnswersByQuestion);
router.get('/:id', getAnswerById);
router.post('/', auth, createAnswer);
router.put('/:id', auth, updateAnswer);
router.delete('/:id', auth, deleteAnswer);
router.post('/:id/upvote', auth, upvoteAnswer);
router.post('/:id/downvote', auth, downvoteAnswer);
router.post('/:id/accept', auth, acceptAnswer);

export default router;
