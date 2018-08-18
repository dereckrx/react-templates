import * as React from 'react';
import styled from 'styled-components';
import { Segment, Menu, Header } from 'semantic-ui-react';
const Container = styled.div `
  overflow-x: hidden;
`;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement(Container, null,
            React.createElement(Menu, { fixed: "top", style: { zIndex: 99 } },
                React.createElement(Menu.Item, { header: true }, "Pivotcoin!"),
                React.createElement(Menu.Item, { icon: "github", position: "right", onClick: () => window.open('https://github.com/wlindner/pivotcoin', 'Pivotcoin_Github') })),
            React.createElement(Segment, { style: { margin: 10 } },
                React.createElement(Header, { size: "medium" }, "The Blockchain"))));
    }
}
export default App;
//# sourceMappingURL=App.js.map