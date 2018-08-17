import {Todo} from "./todo";

export interface State {
  todos: Array<any>;
  num: number;
  data: string;
  users: Array<any> | null;
}

const Store = function(props) {

  const reducer = props.reducer;
  let state = props.state;
  const getState = () => state;
  const listeners = [];

  const dispatch = (action) => {
    console.log('--> Dispatching: ' + action);
    state = reducer(action, state);
    listeners.forEach(listener => listener(state))
  };

  const subscribe = (listener) => {
    listeners.push(listener)
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

  return {
    listeners,
    subscribe,
    dispatch,
    thunk,
  }
};

export { Store };



