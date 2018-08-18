//-------------------------------------------------
// Redux methods / Actions
//-------------------------------------------------


//--- Coments ----------------------------------------------

const ADD_COMMENT = 'ADD_COMMENT';
const CREATE_COMMENT = 'CREATE_COMMENT';
const ADD_COMMENTS = 'ADD_COMMENTS';
const DELETE_COMMENT = 'DELETE_COMMENT';

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
