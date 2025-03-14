// src/utils/auth.js

// Get role from localStorage
export const getRole = () => localStorage.getItem('role');

// Get token from localStorage
export const getToken = () => localStorage.getItem('token');

// Example of checking if logged in (optional)
export const isLoggedIn = () => !!localStorage.getItem('token');

// Example: Check if role is Teacher (optional)
export const isTeacher = () => getRole() === 'TEACHER';
export const isMaster = () => getRole() === 'MASTER';
