import {Store} from './store';
import {reducer} from './reducers';
import {SimplyReact} from '../../simply_react';
import {App} from './app';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

const {create} = SimplyReact(React.createElement);
console.log('--> starting: ');

const store = Store({
  reducer: reducer,
  state: {todos: []},
});
store.subscribe((state) => {
  ReactDOM.render(
    create(App, {state: state, dispatch: store.dispatch}),
    document.getElementById("container"))
});
console.log('--> Setupdone: ');
store.dispatch({});