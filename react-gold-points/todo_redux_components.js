// Actions -------------------------------------------------
const ADD_TODO = 'ADD_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
const SHOW_ALL = 'SHOW_ALL'

function addTodo(text) {
  return { type: ADD_TODO, text: text }
}

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
      }
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

// STORE -------------------------------------------------
// - Holds, allows access, updates the state
// - Registers listeners

// Pass in a reducer, optionally: initial state as 2nd param
// function createStore(reducer, initial_state={}) {
//   const store = {
//     state: initial_state,
//     reducer: reducer,
//     subscribers: [],
//     getState: function() { return this.state }.bind(this),
//     subscribe: function(callback) {
//       console.log(this)
//       this.subscribers = this.subscribers.concat([callback])
//     }
//     dispatch: function(action) {
//       this.state = reducer(this.state, action)
//       //subscribers.forEach( (sub) => sub() )
//     }
//   }
//   return store
// }

function Store(reducer, initialState={}) {
  this.state = initialState
  this.reducer = reducer
  this.subscribers = []
  this.getState = function() { return this.state }.bind(this)
  this.subscribe = function(callback) {
    console.log(this)
    this.subscribers = this.subscribers.concat([callback])
  }
  this.dispatch = function(action) {
    this.state = reducer(this.state, action)
    this.subscribers.forEach( (sub) => sub() )
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
console.log(store.getState())
// Log any time the state changes
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
//....

// Stop listening to unsubscribe
//unsubscribe()

