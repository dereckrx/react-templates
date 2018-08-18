// import * as React from 'react';
import {SimplyReact} from '../../simply_react.js';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import api_client from '../apiClient.js'

const {x} = SimplyReact(React.createElement);

// interface Props {
//   state
// }
//
// interface State {
//   comments: Array<Comment>;
//   showComments: boolean;
// }

class CommentBox extends React.Component {

  // private props: Props;
  // private state: State;
  // private _timer;

  constructor() {
    super();

    this.state = {
      comments: [],
      showComments: false
    };
  }

  // Override: react lifecycle methods
  // -------------------------------------------------
  componentWillMount() {
    this._fetchComments(); // Fetch before component is rendered to avoid render loop

    this.state = this.props.state;
    //store.subscribe(this.handleStateChange.bind(this))
    //this.actions = this.props.actions // TODO:
  }

  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchComments(),
      5000); // Poll for more comments every 5 secs
  }
  componentWillUnmount() {
    clearInterval(this._timer)
  }


  handleStateChange(newState) {
    console.log("COMMENTBOX: handling state change: ", newState.comments)
    this.setState({comments: newState.comments})
  }

  //-------------------------------------------------

  render() {
    const comments = this._getComments();
    let commentNdes;
    if (this.state.showComments) {
      commentNdes = x("div", {className: "comment-list"}, comments)
    }

    let commentButtonText = "Show Comments";

    if (this.state.showComments) {
      commentButtonText = "Hide Comments";
    }

    return(
      x("div", { className: "comment-box" },
        x(CommentForm, {addComment: this._addComment.bind(this)}),
        x("h3", {}, "Comments"),
        x("button", {onClick: this._handleShowClick.bind(this) }, commentButtonText),
        x("h4", {className: "comment-count"}, `${comments.length} comments`),
        commentNdes
      )
    )
  }

  //-------------------------------------------------

  _fetchComments() {
    return api_client.call({
      method: "GET",
      url: "/api/comments",
      success: (comments) => {
        this.setState({ comments: comments }) // "this" refers to CommentBox
      }
    });
  }

  _deleteComment(comment) {
    api_client.call({
      method: 'DELETE',
      url: `/api/comments/${comment.id}`
    });

    // Optimistic Update
    const comments = [...this.state.comments]; // Clone existing array
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1); // Remove one

    //store.dispatch(deleteCommentAction(comment))

    this.setState({ comments });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return(
        x(Comment, {
            comment: comment,
            key: comment.id,
            author: comment.author,
            body: comment.body,
            onDelete: this._deleteComment.bind(this)
          }
        )
      )
    });
  }

  _handleShowClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _addComment(author, body) {
    const comment = {
      author: author,
      body: body
    };
    //store.dispatch(postCommentAction(comment))
    api_client.call({
      method: "POST",
      url: "/api/comments",
      data: { comment: comment },
      success: function(newComment) { // Using the longhand syntax here
        this.setState({ comments: this.state.comments.concat( [newComment] ) });
      }.bind(this)
    });
  }
}
export default CommentBox;