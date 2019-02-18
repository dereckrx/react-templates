import {SimplyReact} from "../simply_react.js";
import {Todo} from "./todo.js";

const {creatorFor, div, h1, a} = SimplyReact(React.createElement);

const App = (props) => {
  const todo = creatorFor(Todo);
  const totalTodos = props.state.todos.length;
  return (
    div(
      h1(`Todos: ${totalTodos}`),
      todo(props),
      a({href: 'runTests.html'}, 'Tests!'),
    )
  )
};

export { App };