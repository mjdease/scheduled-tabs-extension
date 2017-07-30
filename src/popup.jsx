import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import Icon from 'react-fa';

import Nested from './nested-component';

import './popup.scss';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: null };
  }

  componentDidMount() {
    // Get the active tab and store it in component state.
    chrome.tabs.query({
      active: true,
    }, (tabs) => {
      this.setState({
        activeTab: tabs[0],
      });
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <Container>
        <Row>
          <h1>React Component</h1>
        </Row>
        <Row>
          <Col xs="6">
            <p>
              <Icon name="diamond" />
              This is an example of a popup UI in React.
              <Icon name="phone" />
            </p>
          </Col>
          <Col xs="6">
            <p>
              Active tab: {activeTab ? activeTab.url : '[waiting for result]'}
            </p>
          </Col>
        </Row>
        <Row>
          <Nested />
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('app'));
