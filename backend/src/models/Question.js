import mongoose from "mongoose"

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
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
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
    acceptedAnswer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question" , QuestionSchema)
