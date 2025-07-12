import express from 'express';
import {
  getNotificationsByUser,
  markNotificationRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/user/:userId', getNotificationsByUser);
router.put('/:id/read', markNotificationRead);
router.delete('/:id', deleteNotification);

export default router; 