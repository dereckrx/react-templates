import {Store} from './store';
import {reducer} from './reducers';
import {SimplyReact, SimplyReactDOM} from '../../simply_react';
import {App} from './app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const {x} = SimplyReact(React.createElement);
const {o} = SimplyReactDOM(ReactDOM);

const store = Store({
  reducer: reducer,
  state: {todos: []},
});

store.subscribe((state) => {
  o('app',
    x('div', {style: {display: 'flex', justifyContent: 'center'}},
      x(App, {state: state, dispatch: store.dispatch})));
});
store.dispatch({});