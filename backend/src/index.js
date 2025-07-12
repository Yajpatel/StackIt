import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from '../config/db.js';


// Init app
const app = express();
// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import UserRouter from "./routes/userRoutes.js";
import QuestionRouter from "./routes/questionRoutes.js";
import AnswerRouter from "./routes/answerRoutes.js";
import TagRouter from "./routes/tagRoutes.js";
import NotificationRouter from "./routes/notificationRoutes.js";

app.use("/user", UserRouter);
app.use("/api/questions", QuestionRouter);
app.use("/api/answers", AnswerRouter);
app.use("/api/tags", TagRouter);
app.use("/api/notifications", NotificationRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
