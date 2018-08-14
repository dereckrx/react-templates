// Updating state
// this.setState({showComments: true })

// Shorthand Function Syntax:
//    (input) => { this._author = input }
// is the same as:
//    function(newComment) {
//      this._author = input;
//    }.bind(this)

const x = React.createElement;

api_client = {
  id_count: 33,
  comments: [
    { id: 1, author: "dereckrx", body: "Hello world" },
    { id: 2, author: "Amanda", body: "Love for all" }
  ],
  call: function(params) {
    console.log("-> ", params.method, params.url)
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
        var id = this.id_count += 1;
        var newComment = Object.assign({}, params.data)
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


// class PlayerStats extends React.Component {

//   render() {
//     return(
//       x("div", {}, `GP: ${this.state.player.goldPoints}`)
//     )
//   }
// }

class Comment extends React.Component {
  render() {
    return(
      x("div", { className: "comment"},
        x("p", { className: "comment-header" }, this.props.author),
        x("p", { className: "comment-body" }, this.props.body),
        x("div", { className: "comment-footer" },
          x("button", {
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

  // Override: react lifecycle methods
  // -------------------------------------------------
  componentWillMount() {
    //this._fetchComments(); // Fetch before component is rendered to avoid render loop
    this.state = this.props.state
    store.subscribe(this.handleStateChange.bind(this))
    //this.actions = this.props.actions // TODO:
  }

  handleStateChange(newState) {
    console.log("COMMENTBOX: handling state change: ", newState.comments)
    this.setState({comments: newState.comments})
  }
  // componentDidMount() {
  //   this._timer = setInterval(
  //     () => this._fetchComments(),
  //     5000); // Poll for more comments every 5 secs
  // }
  // TODO: unsubscribe here
  // componentWillUnmount() {
  //   clearInterval(this._timer)
  // }
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

  // When not using redux
  // _fetchComments() {
  //   return api_client.call({
  //     method: "GET",
  //     url: "/api/comments",
  //     success: (comments) => {
  //       this.setState({ comments: comments }) // "this" refers to CommentBox
  //     }
  //   });
  // }

  _deleteComment(comment) {
    // When not using redux
    // api_client.call({
    //   method: 'DELETE',
    //   url: `/api/comments/${comment.id}`
    // });

    // Optimistic Update
    // const comments = [...this.state.comments]; // Clone existing array
    // const commentIndex = comments.indexOf(comment);
    // comments.splice(commentIndex, 1); // Remove one

    // this.setState({ comments });
    store.dispatch(deleteCommentAction(comment))
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
    store.dispatch(postCommentAction(comment))
  }
}

class AppComponent extends React.Component {

  componentWillMount() {
    this.state = this.props.store.getState()
  }

  render() {
    return (
      x(CommentBox, {
        state: {
          showComments: this.state.showComments,
          comments: this.state.comments
        }
      })
    )
  }
}

//-------------------------------------------------
// ## Container Components
// This is where the connections happen
//Technically, a container component is just a React component that uses
// store.subscribe() to read a part of the Redux state tree and supply props
// to a presentational component it renders.
// function CommentBoxContainer() {

//   this.mapStateToProps = function mapStateToProps(state) {
//     return {
//       comments: state.comments
//     };
//   }

//   this.mapDispatchToProps = function(dispatch) {
//     return {
//       deleteComment: (comment) => { store.dispatch(deleteCommentAction(comment)) }
//     };
//   }

//   this.connect = function() {
//     return connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(CommentBox)
//   }
// }
//-------------------------------------------------

// function connect(mapStateToProps, mapDispatchToProps) {
//   store.subscribe()
// }

const TEST_INITIAL_STATE = {
  showComments: false,
  comments: []
}

const store = new Store(appReducer, TEST_INITIAL_STATE)

var appElement = x(AppComponent, {store: store })
ReactDOM.render(appElement, document.getElementById('app'));

// Log any time the state changes
let unsubscribe = store.subscribe((newState) => {
  console.log("STORE-LOGGER: State updated: ", newState)
})

store.init_from_api()

// Log initial state
// console.log("## Store + State")
// console.log(store)
// console.log(store.getState())


