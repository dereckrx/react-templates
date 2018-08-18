const x = React.createElement;

const ContactsBox = (props) => {
  return(
    x('div', {},
      x('h3', {}, "Contacts"),
      x('ul', {},
        x('li', {},
          x('h3', {}, "James Nelson"),
          x('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
        ),
        x('li', {},
          x('h4', {}, "Joe Citizen"),
          x('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
        )
      )
    )
  )
};
export default ContactsBox;