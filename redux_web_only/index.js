import {Store} from './store.js';
import {reducer} from './reducers.js';
import {SimplyReact, SimplyReactDOM} from '../simply_react.js';
import {App} from './app.js';

const {x, div} = SimplyReact(React.createElement);
const {o} = SimplyReactDOM(ReactDOM);

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
    div({className: 'app-content'},
      x(App, {state: state, dispatch: store.dispatch})
    )
  )
});

store.dispatch({});