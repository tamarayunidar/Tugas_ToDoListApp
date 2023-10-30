export const addTask = (text) => ({
  type: 'ADD_TASK',
  payload: {
    id: Date.now(),
    text,
    completed: false,
  },
});

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  payload: id,
});

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter,
});
