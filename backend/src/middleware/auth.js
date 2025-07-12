import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (user) {
        req.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        };
      }
    }
    
    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};
