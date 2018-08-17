const api_client = {
  comments: [
    { id: 1, author: "dereckrx", body: "Hello world" },
    { id: 2, author: "Amanda", body: "Love for all" }
  ],
  call: function(params) {
    var comments_regex = /api\/comments\/?(\d*)/;
    const result = params.url.match(comments_regex)
    if(result) {
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
};

export default api_client;