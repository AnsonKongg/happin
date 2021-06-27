import React, { Component } from 'react';
import CitySearch from './components/citySearch';
import BookSearch from './components/bookSearch';
import { Row, Card } from 'antd';
const tabList = [
  {
    key: 'cities',
    tab: 'Cities',
  },
  {
    key: 'books',
    tab: 'Books',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'cities',
    }
  }

  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#41b0fe' }}>
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Card
            style={{ width: '80%' }}
            title="Search What You Want"
            tabList={tabList}
            activeTabKey={this.state.key}
            onTabChange={key => this.setState({ "key": key })}
          >
            {!!this.state.key && this.state.key === "cities" ?
              <CitySearch /> :
              <BookSearch />
            }
          </Card>
        </Row>
      </div>
    );
  };
}

export default App;
