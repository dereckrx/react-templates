import {Todo} from "./todo";

export interface State {
  todos: Array<any>;
  num: number;
  data: string;
  users: Array<any> | null;
}

// STORE -------------------------------------------------
// - Holds, allows access, updates the state
// - Registers listeners
const Store = function(props) {

  const reducer = props.reducer;
  let state = props.state;
  const getState = () => state;
  const subscribers = [];
  const log = props.log || console.log;

  const init_from_api = () => {
    //this.dispatch(getCommentsAaction())
  };

  const dispatch = (action) => {
    // This is my "faked" middleware
    // Provides extension point between a dispatched action, and the reducer.
    // Logger "middleware"
    log(`--> Dispatching: ${action}`);

    // "Thunk" middleware to handle actions that are functions
    if(typeof action === 'function'){
      action(this);
      return null
    }

    state = reducer(action, state);

    log("((( Notifying subscribers ))) ");
    subscribers.forEach(subscriber => subscriber(state))
  };

  const subscribe = (notify) => {
    log("+ Adding subscriber")
    subscribers.push(notify)
  };

  dispatch({});

  const reducers = () => reducer;

  reducers(); // getting the reducers

  const toAsync = (fn) => {
    return () => new Promise(fn);
  };

  // Returns: () => Promise
  // requester: The request logic that will call the response handler
  // responseHandler: Handles the result of the requester function
  const thunk = (requester, responseHandler, delay) => {
    if(delay) {
      return toAsync((resolve, reject) => {
        setTimeout(() => {
          resolve(requester(responseHandler));
        }, delay);
      });
    }
    return toAsync((resolve, reject) => resolve(requester(responseHandler)));
  };

  // const thunk = (store) => (nextDispatch) => (action) => {
  //   if(typeof action === 'function') {
  //     action(this)
  //     return null
  //   } else {
  //     nextDispatch(action)
  //   }
  // };

  return {
    subscribers,
    subscribe,
    dispatch,
    thunk,
  }
};

export { Store };



