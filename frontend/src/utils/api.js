const BASE_URL = 'http://localhost:3000'; // Backend running on port 3000

// Helper function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return {
    'Content-Type': 'application/json',
    ...(user.token && { 'Authorization': `Bearer ${user.token}` })
  };
};

// Questions API
export const questionsAPI = {
  getAll: () => fetch(`${BASE_URL}/api/questions`).then(res => res.json()),
  getById: (id) => fetch(`${BASE_URL}/api/questions/${id}`).then(res => res.json()),
  create: (data) => fetch(`${BASE_URL}/api/questions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data) => fetch(`${BASE_URL}/api/questions/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`${BASE_URL}/api/questions/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  upvote: (id) => fetch(`${BASE_URL}/api/questions/${id}/upvote`, { 
    method: 'POST',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  downvote: (id) => fetch(`${BASE_URL}/api/questions/${id}/downvote`, { 
    method: 'POST',
    headers: getAuthHeaders()
  }).then(res => res.json())
};

// Answers API
export const answersAPI = {
  getByQuestion: (questionId) => fetch(`${BASE_URL}/api/answers/question/${questionId}`).then(res => res.json()),
  getById: (id) => fetch(`${BASE_URL}/api/answers/${id}`).then(res => res.json()),
  create: (data) => fetch(`${BASE_URL}/api/answers`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  update: (id, data) => fetch(`${BASE_URL}/api/answers/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (id) => fetch(`${BASE_URL}/api/answers/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  upvote: (id) => fetch(`${BASE_URL}/api/answers/${id}/upvote`, { 
    method: 'POST',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  downvote: (id) => fetch(`${BASE_URL}/api/answers/${id}/downvote`, { 
    method: 'POST',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  accept: (id) => fetch(`${BASE_URL}/api/answers/${id}/accept`, { 
    method: 'POST',
    headers: getAuthHeaders()
  }).then(res => res.json())
};

// Tags API
export const tagsAPI = {
  getAll: () => fetch(`${BASE_URL}/api/tags`).then(res => res.json()),
  getById: (id) => fetch(`${BASE_URL}/api/tags/${id}`).then(res => res.json()),
  create: (data) => fetch(`${BASE_URL}/api/tags`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json())
};

// Notifications API
export const notificationsAPI = {
  getByUser: (userId) => fetch(`${BASE_URL}/api/notifications/user/${userId}`, {
    headers: getAuthHeaders()
  }).then(res => res.json()),
  markRead: (id) => fetch(`${BASE_URL}/api/notifications/${id}/read`, { 
    method: 'PUT',
    headers: getAuthHeaders()
  }).then(res => res.json()),
  delete: (id) => fetch(`${BASE_URL}/api/notifications/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(res => res.json())
};

// Users API
export const usersAPI = {
  register: (data) => fetch(`${BASE_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  login: (data) => fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())
}; 