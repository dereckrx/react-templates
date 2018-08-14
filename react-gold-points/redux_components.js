// STORE -------------------------------------------------
// - Holds, allows access, updates the state
// - Registers listeners

// Pass in a reducer, optionally: initial state as 2nd param
function Store(reducer, state={}) {
  this.reducer = reducer
  this.state = state
  this.subscribers = []
  this.getState = function() { return this.state };
  this.subscribe = function(callback) {
    console.log("+ Adding subscriber")
    this.subscribers = this.subscribers.concat([callback])
  }
  this.dispatch = function(action) {

    // This is my "faked" middleware
    // Provides extension point between a dispatched action, and the reducer.

    // Logger "middleware"
    console.log("==> Dispatching: ", action)

    // "Thunk" middleware to handle actions that are functions
    if(typeof action === 'function'){
      action(this)
      return null
    }

    // Default behavior
    this.state = this.reducer(this.state, action)
    this._notifiy_subscribers(this.state)
  }

  this.init_from_api = function() {
    this.dispatch(getCommentsAaction())
  }

  this._notifiy_subscribers = function(state) {
    console.log("((( Notifying subscribers ))) ")
    this.subscribers.forEach( (sub) => sub(state) )
  }

  this._isFunction = function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
}

const thunk = (store) => (nextDispatch) => (action) => {
  if(typeof action === 'function') {
    action(this)
    return null
  } else {
    nextDispatch(action)
  }
}

//-------------------------------------------------
// Redux methods
//-------------------------------------------------

const ADD_COMMENT = 'ADD_COMMENT'
const CREATE_COMMENT = 'CREATE_COMMENT'
const ADD_COMMENTS = 'ADD_COMMENTS'
const DELETE_COMMENT = 'DELETE_COMMENT'

function addCommentAction(comment) {
  return { type: ADD_COMMENT, comment: comment }
}

function postCommentAction(comment) {
  // Using "store.dispatch" here instead of just "dispatch" because
  // it dispatch is apart of store. Not sure how that could be pulled out
  return (store) => {
    console.log("* * * Spinner * * *")
    api_client.call({
      method: "POST",
      url: "/api/comments",
      data: comment,
      success: function(newComment) {
        console.log("<-- POST /api/comments OK")
        store.dispatch(addCommentAction(newComment))
      }
    });
  }
}

function getCommentsAaction() {
  // Load comments from server
  return (store) =>  {
    api_client.call({
      method: "GET",
      url: "/api/comments",
      success: (comments) => {
        console.log("<- GET Comments OK", comments)
        store.dispatch(addCommentsAction(comments))
      }
    });
  }
}

function addCommentsAction(comments) {
  return { type: ADD_COMMENTS, comments: comments }
}

function deleteCommentAction(comment) {
  return (store) => {
    store.dispatch({ type: DELETE_COMMENT, comment: comment })
    api_client.call({
      method: 'DELETE',
      url: `/api/comments/${comment.id}`
    });
  }
}

// Things you should never do inside a reducer:
//   * Mutate its arguments;
//   * Perform side effects like API calls and routing transitions;
//   * Call non-pure functions, e.g. Date.now() or Math.random()

function appReducer(state = {}, action) {
  return Object.assign({}, state, {
    comments: reduceComments(state.comments, action)
  })
}

function reduceComments(state = [], action) {
  console.log("<== Reducing: ", action)
  switch (action.type) {
    case ADD_COMMENT: // Response from api
      return [...state, action.comment ]
    case ADD_COMMENTS:
      return state.concat(action.comments)
    case DELETE_COMMENT:
      return state.filter( (c) => c.id !== action.comment.id )
    default:
      console.log(`! Invalid action: ${action.type}`)
      return state
  }
}
