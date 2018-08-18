// const {creatorFor, create} = SimplyReact;
// const {div, p, h1, h2, h3, h4, a, ul, li, button, input} = SimplyReact;

export const SimplyReactDOM = (reactDOM) => {
  const o = (containerId, component) =>
    reactDOM.render(component, document.getElementById(containerId));
  return {
    o
  }
};

const SimplyReact = (createElement) => {

  // const create = (name, props, ...children) => {
  //   return createElement(name, props, ...children)
  // };
  //
  // const creatorFor = (name) => {
  //   return (
  //     (props, ...children) => {
  //       return create(name, props, ...children)
  //     }
  //   )
  // };

  const create = (name, ...props) => {
    if(props.length === 0) {return createElement(name, ...props)};
    const first = props[0];
    if(first.$$typeof && (first.$$typeof.toString() === 'Symbol(react.element)')) {
      // console.log('--> REACT: ', name, ', props: ', props);
      return createElement(name, {}, ...props)
    } else if(props.length === 1 && typeof first === 'string') {
      // console.log('==> string: ', name, ', props: ', {}, ', children: ', first)
      return createElement(name, {}, first)
    } else {
      // console.log('==> basic: ', name, ', props: ', props[0], ', children: ', props.slice(1, props.length))
      return createElement(name, props[0], ...props.slice(1, props.length))
    }
  };

  const creatorFor = (name) => {
    return (
      (...props) => {
        return create(name, ...props)
      }
    )
  };

  return {
    x: create,
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
    button: creatorFor('button'),
    label: creatorFor('label'),
    textarea: creatorFor('textarea'),
    form: creatorFor('form')
  }
};

export {SimplyReact};