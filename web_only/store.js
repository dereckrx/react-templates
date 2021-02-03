import {Todo, reducers as todoReducers} from "./todo.js";

export function makeReducer(reducers) {
  return (state, action) => {
    const fn = reducers[action.type];
    if(!fn) {
      console.log({unknownAction: action});
      return state;
    }
    return {...state, ...fn(state, action)}
  };
}

const defaultState = {
  todos: [],
};

export function useStore(initialState = defaultState) {
  const [state, dispatch] = React.useReducer(
    makeReducer(allReducers),
    initialState,
  );
  return Store(state, dispatch);
}

export function Store(state, dispatch) {
  return {
    ...state,
    todos: state.todos.map(todo => Todo(todo, dispatch)),
    addTodo: (text) => text && dispatch({
      type: 'ADD_TODO',
      text,
    }),
    deleteTodo: (todo) => dispatch({
      type: 'DELETE_TODO',
      todo,
    }),
  }
}

const reducers = {
  'ADD_TODO': (s, a) => ({
    todos: [...s.todos, {text: a.text, isFinished: false}],
  }),
  "DELETE_TODO": (s, a) => ({
    todos: s.todos.filter((todo) => todo.text !== a.todo.text)
  }),
};

const allReducers = {
  ...reducers,
  ...todoReducers,
};
