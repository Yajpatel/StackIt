// routes/userRoutes.js
import express from 'express';
import { signup , login} from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(signup);
router.route('/login').post(login);


export default router;