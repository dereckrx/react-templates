// const {creatorFor, create} = SimplyReact;
// const {div, p, h1, h2, h3, h4, a, ul, li, button, input} = SimplyReact;

const SimplyReact = (createElement) => {
  const log = (...messages) => console.log('--> ', messages)

  const create = (name, props, ...children) => {
    return createElement(name, props, ...children)
  };

  const creatorFor = (name) => {
    return (
      (props, ...children) => {
        return create(name, props, ...children)
      }
    )
  };
  //
  // const create = (name, ...props) => {
  //   if(props[0].render || typeof props[0] === "function") {
  //     console.log('REACTname: ', name, 'props: ', props);
  //     return createElement(name, {}, props)
  //     } else {
  //     console.log('==> name: ', name, 'props: ', props)
  //     return createElement(name, props[0], props.slice(1, props.length))
  //   }
  // };
  //
  // const creatorFor = (name) => {
  //   return (
  //     (...props) => {
  //       return create(name, ...props)
  //     }
  //   )
  // };

  return {
    log: log,
    creatorFor: creatorFor,
    create: create,
    div: creatorFor('div'),
    p: creatorFor('p'),
    h1: creatorFor('h1'),
    h2: creatorFor('h2'),
    h3: creatorFor('h3'),
    h4: creatorFor('h4'),
    a: creatorFor('a'),
    ul: creatorFor('ul'),
    li: creatorFor('li'),
    input: creatorFor('input'),
    button: creatorFor('button')
  }
};

export {SimplyReact};