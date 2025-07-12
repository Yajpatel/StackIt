import mongoose from "mongoose";
import User from "./models/User.js";
import Tag from "./models/Tag.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import Notification from "./models/Notification.js";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/StackIt";

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({});
  await Tag.deleteMany({});
  await Question.deleteMany({});
  await Answer.deleteMany({});
  await Notification.deleteMany({});

  // Users
  const users = await User.insertMany([
    { username: "alice", email: "alice@email.com", password: "pass1", role: "admin" },
    { username: "bob", email: "bob@email.com", password: "pass2", role: "user" },
    { username: "carol", email: "carol@email.com", password: "pass3", role: "user" },
    { username: "dave", email: "dave@email.com", password: "pass4", role: "user" },
    { username: "eve", email: "eve@email.com", password: "pass5", role: "user" },
    { username: "frank", email: "frank@email.com", password: "pass6", role: "user" },
    { username: "grace", email: "grace@email.com", password: "pass7", role: "user" },
    { username: "heidi", email: "heidi@email.com", password: "pass8", role: "user" },
    { username: "ivan", email: "ivan@email.com", password: "pass9", role: "user" },
    { username: "judy", email: "judy@email.com", password: "pass10", role: "user" },
  ]);

  // Tags
  const tags = await Tag.insertMany([
    { name: "React", description: "React.js library" },
    { name: "Node.js", description: "Node.js runtime" },
    { name: "MongoDB", description: "MongoDB database" },
    { name: "JWT", description: "JSON Web Token" },
    { name: "CSS", description: "Cascading Style Sheets" },
    { name: "HTML", description: "HyperText Markup Language" },
    { name: "Express", description: "Express.js framework" },
    { name: "API", description: "Application Programming Interface" },
  ]);

  // Questions
  const questions = await Question.insertMany([
    {
      author: users[0]._id,
      title: "How to use React hooks?",
      description: "<p>How do I use <b>React hooks</b> in a functional component?</p>",
      body: "How do I use React hooks in a functional component?",
      tags: [tags[0]._id, tags[4]._id],
    },
    {
      author: users[1]._id,
      title: "What is JWT and how does it work?",
      description: "<p>Can someone explain <b>JWT</b> with an example?</p>",
      body: "Can someone explain JWT with an example?",
      tags: [tags[3]._id, tags[1]._id],
    },
    {
      author: users[2]._id,
      title: "How to connect Node.js to MongoDB?",
      description: "<p>What is the best way to connect <b>Node.js</b> to <b>MongoDB</b>?</p>",
      body: "What is the best way to connect Node.js to MongoDB?",
      tags: [tags[1]._id, tags[2]._id],
    },
    {
      author: users[3]._id,
      title: "How to style components in React?",
      description: "<p>What are the options for styling <b>React</b> components?</p>",
      body: "What are the options for styling React components?",
      tags: [tags[0]._id, tags[4]._id],
    },
    {
      author: users[4]._id,
      title: "How to secure Express API routes?",
      description: "<p>How do I secure <b>Express</b> API routes using JWT?</p>",
      body: "How do I secure Express API routes using JWT?",
      tags: [tags[6]._id, tags[3]._id],
    },
    {
      author: users[5]._id,
      title: "How to center a div in CSS?",
      description: "<p>How can I center a <b>div</b> using CSS?</p>",
      body: "How can I center a div using CSS?",
      tags: [tags[4]._id],
    },
    {
      author: users[6]._id,
      title: "What is the difference between HTML and JSX?",
      description: "<p>What is the difference between <b>HTML</b> and <b>JSX</b>?</p>",
      body: "What is the difference between HTML and JSX?",
      tags: [tags[5]._id, tags[0]._id],
    },
    {
      author: users[7]._id,
      title: "How to handle async/await in Node.js?",
      description: "<p>How do I use <b>async/await</b> in Node.js?</p>",
      body: "How do I use async/await in Node.js?",
      tags: [tags[1]._id],
    },
    {
      author: users[8]._id,
      title: "How to create REST API with Express?",
      description: "<p>How do I create a <b>REST API</b> using Express?</p>",
      body: "How do I create a REST API using Express?",
      tags: [tags[6]._id, tags[7]._id],
    },
    {
      author: users[9]._id,
      title: "How to use environment variables in Node.js?",
      description: "<p>How do I use <b>environment variables</b> in Node.js?</p>",
      body: "How do I use environment variables in Node.js?",
      tags: [tags[1]._id],
    },
  ]);

  // Answers
  const answers = await Answer.insertMany([
    {
      question: questions[0]._id,
      author: users[1]._id,
      body: "You can use useState and useEffect hooks in your functional components.",
      bodyRich: "<p>You can use <b>useState</b> and <b>useEffect</b> hooks in your functional components.</p>",
      votes: 5,
      isAccepted: true,
    },
    {
      question: questions[0]._id,
      author: users[2]._id,
      body: "Check the React documentation for more examples.",
      bodyRich: "<p>Check the <a href='https://reactjs.org'>React documentation</a> for more examples.</p>",
      votes: 2,
      isAccepted: false,
    },
    {
      question: questions[1]._id,
      author: users[3]._id,
      body: "JWT stands for JSON Web Token. It's used for authentication.",
      bodyRich: "<p>JWT stands for <b>JSON Web Token</b>. It's used for authentication.</p>",
      votes: 3,
      isAccepted: false,
    },
    {
      question: questions[2]._id,
      author: users[4]._id,
      body: "Use mongoose.connect to connect Node.js to MongoDB.",
      bodyRich: "<p>Use <code>mongoose.connect</code> to connect Node.js to MongoDB.</p>",
      votes: 4,
      isAccepted: true,
    },
    {
      question: questions[3]._id,
      author: users[5]._id,
      body: "You can use styled-components or CSS modules in React.",
      bodyRich: "<p>You can use <b>styled-components</b> or <b>CSS modules</b> in React.</p>",
      votes: 1,
      isAccepted: false,
    },
  ]);

  // Notifications
  await Notification.insertMany([
    {
      recipient: users[0]._id,
      type: "answer",
      question: questions[0]._id,
      answer: answers[0]._id,
      message: "bob answered your question.",
    },
    {
      recipient: users[1]._id,
      type: "mention",
      question: questions[1]._id,
      message: "@bob you were mentioned in a comment.",
    },
    {
      recipient: users[2]._id,
      type: "comment",
      question: questions[2]._id,
      answer: answers[3]._id,
      message: "carol commented on your answer.",
    },
  ]);

  console.log("Dummy data inserted!");
  await mongoose.disconnect();
}

seed(); 