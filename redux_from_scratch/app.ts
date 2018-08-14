//import React from "react";
//import { render } from "react-dom";
//import App from "./App";
//import { Store } from './store';
// const Store = require('./store');
// const {create} = require('../simply_react');
import {SimplyReact} from "../simply_react";
import {Todo} from "./todo";

const {creatorFor, div, h1} = SimplyReact;

const App = (props) => {
  const todo = creatorFor(Todo);
  return (
    div({},
      h1({}, 'Counter'),
      h1({}, props.state.todos.length),
      h1({}, 'Todos'),
      todo(props)
    )
  )
};

export { App };