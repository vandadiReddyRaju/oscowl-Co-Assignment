// src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // Update to match your backend URL

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Authentication APIs
export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);

// Todo APIs
export const fetchTodos = () => API.get('/todos');
export const createTodo = (todoData) => API.post('/todos', todoData);
export const updateTodo = (id, todoData) => API.put(`/todos/${id}`, todoData);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
