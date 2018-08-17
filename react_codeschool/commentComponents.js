import api_client from './apiClient.js';

const x = (name, props, ...children) => {
  return React.createElement(name, props, ...children);
};

class Comment extends React.Component {
  render() {
    return(
      x("div", { className: "comment"},
        x("p", { className: "comment-header" }, this.props.author),
        x("p", { className: "comment-body" }, this.props.body),
        x("div", { className: "comment-footer" },
          x("a", {
              href: "#",
              className: "comment-fooder-delete",
              onClick: this._handleDelete.bind(this)
            },
            "Delete")
        )
      )
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.comment);
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      x("form", {
          className: "comment-form",
          onSubmit: this._handleSubmit.bind(this)
        },
        x("label", {}, "Join the discussion"),
        x("div", {className: "comment-form-fields"},
          x("p", {},
            x("input", {
              placeholder: "Name",
              ref: (input) => this._author = input
            })
          ),
          x("textarea", {
            placeholder: "Comment",
            ref: (textarea) => this._body = textarea
          })
        ),
        x("div", {className: "comment-form-actions"},
          x("button", {type: "submit"}, "Post Comment")
        )
      )
    )
  }

  _handleSubmit(event) {
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

class CommentBox extends React.Component {

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
  }
  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchComments(),
      5000); // Poll for more comments every 5 secs
  }
  componentWillUnmount() {
    clearInterval(this._timer)
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
export {CommentBox}