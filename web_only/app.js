import {TodoListView} from "./todoListView.js";

const {div, h1, a} = simpleReact(React.createElement);

const App = (props) => {
  const totalTodos = props.store.todos.length;
  return (
    div({className: 'app-content'},
      div(
        h1(`Todos: ${totalTodos}`),
        TodoListView({store: props.store}),
        a({href: 'runTests.html'}, 'Tests!'),
      )
    )
  )
};

export {App};
