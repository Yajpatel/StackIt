const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    votes: {
      type: Number,
      default: 0,
    },
    acceptedAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    },
  },
  {
    timestamp: true,
  }
);
