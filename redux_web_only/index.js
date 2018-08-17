import {Store} from './store.js';
import {reducer} from './reducers.js';
import {SimplyReact} from '../simply_react.js';
import {App} from './app.js';

const {create} = SimplyReact(React.createElement);

const store = Store({
  reducer: reducer,
  state: {todos: []},
});
store.subscribe((state) => {
  ReactDOM.render(
    create(App, {state: state, dispatch: store.dispatch}),
    document.getElementById("container"))
});

store.dispatch({});