import * as React from 'react';
import styled from 'styled-components';
import {Segment, Menu, Header} from 'semantic-ui-react';

const Container = styled.div`

`;

interface AppComponentState {

}

class App extends React.Component<{}, AppComponentState> {

  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Menu>
          <Menu.Item header>Web Kata!</Menu.Item>
          <Menu.Item
            icon="github"
            position="right"
          />
        </Menu>
        <Segment>
          <Header size="medium">The Way we do it...</Header>
        </Segment>
      </Container>
    );
  }
}

export default App;