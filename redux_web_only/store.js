const Store = (props) => {

  const reducer = props.reducer;
  let state = props.state;
  const getState = () => state;
  const subscribers = [];

  const dispatch = (action) => {
    state = reducer(action, state);
    subscribers.forEach(listener => listener(state));
  };

  const subscribe = (notify) => {
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

  return {
    dispatch,
    subscribe,
    thunk,
    getState,
  }
};

export { Store };



