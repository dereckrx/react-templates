import * as React from "react";
import {SimplyReact} from "../../simply_react"
import {Todo} from "./todo";

const {creatorFor, div, h1} = SimplyReact(React.createElement);

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