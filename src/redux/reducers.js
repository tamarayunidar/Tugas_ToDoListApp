const initialState = {
  tasks: [],
  currentFilter: 'all',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        currentFilter: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
