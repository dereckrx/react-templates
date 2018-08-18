import {Store} from './store.js';
import {reducer} from './reducers.js';
import {SimplyReact, SimplyReactDOM} from '../simply_react.js';
import {App} from './app.js';

const {x, div} = SimplyReact(React.createElement);
const {o} = SimplyReactDOM(ReactDOM);

const store = Store({
  reducer: reducer,
  state: {todos: []},
});

store.subscribe((state) => {
  o('app',
    div({style: {fontFamily: 'monospace', display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}},
      x(App, {state: state, dispatch: store.dispatch})
    )
  )
});

store.dispatch({});