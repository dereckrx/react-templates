// Updating state
// this.setState({showComments: true })

// Shorthand Function Syntax:
//    (input) => { this._author = input }
// is the same as:
//    function(newComment) {
//      this._author = input;
//    }.bind(this)

api_client = {
  comments: [
    { id: 1, author: "dereckrx", body: "Hello world" },
    { id: 2, author: "Amanda", body: "Love for all" }
  ],
  call: function(params) {
    var comments_regex = /api\/comments\/?(\d*)/
    if(result = params.url.match(comments_regex)) {
      if(params.method === "GET") {
        params.success(this.comments)
      }
      if(params.method === "DELETE") {
        var id = result[1]
        this.comments = this.comments.filter( (c) => c.id != id )
        if(typeof params.success !== "undefined") {
          params.success(null);
        }
      }
      if(params.method === "POST") {
        var id = this.comments.length + 1;
        var newComment = params.data["comment"]
        newComment["id"] = id
        this.comments = this.comments.concat([ newComment ])
        params.success(newComment)
      }
    }
  },
  call_ajax: function(params) {
    jQuery.ajax(params)
  }
}

class Comment extends React.Component {
  render() {
    return(
      React.createElement("div", { className: "comment"},
        React.createElement("p", { className: "comment-header" }, this.props.author),
        React.createElement("p", { className: "comment-body" }, this.props.body),
        React.createElement("div", { className: "comment-footer" },
          React.createElement("a", {
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
      React.createElement("form", {
          className: "comment-form",
          onSubmit: this._handleSubmit.bind(this)
        },
        React.createElement("label", {}, "Join the discussion"),
        React.createElement("div", {className: "comment-form-fields"},
          React.createElement("p", {},
            React.createElement("input", {
              placeholder: "Name",
              ref: (input) => this._author = input
            })
          ),
          React.createElement("textarea", {
            placeholder: "Comment",
            ref: (textarea) => this._body = textarea
          })
        ),
        React.createElement("div", {className: "comment-form-actions"},
          React.createElement("button", {type: "submit"}, "Post Comment")
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
      commentNdes = React.createElement("div", {className: "comment-list"}, comments)
    }

    let commentButtonText = "Show Comments";

    if (this.state.showComments) {
      commentButtonText = "Hide Comments";
    }

    return(
      React.createElement("div", { className: "comment-box" },
        React.createElement(CommentForm, {addComment: this._addComment.bind(this)}),
        React.createElement("h3", {}, "Comments"),
        React.createElement("button", {onClick: this._handleShowClick.bind(this) }, commentButtonText),
        React.createElement("h4", {className: "comment-count"}, `${comments.length} comments`),
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
        React.createElement(Comment, {
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

class StoryBox extends React.Component {
  render() {
    return(
      React.createElement("div", {}, // "Story Box"
        React.createElement(CommentBox, {}))
      )
  }
}

class ContactsBox extends React.Component {
  render() {
    return(
      React.createElement('div', {},
        React.createElement('h3', {}, "Contacts"),
        React.createElement('ul', {},
          React.createElement('li', {},
            React.createElement('h3', {}, "James Nelson"),
            React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
          ),
          React.createElement('li', {},
            React.createElement('h4', {}, "Joe Citizen"),
            React.createElement('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
          )
        )
      )
    )
  }
}

//var rootElement = React.createElement(ContactsBox, {})

var rootElement = React.createElement('div', {},
  React.createElement(StoryBox, {}),
  React.createElement(ContactsBox, {}))
ReactDOM.render(rootElement, document.getElementById('app'));