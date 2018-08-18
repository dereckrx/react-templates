## Sat Aug 11 2018 1:54 PM
Combining projects

## Thu Oct 19 2017 4:09 PM
https://scotch.io/tutorials/create-a-simple-to-do-app-with-react
TODO with abe

* Presentation component
* Container component 

Container: handles state
    - presentation: stateless


## Javascript

```
// Updating state
this.setState({showComments: true })

// Shorthand Function Syntax:
   (input) => { this._author = input }
is the same as:
   function(newComment) {
     this._author = input;
   }.bind(this)
```