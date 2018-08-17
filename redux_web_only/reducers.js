
const initalState = {
  num: 0,
  todos: [],
  data: "",
  users:null
};

function reducer(action, state = initalState ) {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        num: state.num + 1
      };
    case "DEC":
      return {
        ...state,
        num: state.num - 1
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.text]
      };

    case "DELETE_TODO":
      const todos = state.todos.filter((todo) => todo !== action.text);
      return {
        ...state,
        todos: todos
      };

    case "GET_DATA":
      return {
        ...state,
        data: action.data
      };
    case 'GET_USERS':
      return {
        ...state,
        users:action.users

      };
    default:
      return state;
  }
}

export { reducer };

