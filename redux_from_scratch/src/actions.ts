// --- TODOs ----------------------------------------------
const ADD_TODO = 'ADD_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SHOW_ALL = 'SHOW_ALL';

export const addTodo = (text) => {
  return { type: ADD_TODO, text: text }
};