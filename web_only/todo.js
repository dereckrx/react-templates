import { SimplyReact } from '../simply_react.js'

const {div, ul, li, button, input, x} = SimplyReact(React.createElement);

// Alternative to styled-components
const addButtonStyle = {
  fontSize: '24px',
};

const style = {
  fontSize: '24px',
};

const TodoInput = (props) => input({...props, style}, props.children);


const Todo = (props) => {

  let state = {value: ''};
  const dispatch = props.dispatch;

  const onAddHandler = () => {
    if (state.value) {
      dispatch({
        type: 'ADD_TODO',
        text: state.value
      });
    }
    state.value = '';
  };

  const onDeleteHandler = (todo) => {
    dispatch({
      type: 'DELETE_TODO',
      text: todo
    });
  };

  const todos = props.state.todos.map((t) => {
    return li({onClick: () => onDeleteHandler(t)}, t);
  });

  return (
    div({},
      x(TodoInput, {
        placeholder: "What todo?",
        onChange: (e) => {
          state.value = e.target.value
        }
      }),
      button({
        style: addButtonStyle,
        onClick: onAddHandler
      },
        'Add'),
      ul({}, ...todos),
    )
  )
};

export {Todo};