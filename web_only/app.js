import {SimplyReact} from "../simply_react.js";
import {Todo} from "./todo.js";

const {creatorFor, div, h1, a} = SimplyReact(React.createElement);

const App = (props) => {
  const todo = creatorFor(Todo);
  return (
    div(
      h1('Counter'),
      h1(`${props.state.todos.length}`),
      a({href: 'runTests.html'}, 'Tests!'),
      h1('Todos'),
      todo(props)
    )
  )
};

export { App };