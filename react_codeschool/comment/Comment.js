// import * as React from 'react';
import {SimplyReact} from '../../simply_react.js';

const {div, p, button} = SimplyReact(React.createElement, ReactDOM);

const Comment = (props) => {

  const handleDelete = (event) => {
    event.preventDefault();
    props.onDelete(props.comment);
  };

  return (
    div({ className: "comment"},
      p({ className: "comment-header" }, props.author),
      p({ className: "comment-body" }, props.body),
      div({ className: "comment-footer" },
        button({
            href: "#",
            className: "comment-fooder-delete",
            onClick: handleDelete
          },
          "Delete")
      )
    )
  )
};

export default Comment;