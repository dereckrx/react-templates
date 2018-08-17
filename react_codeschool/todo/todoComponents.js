import {SimplyReact} from  "../../simply_react.js"

const {creatorFor, div, ul, li, h1} = SimplyReact(React.createElement);

// ## Contaner Component
class TodoApp extends React.Component {

  constructor(props){
    super(props);

    // Set initial state
    this.state = {
      data: [
        {
          id: 1,
          text: "React TODO tutorial"
        }
      ]
    }
  }

  // Add todo handler
  addTodo(val){
    // Assemble data
    const nextId = this.state.data.length + 1;
    const todo = {text: val, id: nextId}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }

  // Handle remove
  handleRemove(id) {

    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });

    // Update state with filter
    this.setState({data: remainder});
  }

  render(){
    return (
      div({},
        title({todoCount: this.state.data.length}),
        todoForm({addTodo: this.addTodo.bind(this)}),
        todoList({
          todos: this.state.data,
          remove: this.handleRemove.bind(this)})
      )
    )
  }
}
const todoApp = creatorFor(TodoApp);

const TodoForm = ({addTodo}) => {
  let state = '';
  const button = creatorFor('button');
  const input = creatorFor('input');

  return (
    div({},
      input({ref: (text) => state = text}),
      button({
        onClick: () => {
          addTodo(state.value);
          state.value = '';
        },
      },
      'Add todo'
      )
    )
  )
};
const todoForm = creatorFor(TodoForm);


const Todo = ({todo, remove}) => {
  return (
    li({ onClick: () => remove(todo.id) },
      todo.text
    )
  )
}


const TodoList = ({todos, remove}) => {
  const todo = creatorFor(Todo)

  // Map through the todos
  const todoNode = todos.map((t) => {
    return (
      todo({
          todo: t,
          key: t.id,
          remove: remove
        })
    )
  });

  return (
    ul({}, todoNode)
  );
}
const todoList = creatorFor(TodoList);


const Title = ({todoCount}) => {
  return (
    div({},
      div({},
        h1({}, "To-Do (" + todoCount + ")")
      )
    )
  );
}
const title = creatorFor(Title);

export {TodoApp}