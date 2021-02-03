const {div, ul, li, button, input, creatorFor} = simpleReact(React.createElement);

// Alternative to styled-components
const addButtonStyle = {
  fontSize: '24px',
};

const style = {
  fontSize: '24px',
};

const TodoListView = ({store}) => {
  const [text, setText] = React.useState('');
  
  const onAddHandler = () => {
    store.addTodo(text);
    setText('');
  };
  
  const todos = store.todos.map(todo =>
    TodoView({
      todo,
      handleDelete: () => store.deleteTodo(todo)
    }));
  
  return (
    div(
      TodoInput({
        value: text,
        placeholder: "What todo?",
        onChange: (e) => setText(e.target.value)
      }),
      button({
          style: addButtonStyle,
          onClick: onAddHandler
        },
        'Add'
      ),
      ul(...todos),
    )
  )
};

const span = creatorFor('span');

const Checkbox = (props) => input({type: 'checkbox', ...props});

const TodoInput = (props) => input({...props, style}, props.children);

const TodoView = ({todo, handleDelete}) => {
  return (
    li(
      Checkbox({onChange: todo.toggleFinished, checked: todo.isFinished}),
      span({onClick: handleDelete}, todo.text)
    )
  )
};

export {TodoListView};
