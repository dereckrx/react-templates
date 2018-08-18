

// Reducers -------------------------------------------------
// Takes previous state and applies and action to return the next state
// (previousState, action) => newState

// Composed Reducer
function todoApp(state = {}, action) {
  return {
    visibilityFilter: reduceVisibilityFilter(state.visibilityFilter, action),
    todos: reduceTodos(state.todos, action)
  }
}

// Composing Reducers (breaking main reducer into smaller functions)
// Only needs to take in state thats relevant to this action
function reduceTodos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: state.length + 1,
        text: action.text,
        completed: false
      };
      // copy state using assign: (newObject, currState, mergeChange)
      // Object.assign({}, state, { visibilityFilter: action.filter})
      // alt array copy syntax: [...state, newTodo]
      return [...state, newTodo ]
    default:
      return state
  }
}

function reduceVisibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

//-------------------------------------------------
// Putting it all together
//-------------------------------------------------
// Initial State
const TEST_INITIAL_STATE = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      id: 1,
      text: 'Consider using Redux',
      completed: true,
    },
    {
      id: 2,
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}

let store = new Store(todoApp, TEST_INITIAL_STATE)

// Log initial state
console.log(store.getState());
// Log any time the state changes
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
// Dispatch some actions

//....

// Stop listening to unsubscribe
//unsubscribe()

