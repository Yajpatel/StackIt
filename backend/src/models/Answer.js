import mongoose from "mongoose"


const AnswerSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    bodyRich: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0,
    },
    votesBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
        },
      },
    ],
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Answer", AnswerSchema);
