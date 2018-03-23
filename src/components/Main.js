require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Form from './FormComponent';
import Table from './TableComponent';

let headerImage = require('../images/caradisiac.jpg');

class AppComponent extends React.Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.state = {
      brand: '',
      minVolume: 0,
      maxVolume: 900
    };
  }
  
  handleData(data) {
    this.setState(data);
  }

  render() {
    return (
      <div>
        <div className="index">
          <img src={headerImage} alt="Caradisiac Image Header" />
        </div>
        <Form handlerFromParent={this.handleData}/>
        <Table data={this.state}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
