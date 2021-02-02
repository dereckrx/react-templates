import {App} from './app.js';

const x = React.createElement;
const o = ReactDOM;

const initalState = {
  num: 0,
  todos: [],
  data: "",
  users:null
};

const store = Store({
  reducer: reducer,
  state: initalState,
});

store.subscribe((state) => {
  o('app',
    x('div', {className: 'app-content'},
      x(App, {state: state, dispatch: store.dispatch})
    )
  )
});

store.dispatch({});

export default store;