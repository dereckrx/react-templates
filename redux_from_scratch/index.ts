import {Store} from './store';
import {reducer} from './reducers';
import {SimplyReact} from '../simply_react';
import {App} from './app';
import * as ReactDOM from 'react-dom';

const {create} = SimplyReact;

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