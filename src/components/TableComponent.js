'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';

require('styles//Stock.css');

function pictureFormatter(fieldValue) {
  return `<img src="${fieldValue}"> `
}
function volumeFormatter(fieldValue) {
  return `${fieldValue} L`;
}

class TableComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        page: 0,
        quantity: 10,
        suv: []
      };
      this.scrollListener = this.scrollListener.bind(this);
  }

  // scrollListener() {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //       let quantity = this.state.quantity + 10;
  //       this.setState({quantity});
  //       this.updateDataTable()
  //   }
  // }

  scrollListener() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let page = this.state.page + 1;
        this.setState({page});

        let api_url = 'http://localhost:9292/caradisiac/suv/page/' + this.state.page;

        axios.get(api_url)
          .then(res => {
            const suv = res.data;
            suv.forEach(element => {
              this.state.suv.push(element);
            });
          });
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollListener);
    this.TableComponent();
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    
    if (nextProps.data !== this.props.data) {
      this.updateDataTable(nextProps.data);
      // this.TableComponent();
    }
  }

  updateDataTable(){
    // let api_url = 'http://localhost:9292/caradisiac/suv/' + this.state.quantity;
    let api_url = 'http://localhost:9292/caradisiac/suv/page/' + this.state.page;

    axios.get(api_url)
      .then(res => {
        const suv = res.data;
        this.setState({ suv });
      });
  }

  TableComponent() {
    this.updateDataTable(this.props.data);
  }

  render() {
    var listSuv = this.state.suv;

    return (
    <div>
    <BootstrapTable exportCSV data={listSuv} version='4'
      search>
          <TableHeaderColumn isKey dataField='brand' dataSort={ true }>Brand</TableHeaderColumn>
          <TableHeaderColumn dataField='model' dataSort={ true } >Model</TableHeaderColumn>
          <TableHeaderColumn dataField='volume' dataSort={ true } dataFormat={ volumeFormatter } >Volume</TableHeaderColumn>
          <TableHeaderColumn dataField='image' dataSort={ true } dataFormat={ pictureFormatter } >Picture</TableHeaderColumn>
      </BootstrapTable>
      
    </div>)
  }
}

TableComponent.displayName = 'TableComponent';

// Uncomment properties you need
// OfferComponent.propTypes = {};
// OfferComponent.defaultProps = {};

export default TableComponent;
